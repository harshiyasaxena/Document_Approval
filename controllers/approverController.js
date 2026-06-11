const { getPool, sql } = require('../config/db');

// GET /api/approver/assigned
const getAssignedDocuments = async (req, res) => {
  try {
    const { search, status } = req.query;
    const pool = getPool();
    const request = pool.request();

    let query = `
      SELECT d.id, d.title, u.name as submitter, d.category as workflow, 
             d.created_at as date, da.status
      FROM document_approvers da
      JOIN documents d ON da.document_id = d.id
      JOIN users u ON d.submitted_by = u.id
      WHERE da.approver_id = @approverId
    `;
    request.input('approverId', sql.Int, req.user.id);

    if (search) {
      query += ' AND (d.title LIKE @search OR u.name LIKE @search)';
      request.input('search', sql.VarChar, `%${search}%`);
    }

    if (status) {
      query += ' AND da.status = @status';
      request.input('status', sql.VarChar, status);
    }

    query += ' ORDER BY d.created_at DESC';

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
      .input('approverId', sql.Int, req.user.id)
      .query(`
        SELECT 
          COUNT(*) as totalAssigned,
          SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
          SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) as approved,
          SUM(CASE WHEN status = 'Revision' THEN 1 ELSE 0 END) as revision,
          SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected
        FROM document_approvers
        WHERE approver_id = @approverId
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
      SELECT u.id, u.name, u.email,
        COUNT(da.id) as assignedCount,
        SUM(CASE WHEN da.status = 'Pending' THEN 1 ELSE 0 END) as pendingCount,
        SUM(CASE WHEN da.status = 'Approved' THEN 1 ELSE 0 END) as approvedCount
      FROM users u
      LEFT JOIN document_approvers da ON u.id = da.approver_id
      WHERE u.role = 'Approver'
      GROUP BY u.id, u.name, u.email
      ORDER BY u.name
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
    const result = await pool.request()
      .query("SELECT id, name FROM users WHERE role = 'Approver' ORDER BY name");

    res.json(result.recordset);
  } catch (err) {
    console.error('Get approvers error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAssignedDocuments, getApproverStats, getApproverWorkload, getApprovers };
