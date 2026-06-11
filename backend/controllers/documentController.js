const path = require('path');
const { getPool, sql } = require('../config/db');

// POST /api/documents - Upload document
const uploadDocument = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !category || !req.file) {
      return res.status(400).json({ message: 'Title, category, and file are required' });
    }

    const pool = getPool();

    // Get category ID
    const catResult = await pool.request()
      .input('catName', sql.NVarChar, category)
      .query('SELECT CategoryId FROM Categories WHERE CategoryName = @catName AND IsActive = 1');

    if (catResult.recordset.length === 0) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const categoryId = catResult.recordset[0].CategoryId;

    // Insert document
    const docResult = await pool.request()
      .input('title', sql.NVarChar, title)
      .input('description', sql.NVarChar, description || '')
      .input('categoryId', sql.Int, categoryId)
      .input('submitterId', sql.BigInt, req.user.id)
      .query(`
        INSERT INTO Documents (Title, Description, CategoryId, SubmitterId)
        OUTPUT INSERTED.DocumentId, INSERTED.Title, INSERTED.Description, 
               INSERTED.Status, INSERTED.CurrentVersionNo, INSERTED.CreatedAt
        VALUES (@title, @description, @categoryId, @submitterId)
      `);

    const doc = docResult.recordset[0];

    // Insert document version (file info)
    const fileUrl = `/uploads/${req.file.filename}`;
    await pool.request()
      .input('docId', sql.BigInt, doc.DocumentId)
      .input('versionNo', sql.Int, 1)
      .input('originalFileName', sql.NVarChar, req.file.originalname)
      .input('storedFileName', sql.NVarChar, req.file.filename)
      .input('filePath', sql.NVarChar, fileUrl)
      .input('fileType', sql.NVarChar, req.file.mimetype)
      .input('fileSize', sql.BigInt, req.file.size)
      .input('uploadedBy', sql.BigInt, req.user.id)
      .query(`
        INSERT INTO DocumentVersions (DocumentId, VersionNo, OriginalFileName, StoredFileName, FilePath, FileType, FileSizeInBytes, UploadedBy)
        VALUES (@docId, @versionNo, @originalFileName, @storedFileName, @filePath, @fileType, @fileSize, @uploadedBy)
      `);

    // Auto-assign approvers from workflow stages
    const stages = await pool.request()
      .input('categoryId', sql.Int, categoryId)
      .query(`
        SELECT ws.StageId, ws.StageName, ws.StageOrder, sa.ApproverUserId
        FROM WorkflowStages ws
        JOIN StageApprovers sa ON ws.StageId = sa.StageId
        WHERE ws.CategoryId = @categoryId AND ws.IsActive = 1
        ORDER BY ws.StageOrder
      `);

    // Get version ID
    const versionResult = await pool.request()
      .input('docId', sql.BigInt, doc.DocumentId)
      .input('versionNo', sql.Int, 1)
      .query('SELECT VersionId FROM DocumentVersions WHERE DocumentId = @docId AND VersionNo = @versionNo');

    const versionId = versionResult.recordset[0].VersionId;

    for (const stage of stages.recordset) {
      await pool.request()
        .input('docId', sql.BigInt, doc.DocumentId)
        .input('versionId', sql.BigInt, versionId)
        .input('stageId', sql.BigInt, stage.StageId)
        .input('approverUserId', sql.BigInt, stage.ApproverUserId)
        .input('stageOrder', sql.Int, stage.StageOrder)
        .query(`
          INSERT INTO DocumentApprovals (DocumentId, VersionId, StageId, ApproverUserId, StageOrder)
          VALUES (@docId, @versionId, @stageId, @approverUserId, @stageOrder)
        `);
    }

    res.status(201).json({
      id: doc.DocumentId,
      title: doc.Title,
      description: doc.Description,
      category: category,
      status: doc.Status,
      version: `v${doc.CurrentVersionNo}`,
      submittedBy: req.user.name,
      submittedAt: doc.CreatedAt
    });
  } catch (err) {
    console.error('Upload document error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/documents - List documents (scoped by role)
const getDocuments = async (req, res) => {
  try {
    const { search, status, category } = req.query;
    const pool = getPool();
    const request = pool.request();

    let query = `
      SELECT d.DocumentId as id, d.Title as title, d.Status as status, 
             CONCAT('v', d.CurrentVersionNo) as version, d.CreatedAt as date,
             u.FullName as owner, c.CategoryName as category
      FROM Documents d
      JOIN Users u ON d.SubmitterId = u.UserId
      JOIN Categories c ON d.CategoryId = c.CategoryId
      WHERE 1=1
    `;

    if (req.user.role === 'Submitter') {
      query += ' AND d.SubmitterId = @userId';
      request.input('userId', sql.BigInt, req.user.id);
    }

    if (search) {
      query += ' AND (d.Title LIKE @search OR u.FullName LIKE @search)';
      request.input('search', sql.NVarChar, `%${search}%`);
    }

    if (status) {
      query += ' AND d.Status = @status';
      request.input('status', sql.NVarChar, status);
    }

    if (category) {
      query += ' AND c.CategoryName = @category';
      request.input('category', sql.NVarChar, category);
    }

    query += ' ORDER BY d.CreatedAt DESC';

    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Get documents error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/documents/stats
const getDocumentStats = async (req, res) => {
  try {
    const pool = getPool();
    const request = pool.request();

    let query = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN Status = 'Approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN Status = 'Pending Approval' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN Status = 'Revision Required' THEN 1 ELSE 0 END) as revision,
        SUM(CASE WHEN Status = 'Rejected' THEN 1 ELSE 0 END) as rejected
      FROM Documents
    `;

    if (req.user.role === 'Submitter') {
      query += ' WHERE SubmitterId = @userId';
      request.input('userId', sql.BigInt, req.user.id);
    }

    const result = await request.query(query);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Get document stats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/documents/:id
const getDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const result = await pool.request()
      .input('id', sql.BigInt, id)
      .query(`
        SELECT d.DocumentId as id, d.Title as title, d.Description as description,
               c.CategoryName as workflowType, d.Status as status, 
               CONCAT('v', d.CurrentVersionNo) as version,
               u.FullName as submittedBy, d.CreatedAt as submittedAt,
               ws.StageName as currentStage, dv.FilePath as fileUrl
        FROM Documents d
        JOIN Users u ON d.SubmitterId = u.UserId
        JOIN Categories c ON d.CategoryId = c.CategoryId
        LEFT JOIN DocumentVersions dv ON d.DocumentId = dv.DocumentId AND d.CurrentVersionNo = dv.VersionNo
        LEFT JOIN DocumentApprovals da ON d.DocumentId = da.DocumentId AND da.Status = 'Pending'
        LEFT JOIN WorkflowStages ws ON da.StageId = ws.StageId
        WHERE d.DocumentId = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Get document error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/documents/:id/comments
const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const result = await pool.request()
      .input('docId', sql.BigInt, id)
      .query(`
        SELECT c.CommentId as id, u.FullName as name, c.CommentText as text, c.CreatedAt as time
        FROM Comments c
        JOIN Users u ON c.CommentBy = u.UserId
        WHERE c.DocumentId = @docId
        ORDER BY c.CreatedAt DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Get comments error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/documents/:id/comments
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const pool = getPool();

    // Get current version ID
    const versionResult = await pool.request()
      .input('docId', sql.BigInt, id)
      .query(`
        SELECT TOP 1 dv.VersionId FROM DocumentVersions dv
        JOIN Documents d ON d.DocumentId = dv.DocumentId AND d.CurrentVersionNo = dv.VersionNo
        WHERE dv.DocumentId = @docId
      `);

    const versionId = versionResult.recordset.length > 0 ? versionResult.recordset[0].VersionId : null;

    const result = await pool.request()
      .input('docId', sql.BigInt, id)
      .input('versionId', sql.BigInt, versionId)
      .input('commentBy', sql.BigInt, req.user.id)
      .input('text', sql.NVarChar, text)
      .query(`
        INSERT INTO Comments (DocumentId, VersionId, CommentBy, CommentText)
        OUTPUT INSERTED.CommentId as id, INSERTED.CommentText as text, INSERTED.CreatedAt as time
        VALUES (@docId, @versionId, @commentBy, @text)
      `);

    const comment = result.recordset[0];
    res.status(201).json({
      id: comment.id,
      name: req.user.name,
      text: comment.text,
      time: comment.time
    });
  } catch (err) {
    console.error('Add comment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/documents/:id/history
const getHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const result = await pool.request()
      .input('docId', sql.BigInt, id)
      .query(`
        SELECT da.ApprovalId as id, 
               CASE 
                 WHEN da.Status = 'Pending' THEN CONCAT('Pending - ', ws.StageName)
                 WHEN da.Status = 'Approved' THEN CONCAT('Approved at ', ws.StageName)
                 WHEN da.Status = 'Rejected' THEN CONCAT('Rejected at ', ws.StageName)
                 WHEN da.Status = 'Revision' THEN CONCAT('Revision Required at ', ws.StageName)
               END as step,
               u.FullName as [by],
               COALESCE(da.ActionAt, da.StartedAt) as time,
               CASE 
                 WHEN da.Status = 'Approved' THEN '#16a34a'
                 WHEN da.Status = 'Rejected' THEN '#dc2626'
                 WHEN da.Status = 'Revision' THEN '#f59e0b'
                 ELSE '#2563eb'
               END as color
        FROM DocumentApprovals da
        JOIN WorkflowStages ws ON da.StageId = ws.StageId
        JOIN Users u ON da.ApproverUserId = u.UserId
        WHERE da.DocumentId = @docId
        ORDER BY da.StageOrder ASC, da.ActionAt ASC
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/documents/:id/resubmit
const resubmitDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    // Get current document
    const docResult = await pool.request()
      .input('id', sql.BigInt, id)
      .input('userId', sql.BigInt, req.user.id)
      .query('SELECT * FROM Documents WHERE DocumentId = @id AND SubmitterId = @userId');

    if (docResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Document not found or not authorized' });
    }

    const doc = docResult.recordset[0];
    const newVersionNo = doc.CurrentVersionNo + 1;

    // Insert new version
    let fileUrl;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
      await pool.request()
        .input('docId', sql.BigInt, id)
        .input('versionNo', sql.Int, newVersionNo)
        .input('originalFileName', sql.NVarChar, req.file.originalname)
        .input('storedFileName', sql.NVarChar, req.file.filename)
        .input('filePath', sql.NVarChar, fileUrl)
        .input('fileType', sql.NVarChar, req.file.mimetype)
        .input('fileSize', sql.BigInt, req.file.size)
        .input('uploadedBy', sql.BigInt, req.user.id)
        .query(`
          INSERT INTO DocumentVersions (DocumentId, VersionNo, OriginalFileName, StoredFileName, FilePath, FileType, FileSizeInBytes, UploadedBy)
          VALUES (@docId, @versionNo, @originalFileName, @storedFileName, @filePath, @fileType, @fileSize, @uploadedBy)
        `);
    } else {
      // Copy previous version file info
      await pool.request()
        .input('docId', sql.BigInt, id)
        .input('newVersionNo', sql.Int, newVersionNo)
        .input('oldVersionNo', sql.Int, doc.CurrentVersionNo)
        .input('uploadedBy', sql.BigInt, req.user.id)
        .query(`
          INSERT INTO DocumentVersions (DocumentId, VersionNo, OriginalFileName, StoredFileName, FilePath, FileType, FileSizeInBytes, UploadedBy)
          SELECT DocumentId, @newVersionNo, OriginalFileName, StoredFileName, FilePath, FileType, FileSizeInBytes, @uploadedBy
          FROM DocumentVersions WHERE DocumentId = @docId AND VersionNo = @oldVersionNo
        `);
    }

    // Update document
    await pool.request()
      .input('id', sql.BigInt, id)
      .input('newVersionNo', sql.Int, newVersionNo)
      .query(`
        UPDATE Documents 
        SET Status = 'Pending Approval', CurrentVersionNo = @newVersionNo, UpdatedAt = SYSUTCDATETIME()
        WHERE DocumentId = @id
      `);

    // Get new version ID
    const newVersionResult = await pool.request()
      .input('docId', sql.BigInt, id)
      .input('versionNo', sql.Int, newVersionNo)
      .query('SELECT VersionId FROM DocumentVersions WHERE DocumentId = @docId AND VersionNo = @versionNo');

    const newVersionId = newVersionResult.recordset[0].VersionId;

    // Re-create approval entries for new version
    const stages = await pool.request()
      .input('categoryId', sql.Int, doc.CategoryId)
      .query(`
        SELECT ws.StageId, ws.StageOrder, sa.ApproverUserId
        FROM WorkflowStages ws
        JOIN StageApprovers sa ON ws.StageId = sa.StageId
        WHERE ws.CategoryId = @categoryId AND ws.IsActive = 1
        ORDER BY ws.StageOrder
      `);

    for (const stage of stages.recordset) {
      await pool.request()
        .input('docId', sql.BigInt, id)
        .input('versionId', sql.BigInt, newVersionId)
        .input('stageId', sql.BigInt, stage.StageId)
        .input('approverUserId', sql.BigInt, stage.ApproverUserId)
        .input('stageOrder', sql.Int, stage.StageOrder)
        .query(`
          INSERT INTO DocumentApprovals (DocumentId, VersionId, StageId, ApproverUserId, StageOrder)
          VALUES (@docId, @versionId, @stageId, @approverUserId, @stageOrder)
        `);
    }

    res.json({ message: 'Document resubmitted successfully', version: `v${newVersionNo}` });
  } catch (err) {
    console.error('Resubmit error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/documents/:id/download
const downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const result = await pool.request()
      .input('id', sql.BigInt, id)
      .query(`
        SELECT dv.FilePath, dv.OriginalFileName, d.Title
        FROM Documents d
        JOIN DocumentVersions dv ON d.DocumentId = dv.DocumentId AND d.CurrentVersionNo = dv.VersionNo
        WHERE d.DocumentId = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const doc = result.recordset[0];
    const filePath = path.join(__dirname, '..', doc.FilePath);
    res.download(filePath, doc.OriginalFileName);
  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/documents/:id/approve
const approveDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const pool = getPool();

    // Get current pending approval for this approver
    const approvalResult = await pool.request()
      .input('docId', sql.BigInt, id)
      .input('approverId', sql.BigInt, req.user.id)
      .query(`
        SELECT TOP 1 da.ApprovalId, da.StageId, da.StageOrder, da.VersionId, ws.StageName
        FROM DocumentApprovals da
        JOIN WorkflowStages ws ON da.StageId = ws.StageId
        WHERE da.DocumentId = @docId AND da.ApproverUserId = @approverId AND da.Status = 'Pending'
        ORDER BY da.StageOrder
      `);

    if (approvalResult.recordset.length === 0) {
      return res.status(400).json({ message: 'No pending approval found for this document' });
    }

    const approval = approvalResult.recordset[0];

    // Update approval status
    await pool.request()
      .input('approvalId', sql.BigInt, approval.ApprovalId)
      .input('comment', sql.NVarChar, comment || '')
      .query(`
        UPDATE DocumentApprovals 
        SET Status = 'Approved', ActionComment = @comment, ActionAt = SYSUTCDATETIME()
        WHERE ApprovalId = @approvalId
      `);

    // Check if there's a next stage
    const nextStage = await pool.request()
      .input('docId', sql.BigInt, id)
      .input('versionId', sql.BigInt, approval.VersionId)
      .input('currentOrder', sql.Int, approval.StageOrder)
      .query(`
        SELECT TOP 1 da.ApprovalId, ws.StageName
        FROM DocumentApprovals da
        JOIN WorkflowStages ws ON da.StageId = ws.StageId
        WHERE da.DocumentId = @docId AND da.VersionId = @versionId 
          AND da.StageOrder > @currentOrder AND da.Status = 'Pending'
        ORDER BY da.StageOrder
      `);

    let newStatus, currentStage, message;

    if (nextStage.recordset.length > 0) {
      // Advance to next stage
      newStatus = 'Pending Approval';
      currentStage = nextStage.recordset[0].StageName;
      message = `Document advanced to ${currentStage}`;

      // Mark next stage as started
      await pool.request()
        .input('approvalId', sql.BigInt, nextStage.recordset[0].ApprovalId)
        .query(`UPDATE DocumentApprovals SET StartedAt = SYSUTCDATETIME() WHERE ApprovalId = @approvalId`);
    } else {
      // All stages approved
      newStatus = 'Approved';
      currentStage = approval.StageName;
      message = 'Document has been fully approved';

      await pool.request()
        .input('docId', sql.BigInt, id)
        .query(`UPDATE Documents SET Status = 'Approved', UpdatedAt = SYSUTCDATETIME() WHERE DocumentId = @docId`);
    }

    // Add comment if provided
    if (comment) {
      const versionId = approval.VersionId;
      await pool.request()
        .input('docId', sql.BigInt, id)
        .input('versionId', sql.BigInt, versionId)
        .input('commentBy', sql.BigInt, req.user.id)
        .input('text', sql.NVarChar, comment)
        .query(`INSERT INTO Comments (DocumentId, VersionId, CommentBy, CommentText) VALUES (@docId, @versionId, @commentBy, @text)`);
    }

    res.json({
      id: parseInt(id),
      status: newStatus,
      currentStage: currentStage,
      message: message
    });
  } catch (err) {
    console.error('Approve error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/documents/:id/reject
const rejectDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const pool = getPool();

    // Get current pending approval
    const approvalResult = await pool.request()
      .input('docId', sql.BigInt, id)
      .input('approverId', sql.BigInt, req.user.id)
      .query(`
        SELECT TOP 1 da.ApprovalId, da.VersionId, ws.StageName
        FROM DocumentApprovals da
        JOIN WorkflowStages ws ON da.StageId = ws.StageId
        WHERE da.DocumentId = @docId AND da.ApproverUserId = @approverId AND da.Status = 'Pending'
      `);

    if (approvalResult.recordset.length === 0) {
      return res.status(400).json({ message: 'No pending approval found' });
    }

    const approval = approvalResult.recordset[0];

    // Update approval
    await pool.request()
      .input('approvalId', sql.BigInt, approval.ApprovalId)
      .input('comment', sql.NVarChar, comment || '')
      .query(`
        UPDATE DocumentApprovals 
        SET Status = 'Rejected', ActionComment = @comment, ActionAt = SYSUTCDATETIME()
        WHERE ApprovalId = @approvalId
      `);

    // Update document status
    await pool.request()
      .input('docId', sql.BigInt, id)
      .query(`UPDATE Documents SET Status = 'Rejected', UpdatedAt = SYSUTCDATETIME() WHERE DocumentId = @docId`);

    // Add comment
    if (comment) {
      await pool.request()
        .input('docId', sql.BigInt, id)
        .input('versionId', sql.BigInt, approval.VersionId)
        .input('commentBy', sql.BigInt, req.user.id)
        .input('text', sql.NVarChar, comment)
        .query(`INSERT INTO Comments (DocumentId, VersionId, CommentBy, CommentText) VALUES (@docId, @versionId, @commentBy, @text)`);
    }

    res.json({
      id: parseInt(id),
      status: 'Rejected',
      currentStage: approval.StageName,
      message: 'Document has been rejected'
    });
  } catch (err) {
    console.error('Reject error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/documents/:id/revision
const requestRevision = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const pool = getPool();

    // Get current pending approval
    const approvalResult = await pool.request()
      .input('docId', sql.BigInt, id)
      .input('approverId', sql.BigInt, req.user.id)
      .query(`
        SELECT TOP 1 da.ApprovalId, da.VersionId, ws.StageName
        FROM DocumentApprovals da
        JOIN WorkflowStages ws ON da.StageId = ws.StageId
        WHERE da.DocumentId = @docId AND da.ApproverUserId = @approverId AND da.Status = 'Pending'
      `);

    if (approvalResult.recordset.length === 0) {
      return res.status(400).json({ message: 'No pending approval found' });
    }

    const approval = approvalResult.recordset[0];

    // Update approval
    await pool.request()
      .input('approvalId', sql.BigInt, approval.ApprovalId)
      .input('comment', sql.NVarChar, comment || '')
      .query(`
        UPDATE DocumentApprovals 
        SET Status = 'Revision', ActionComment = @comment, ActionAt = SYSUTCDATETIME()
        WHERE ApprovalId = @approvalId
      `);

    // Update document status
    await pool.request()
      .input('docId', sql.BigInt, id)
      .query(`UPDATE Documents SET Status = 'Revision Required', UpdatedAt = SYSUTCDATETIME() WHERE DocumentId = @docId`);

    // Add comment
    if (comment) {
      await pool.request()
        .input('docId', sql.BigInt, id)
        .input('versionId', sql.BigInt, approval.VersionId)
        .input('commentBy', sql.BigInt, req.user.id)
        .input('text', sql.NVarChar, comment)
        .query(`INSERT INTO Comments (DocumentId, VersionId, CommentBy, CommentText) VALUES (@docId, @versionId, @commentBy, @text)`);
    }

    res.json({
      id: parseInt(id),
      status: 'Revision Required',
      currentStage: approval.StageName,
      message: 'Revision requested from submitter'
    });
  } catch (err) {
    console.error('Revision error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
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
};
