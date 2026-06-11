const { getPool, sql } = require('../config/db');

// GET /api/workflows
const getWorkflows = async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().query(`
      SELECT ws.StageId, c.CategoryName as name, ws.StageName, ws.StageOrder, 
             u.FullName as approverName, u.UserId as approverId
      FROM WorkflowStages ws
      JOIN Categories c ON ws.CategoryId = c.CategoryId
      LEFT JOIN StageApprovers sa ON ws.StageId = sa.StageId
      LEFT JOIN Users u ON sa.ApproverUserId = u.UserId
      WHERE ws.IsActive = 1
      ORDER BY c.CategoryName, ws.StageOrder
    `);

    // Group by category
    const workflows = {};
    for (const row of result.recordset) {
      if (!workflows[row.name]) {
        workflows[row.name] = { id: row.StageId, name: row.name, stages: [] };
      }
      workflows[row.name].stages.push({
        stageId: row.StageId,
        stageName: row.StageName,
        stageOrder: row.StageOrder,
        approver: row.approverName,
        approverId: row.approverId
      });
    }

    // Format to match expected API response
    const formatted = Object.values(workflows).map(wf => {
      const initial = wf.stages.find(s => s.stageOrder === 1);
      const compliance = wf.stages.find(s => s.stageOrder === 2);
      const final = wf.stages.find(s => s.stageOrder === 3);
      return {
        id: wf.stages[0]?.stageId,
        name: wf.name,
        initial: initial?.approver || null,
        compliance: compliance?.approver || null,
        final: final?.approver || null
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error('Get workflows error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/workflows/:id - Update workflow approver assignments
const updateWorkflow = async (req, res) => {
  try {
    const { id } = req.params;
    const { initial, compliance, final: finalApprover } = req.body;
    const pool = getPool();

    // Get category from the stage
    const categoryResult = await pool.request()
      .input('stageId', sql.BigInt, id)
      .query('SELECT CategoryId FROM WorkflowStages WHERE StageId = @stageId');

    if (categoryResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    const categoryId = categoryResult.recordset[0].CategoryId;

    // Get all stages for this category
    const stagesResult = await pool.request()
      .input('categoryId', sql.Int, categoryId)
      .query('SELECT StageId, StageOrder FROM WorkflowStages WHERE CategoryId = @categoryId AND IsActive = 1 ORDER BY StageOrder');

    // Helper to get user ID by name
    const getUserId = async (name) => {
      if (!name) return null;
      const result = await pool.request()
        .input('name', sql.NVarChar, name)
        .query(`
          SELECT u.UserId FROM Users u
          JOIN UserRoles ur ON u.UserId = ur.UserId
          JOIN Roles r ON ur.RoleId = r.RoleId
          WHERE u.FullName = @name AND r.RoleName = 'Approver' AND u.IsActive = 1
        `);
      return result.recordset.length > 0 ? result.recordset[0].UserId : null;
    };

    const approverMap = {
      1: await getUserId(initial),
      2: await getUserId(compliance),
      3: await getUserId(finalApprover)
    };

    // Update stage approvers
    for (const stage of stagesResult.recordset) {
      const newApproverId = approverMap[stage.StageOrder];
      if (newApproverId) {
        // Check if exists
        const existing = await pool.request()
          .input('stageId', sql.BigInt, stage.StageId)
          .query('SELECT StageApproverId FROM StageApprovers WHERE StageId = @stageId');

        if (existing.recordset.length > 0) {
          await pool.request()
            .input('stageId', sql.BigInt, stage.StageId)
            .input('approverId', sql.BigInt, newApproverId)
            .query('UPDATE StageApprovers SET ApproverUserId = @approverId WHERE StageId = @stageId');
        } else {
          await pool.request()
            .input('stageId', sql.BigInt, stage.StageId)
            .input('approverId', sql.BigInt, newApproverId)
            .query('INSERT INTO StageApprovers (StageId, ApproverUserId) VALUES (@stageId, @approverId)');
        }
      }
    }

    // Return updated workflow
    const updatedResult = await pool.request()
      .input('categoryId', sql.Int, categoryId)
      .query(`
        SELECT c.CategoryName as name, ws.StageOrder, u.FullName as approverName
        FROM WorkflowStages ws
        JOIN Categories c ON ws.CategoryId = c.CategoryId
        LEFT JOIN StageApprovers sa ON ws.StageId = sa.StageId
        LEFT JOIN Users u ON sa.ApproverUserId = u.UserId
        WHERE ws.CategoryId = @categoryId AND ws.IsActive = 1
        ORDER BY ws.StageOrder
      `);

    const stages = updatedResult.recordset;
    const response = {
      id: parseInt(id),
      name: stages[0]?.name,
      initial: stages.find(s => s.StageOrder === 1)?.approverName || null,
      compliance: stages.find(s => s.StageOrder === 2)?.approverName || null,
      final: stages.find(s => s.StageOrder === 3)?.approverName || null
    };

    res.json(response);
  } catch (err) {
    console.error('Update workflow error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getWorkflows, updateWorkflow };
