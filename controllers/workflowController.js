const { getPool, sql } = require('../config/db');

// GET /api/workflows
const getWorkflows = async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().query(`
      SELECT w.id, w.name,
        u1.name as initial,
        u2.name as compliance,
        u3.name as final
      FROM workflows w
      LEFT JOIN users u1 ON w.initial_approver_id = u1.id
      LEFT JOIN users u2 ON w.compliance_approver_id = u2.id
      LEFT JOIN users u3 ON w.final_approver_id = u3.id
      ORDER BY w.name
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Get workflows error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/workflows/:id
const updateWorkflow = async (req, res) => {
  try {
    const { id } = req.params;
    const { initial, compliance, final: finalApprover } = req.body;
    const pool = getPool();

    // Look up approver IDs by name
    const getApproverId = async (name) => {
      if (!name) return null;
      const result = await pool.request()
        .input('name', sql.VarChar, name)
        .query("SELECT id FROM users WHERE name = @name AND role = 'Approver'");
      return result.recordset.length > 0 ? result.recordset[0].id : null;
    };

    const initialId = await getApproverId(initial);
    const complianceId = await getApproverId(compliance);
    const finalId = await getApproverId(finalApprover);

    await pool.request()
      .input('id', sql.Int, id)
      .input('initialId', sql.Int, initialId)
      .input('complianceId', sql.Int, complianceId)
      .input('finalId', sql.Int, finalId)
      .query(`
        UPDATE workflows 
        SET initial_approver_id = @initialId, 
            compliance_approver_id = @complianceId, 
            final_approver_id = @finalId,
            updated_at = GETDATE()
        WHERE id = @id
      `);

    // Return updated workflow
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT w.id, w.name,
          u1.name as initial,
          u2.name as compliance,
          u3.name as final
        FROM workflows w
        LEFT JOIN users u1 ON w.initial_approver_id = u1.id
        LEFT JOIN users u2 ON w.compliance_approver_id = u2.id
        LEFT JOIN users u3 ON w.final_approver_id = u3.id
        WHERE w.id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Update workflow error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getWorkflows, updateWorkflow };
