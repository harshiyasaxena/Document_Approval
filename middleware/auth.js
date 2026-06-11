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
      .input('id', sql.Int, decoded.id)
      .query('SELECT id, name, email, role FROM users WHERE id = @id');

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
