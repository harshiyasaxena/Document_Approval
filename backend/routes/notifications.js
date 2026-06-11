const express = require('express');
const { authenticate } = require('../middleware/auth');
const { getNotifications, createNotification, markAsRead, markAllAsRead, deleteNotification } = require('../controllers/notificationController');

const router = express.Router();

router.get('/', authenticate, getNotifications);
router.post('/', authenticate, createNotification);
router.put('/read-all', authenticate, markAllAsRead);
router.put('/:id/read', authenticate, markAsRead);
router.delete('/:id', authenticate, deleteNotification);

module.exports = router;
