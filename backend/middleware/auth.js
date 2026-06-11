const jwt = require('jsonwebtoken');
const { getPool, sql } = require('../config/db');

// Verify JWT token
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const pool = getPool();
    const result = await pool.request()
      .input('id', sql.BigInt, decoded.id)
      .query(`
        SELECT u.UserId as id, u.FullName as name, u.Email as email, r.RoleName as role
        FROM Users u
        LEFT JOIN UserRoles ur ON u.UserId = ur.UserId
        LEFT JOIN Roles r ON ur.RoleId = r.RoleId
        WHERE u.UserId = @id AND u.IsActive = 1
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = result.recordset[0];
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
