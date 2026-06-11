const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getPool, sql } = require('../config/db');

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const pool = getPool();

    // Check if user exists
    const existing = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT UserId FROM Users WHERE Email = @email');

    if (existing.recordset.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .query(`
        INSERT INTO Users (FullName, Email, PasswordHash)
        OUTPUT INSERTED.UserId, INSERTED.FullName, INSERTED.Email
        VALUES (@name, @email, @password)
      `);

    const user = result.recordset[0];

    // Assign default role (Submitter - RoleId 1 assumed)
    // Get the Submitter role ID
    const roleResult = await pool.request()
      .input('roleName', sql.NVarChar, 'Submitter')
      .query("SELECT RoleId FROM Roles WHERE RoleName = @roleName");

    if (roleResult.recordset.length > 0) {
      await pool.request()
        .input('userId', sql.BigInt, user.UserId)
        .input('roleId', sql.Int, roleResult.recordset[0].RoleId)
        .query('INSERT INTO UserRoles (UserId, RoleId) VALUES (@userId, @roleId)');
    }

    const token = jwt.sign({ id: user.UserId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      user: { id: user.UserId, name: user.FullName, email: user.Email, role: 'Submitter' },
      token
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const pool = getPool();
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query(`
        SELECT u.UserId, u.FullName, u.Email, u.PasswordHash, r.RoleName
        FROM Users u
        LEFT JOIN UserRoles ur ON u.UserId = ur.UserId
        LEFT JOIN Roles r ON ur.RoleId = r.RoleId
        WHERE u.Email = @email AND u.IsActive = 1
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.UserId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.json({
      user: { id: user.UserId, name: user.FullName, email: user.Email, role: user.RoleName || 'Submitter' },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/auth/logout
const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// GET /api/auth/me
const getMe = (req, res) => {
  res.json(req.user);
};

// POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    res.json({ message: 'Reset link sent to email' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, logout, getMe, forgotPassword };
