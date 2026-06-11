const { getPool, sql } = require('../config/db');

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const { search, role } = req.query;
    const pool = getPool();

    let query = 'SELECT id, name, email, role FROM users WHERE 1=1';
    const request = pool.request();

    if (search) {
      query += ' AND (name LIKE @search OR email LIKE @search)';
      request.input('search', sql.VarChar, `%${search}%`);
    }

    if (role) {
      query += ' AND role = @role';
      request.input('role', sql.VarChar, role);
    }

    query += ' ORDER BY name';

    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/users/stats
const getUserStats = async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().query(`
      SELECT 
        COUNT(*) as totalUsers,
        SUM(CASE WHEN role = 'Submitter' THEN 1 ELSE 0 END) as totalSubmitters,
        SUM(CASE WHEN role = 'Approver' THEN 1 ELSE 0 END) as totalApprovers,
        SUM(CASE WHEN role = 'Admin' THEN 1 ELSE 0 END) as totalAdmins
      FROM users
    `);

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Get user stats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['Submitter', 'Approver', 'Admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const pool = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('role', sql.VarChar, role)
      .query(`
        UPDATE users SET role = @role, updated_at = GETDATE()
        WHERE id = @id;
        SELECT id, name, email, role FROM users WHERE id = @id;
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Update role error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUsers, getUserStats, updateUserRole };
