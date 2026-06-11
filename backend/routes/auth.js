const express = require('express');
const { authenticate } = require('../middleware/auth');
const { register, login, logout, getMe, forgotPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.post('/forgot-password', forgotPassword);

module.exports = router;
