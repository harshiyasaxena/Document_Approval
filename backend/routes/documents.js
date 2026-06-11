const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  uploadDocument,
  getDocuments,
  getDocumentStats,
  getDocument,
  getComments,
  addComment,
  getHistory,
  resubmitDocument,
  downloadDocument,
  approveDocument,
  rejectDocument,
  requestRevision
} = require('../controllers/documentController');

const router = express.Router();

router.post('/', authenticate, upload.single('file'), uploadDocument);
router.get('/', authenticate, getDocuments);
router.get('/stats', authenticate, getDocumentStats);
router.get('/:id', authenticate, getDocument);

// Comments
router.get('/:id/comments', authenticate, getComments);
router.post('/:id/comments', authenticate, addComment);

// History
router.get('/:id/history', authenticate, getHistory);

// Resubmit & Download
router.put('/:id/resubmit', authenticate, upload.single('file'), resubmitDocument);
router.get('/:id/download', authenticate, downloadDocument);

// Approver actions
router.post('/:id/approve', authenticate, authorize('Approver'), approveDocument);
router.post('/:id/reject', authenticate, authorize('Approver'), rejectDocument);
router.post('/:id/revision', authenticate, authorize('Approver'), requestRevision);

module.exports = router;
