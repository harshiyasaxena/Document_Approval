const { getPool, sql } = require('../config/db');

// GET /api/approver/assigned
const getAssignedDocuments = async (req, res) => {
  try {
    const { search, status } = req.query;
    const pool = getPool();
    const request = pool.request();

    let query = `
      SELECT d.DocumentId as id, d.Title as title, u.FullName as submitter, 
             c.CategoryName as workflow, d.CreatedAt as date, da.Status as status
      FROM DocumentApprovals da
      JOIN Documents d ON da.DocumentId = d.DocumentId
      JOIN Users u ON d.SubmitterId = u.UserId
      JOIN Categories c ON d.CategoryId = c.CategoryId
      WHERE da.ApproverUserId = @approverId
    `;
    request.input('approverId', sql.BigInt, req.user.id);

    if (search) {
      query += ' AND (d.Title LIKE @search OR u.FullName LIKE @search)';
      request.input('search', sql.NVarChar, `%${search}%`);
    }

    if (status) {
      query += ' AND da.Status = @status';
      request.input('status', sql.NVarChar, status);
    }

    query += ' ORDER BY d.CreatedAt DESC';

    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Get assigned documents error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/approver/stats
const getApproverStats = async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request()
      .input('approverId', sql.BigInt, req.user.id)
      .query(`
        SELECT 
          COUNT(*) as totalAssigned,
          SUM(CASE WHEN Status = 'Pending' THEN 1 ELSE 0 END) as pending,
          SUM(CASE WHEN Status = 'Approved' THEN 1 ELSE 0 END) as approved,
          SUM(CASE WHEN Status = 'Revision' THEN 1 ELSE 0 END) as revision,
          SUM(CASE WHEN Status = 'Rejected' THEN 1 ELSE 0 END) as rejected
        FROM DocumentApprovals
        WHERE ApproverUserId = @approverId
      `);

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Get approver stats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/approvers/workload
const getApproverWorkload = async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().query(`
      SELECT u.UserId as id, u.FullName as name, u.Email as email,
        COUNT(da.ApprovalId) as assignedCount,
        SUM(CASE WHEN da.Status = 'Pending' THEN 1 ELSE 0 END) as pendingCount,
        SUM(CASE WHEN da.Status = 'Approved' THEN 1 ELSE 0 END) as approvedCount
      FROM Users u
      JOIN UserRoles ur ON u.UserId = ur.UserId
      JOIN Roles r ON ur.RoleId = r.RoleId
      LEFT JOIN DocumentApprovals da ON u.UserId = da.ApproverUserId
      WHERE r.RoleName = 'Approver' AND u.IsActive = 1
      GROUP BY u.UserId, u.FullName, u.Email
      ORDER BY u.FullName
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Get workload error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/approvers
const getApprovers = async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().query(`
      SELECT u.UserId as id, u.FullName as name
      FROM Users u
      JOIN UserRoles ur ON u.UserId = ur.UserId
      JOIN Roles r ON ur.RoleId = r.RoleId
      WHERE r.RoleName = 'Approver' AND u.IsActive = 1
      ORDER BY u.FullName
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Get approvers error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAssignedDocuments, getApproverStats, getApproverWorkload, getApprovers };
