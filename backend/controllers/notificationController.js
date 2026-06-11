const { getPool, sql } = require('../config/db');

// GET /api/notifications
const getNotifications = async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request()
      .input('userId', sql.Int, req.user.id)
      .query(`
        SELECT n.id, n.message, n.is_read as isRead, n.document_id as documentId, n.created_at as createdAt
        FROM notifications n
        WHERE n.user_id = @userId
        ORDER BY n.created_at DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Get notifications error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/notifications
const createNotification = async (req, res) => {
  try {
    const { userId, message, documentId } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: 'userId and message are required' });
    }

    const pool = getPool();
    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .input('message', sql.Text, message)
      .input('documentId', sql.Int, documentId || null)
      .query(`
        INSERT INTO notifications (user_id, message, document_id)
        OUTPUT INSERTED.id, INSERTED.message, INSERTED.is_read as isRead, 
               INSERTED.document_id as documentId, INSERTED.created_at as createdAt
        VALUES (@userId, @message, @documentId)
      `);

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Create notification error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/notifications/:id/read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    await pool.request()
      .input('id', sql.Int, id)
      .input('userId', sql.Int, req.user.id)
      .query(`UPDATE notifications SET is_read = 1 WHERE id = @id AND user_id = @userId`);

    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Mark read error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/notifications/read-all
const markAllAsRead = async (req, res) => {
  try {
    const pool = getPool();

    await pool.request()
      .input('userId', sql.Int, req.user.id)
      .query(`UPDATE notifications SET is_read = 1 WHERE user_id = @userId`);

    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    console.error('Mark all read error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/notifications/:id
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    await pool.request()
      .input('id', sql.Int, id)
      .input('userId', sql.Int, req.user.id)
      .query(`DELETE FROM notifications WHERE id = @id AND user_id = @userId`);

    res.json({ message: 'Notification deleted' });
  } catch (err) {
    console.error('Delete notification error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getNotifications, createNotification, markAsRead, markAllAsRead, deleteNotification };
