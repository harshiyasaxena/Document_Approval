const { getPool, sql } = require('../config/db');

// Note: The current DB schema doesn't have a Notifications table.
// These endpoints will work once a Notifications table is added.
// For now, they return empty/success responses gracefully.

// GET /api/notifications
const getNotifications = async (req, res) => {
  try {
    const pool = getPool();

    // Check if Notifications table exists
    const tableCheck = await pool.request().query(`
      SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Notifications'
    `);

    if (tableCheck.recordset.length === 0) {
      return res.json([]);
    }

    const result = await pool.request()
      .input('userId', sql.BigInt, req.user.id)
      .query(`
        SELECT Id as id, Message as message, IsRead as isRead, DocumentId as documentId, CreatedAt as createdAt
        FROM Notifications
        WHERE UserId = @userId
        ORDER BY CreatedAt DESC
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

    const tableCheck = await pool.request().query(`
      SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Notifications'
    `);

    if (tableCheck.recordset.length === 0) {
      return res.status(201).json({ id: 0, message, isRead: false, documentId, createdAt: new Date() });
    }

    const result = await pool.request()
      .input('userId', sql.BigInt, userId)
      .input('message', sql.NVarChar, message)
      .input('documentId', sql.BigInt, documentId || null)
      .query(`
        INSERT INTO Notifications (UserId, Message, DocumentId)
        OUTPUT INSERTED.Id as id, INSERTED.Message as message, INSERTED.IsRead as isRead,
               INSERTED.DocumentId as documentId, INSERTED.CreatedAt as createdAt
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

    const tableCheck = await pool.request().query(`
      SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Notifications'
    `);

    if (tableCheck.recordset.length === 0) {
      return res.json({ message: 'Notification marked as read' });
    }

    await pool.request()
      .input('id', sql.BigInt, id)
      .input('userId', sql.BigInt, req.user.id)
      .query(`UPDATE Notifications SET IsRead = 1 WHERE Id = @id AND UserId = @userId`);

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

    const tableCheck = await pool.request().query(`
      SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Notifications'
    `);

    if (tableCheck.recordset.length === 0) {
      return res.json({ message: 'All notifications marked as read' });
    }

    await pool.request()
      .input('userId', sql.BigInt, req.user.id)
      .query(`UPDATE Notifications SET IsRead = 1 WHERE UserId = @userId`);

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

    const tableCheck = await pool.request().query(`
      SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Notifications'
    `);

    if (tableCheck.recordset.length === 0) {
      return res.json({ message: 'Notification deleted' });
    }

    await pool.request()
      .input('id', sql.BigInt, id)
      .input('userId', sql.BigInt, req.user.id)
      .query(`DELETE FROM Notifications WHERE Id = @id AND UserId = @userId`);

    res.json({ message: 'Notification deleted' });
  } catch (err) {
    console.error('Delete notification error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getNotifications, createNotification, markAsRead, markAllAsRead, deleteNotification };
