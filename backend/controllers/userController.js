const { getPool, sql } = require('../config/db');

// GET /api/users - List all users (Admin only)
const getUsers = async (req, res) => {
  try {
    const { search, role } = req.query;
    const pool = getPool();
    const request = pool.request();

    let query = `
      SELECT u.UserId as id, u.FullName as name, u.Email as email, r.RoleName as role
      FROM Users u
      LEFT JOIN UserRoles ur ON u.UserId = ur.UserId
      LEFT JOIN Roles r ON ur.RoleId = r.RoleId
      WHERE u.IsActive = 1
    `;

    if (search) {
      query += ' AND (u.FullName LIKE @search OR u.Email LIKE @search)';
      request.input('search', sql.NVarChar, `%${search}%`);
    }

    if (role) {
      query += ' AND r.RoleName = @role';
      request.input('role', sql.NVarChar, role);
    }

    query += ' ORDER BY u.FullName';

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
        COUNT(DISTINCT u.UserId) as totalUsers,
        SUM(CASE WHEN r.RoleName = 'Submitter' THEN 1 ELSE 0 END) as totalSubmitters,
        SUM(CASE WHEN r.RoleName = 'Approver' THEN 1 ELSE 0 END) as totalApprovers,
        SUM(CASE WHEN r.RoleName = 'Admin' THEN 1 ELSE 0 END) as totalAdmins
      FROM Users u
      LEFT JOIN UserRoles ur ON u.UserId = ur.UserId
      LEFT JOIN Roles r ON ur.RoleId = r.RoleId
      WHERE u.IsActive = 1
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

    const pool = getPool();

    // Get the role ID
    const roleResult = await pool.request()
      .input('roleName', sql.NVarChar, role)
      .query('SELECT RoleId FROM Roles WHERE RoleName = @roleName');

    if (roleResult.recordset.length === 0) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const roleId = roleResult.recordset[0].RoleId;

    // Check if user exists
    const userCheck = await pool.request()
      .input('userId', sql.BigInt, id)
      .query('SELECT UserId FROM Users WHERE UserId = @userId');

    if (userCheck.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update or insert user role
    const existingRole = await pool.request()
      .input('userId', sql.BigInt, id)
      .query('SELECT UserRoleId FROM UserRoles WHERE UserId = @userId');

    if (existingRole.recordset.length > 0) {
      await pool.request()
        .input('userId', sql.BigInt, id)
        .input('roleId', sql.Int, roleId)
        .query('UPDATE UserRoles SET RoleId = @roleId WHERE UserId = @userId');
    } else {
      await pool.request()
        .input('userId', sql.BigInt, id)
        .input('roleId', sql.Int, roleId)
        .query('INSERT INTO UserRoles (UserId, RoleId) VALUES (@userId, @roleId)');
    }

    // Return updated user
    const result = await pool.request()
      .input('userId', sql.BigInt, id)
      .query(`
        SELECT u.UserId as id, u.FullName as name, u.Email as email, r.RoleName as role
        FROM Users u
        LEFT JOIN UserRoles ur ON u.UserId = ur.UserId
        LEFT JOIN Roles r ON ur.RoleId = r.RoleId
        WHERE u.UserId = @userId
      `);

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Update role error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUsers, getUserStats, updateUserRole };
