const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { getUsers, getUserStats, updateUserRole } = require('../controllers/userController');

const router = express.Router();

router.get('/', authenticate, authorize('Admin'), getUsers);
router.get('/stats', authenticate, authorize('Admin'), getUserStats);
router.put('/:id/role', authenticate, authorize('Admin'), updateUserRole);

module.exports = router;
