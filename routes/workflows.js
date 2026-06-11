const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { getWorkflows, updateWorkflow } = require('../controllers/workflowController');

const router = express.Router();

router.get('/', authenticate, authorize('Admin'), getWorkflows);
router.put('/:id', authenticate, authorize('Admin'), updateWorkflow);

module.exports = router;
