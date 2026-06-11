const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { getAssignedDocuments, getApproverStats, getApproverWorkload, getApprovers } = require('../controllers/approverController');

const router = express.Router();

router.get('/assigned', authenticate, authorize('Approver'), getAssignedDocuments);
router.get('/stats', authenticate, authorize('Approver'), getApproverStats);
router.get('/workload', authenticate, authorize('Admin'), getApproverWorkload);
router.get('/', authenticate, authorize('Admin'), getApprovers);

module.exports = router;
