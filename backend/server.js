const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const documentRoutes = require('./routes/documents');
const approverRoutes = require('./routes/approvers');
const workflowRoutes = require('./routes/workflows');
const notificationRoutes = require('./routes/notifications');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/approver', approverRoutes);
app.use('/api/approvers', approverRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof require('multer').MulterError) {
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }
  if (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
  next();
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Document Approval API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});
