const path = require('path');
const { getPool, sql } = require('../config/db');

// POST /api/documents
const uploadDocument = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !category || !req.file) {
      return res.status(400).json({ message: 'Title, category, and file are required' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const pool = getPool();

    const result = await pool.request()
      .input('title', sql.VarChar, title)
      .input('description', sql.Text, description || '')
      .input('category', sql.VarChar, category)
      .input('fileUrl', sql.VarChar, fileUrl)
      .input('submittedBy', sql.Int, req.user.id)
      .query(`
        INSERT INTO documents (title, description, category, file_url, submitted_by)
        OUTPUT INSERTED.id, INSERTED.title, INSERTED.description, INSERTED.category, 
               INSERTED.status, INSERTED.version, INSERTED.created_at
        VALUES (@title, @description, @category, @fileUrl, @submittedBy)
      `);

    const doc = result.recordset[0];

    // Auto-assign approvers from workflow
    const workflow = await pool.request()
      .input('category', sql.VarChar, category)
      .query('SELECT * FROM workflows WHERE name = @category');

    if (workflow.recordset.length > 0) {
      const wf = workflow.recordset[0];
      const assignments = [];

      if (wf.initial_approver_id) {
        assignments.push({ approverId: wf.initial_approver_id, stage: 'Initial Level' });
      }
      if (wf.compliance_approver_id) {
        assignments.push({ approverId: wf.compliance_approver_id, stage: 'Compliance Level' });
      }
      if (wf.final_approver_id) {
        assignments.push({ approverId: wf.final_approver_id, stage: 'Final Level' });
      }

      for (const assignment of assignments) {
        await pool.request()
          .input('docId', sql.Int, doc.id)
          .input('approverId', sql.Int, assignment.approverId)
          .input('stage', sql.VarChar, assignment.stage)
          .query(`
            INSERT INTO document_approvers (document_id, approver_id, stage)
            VALUES (@docId, @approverId, @stage)
          `);
      }
    }

    // Add history entry
    await pool.request()
      .input('docId', sql.Int, doc.id)
      .input('step', sql.VarChar, 'Submitted')
      .input('performedBy', sql.Int, req.user.id)
      .input('color', sql.VarChar, '#2563eb')
      .query(`
        INSERT INTO document_history (document_id, step, performed_by, color)
        VALUES (@docId, @step, @performedBy, @color)
      `);

    res.status(201).json({
      id: doc.id,
      title: doc.title,
      description: doc.description,
      category: doc.category,
      status: doc.status,
      version: doc.version,
      submittedBy: req.user.name,
      submittedAt: doc.created_at
    });
  } catch (err) {
    console.error('Upload document error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/documents
const getDocuments = async (req, res) => {
  try {
    const { search, status, category } = req.query;
    const pool = getPool();
    const request = pool.request();

    let query = `
      SELECT d.id, d.title, d.status, d.version, d.created_at as date, 
             u.name as owner, d.category
      FROM documents d
      JOIN users u ON d.submitted_by = u.id
      WHERE 1=1
    `;

    if (req.user.role === 'Submitter') {
      query += ' AND d.submitted_by = @userId';
      request.input('userId', sql.Int, req.user.id);
    }

    if (search) {
      query += ' AND (d.title LIKE @search OR u.name LIKE @search)';
      request.input('search', sql.VarChar, `%${search}%`);
    }

    if (status) {
      query += ' AND d.status = @status';
      request.input('status', sql.VarChar, status);
    }

    if (category) {
      query += ' AND d.category = @category';
      request.input('category', sql.VarChar, category);
    }

    query += ' ORDER BY d.created_at DESC';

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
        SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'Pending Approval' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'Revision Required' THEN 1 ELSE 0 END) as revision,
        SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected
      FROM documents
    `;

    if (req.user.role === 'Submitter') {
      query += ' WHERE submitted_by = @userId';
      request.input('userId', sql.Int, req.user.id);
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
      .input('id', sql.Int, id)
      .query(`
        SELECT d.id, d.title, d.description, d.category as workflowType, 
               d.status, d.version, u.name as submittedBy, d.created_at as submittedAt,
               d.current_stage as currentStage, d.file_url as fileUrl
        FROM documents d
        JOIN users u ON d.submitted_by = u.id
        WHERE d.id = @id
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
      .input('docId', sql.Int, id)
      .query(`
        SELECT c.id, u.name, c.text, c.created_at as time
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.document_id = @docId
        ORDER BY c.created_at DESC
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
    const result = await pool.request()
      .input('docId', sql.Int, id)
      .input('userId', sql.Int, req.user.id)
      .input('text', sql.Text, text)
      .query(`
        INSERT INTO comments (document_id, user_id, text)
        OUTPUT INSERTED.id, INSERTED.text, INSERTED.created_at as time
        VALUES (@docId, @userId, @text)
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
      .input('docId', sql.Int, id)
      .query(`
        SELECT h.id, h.step, u.name as [by], h.created_at as time, h.color
        FROM document_history h
        JOIN users u ON h.performed_by = u.id
        WHERE h.document_id = @docId
        ORDER BY h.created_at ASC
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

    const docResult = await pool.request()
      .input('id', sql.Int, id)
      .input('userId', sql.Int, req.user.id)
      .query('SELECT * FROM documents WHERE id = @id AND submitted_by = @userId');

    if (docResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Document not found or not authorized' });
    }

    const doc = docResult.recordset[0];
    const currentVersion = parseInt(doc.version.replace('v', ''));
    const newVersion = `v${currentVersion + 1}`;

    let fileUrl = doc.file_url;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }

    await pool.request()
      .input('id', sql.Int, id)
      .input('version', sql.VarChar, newVersion)
      .input('fileUrl', sql.VarChar, fileUrl)
      .query(`
        UPDATE documents 
        SET status = 'Pending Approval', version = @version, file_url = @fileUrl,
            current_stage = 'Initial Level', updated_at = GETDATE()
        WHERE id = @id
      `);

    // Reset approver statuses
    await pool.request()
      .input('docId', sql.Int, id)
      .query(`UPDATE document_approvers SET status = 'Pending', acted_at = NULL WHERE document_id = @docId`);

    // Add history
    await pool.request()
      .input('docId', sql.Int, id)
      .input('step', sql.VarChar, `Resubmitted (${newVersion})`)
      .input('performedBy', sql.Int, req.user.id)
      .input('color', sql.VarChar, '#2563eb')
      .query(`
        INSERT INTO document_history (document_id, step, performed_by, color)
        VALUES (@docId, @step, @performedBy, @color)
      `);

    res.json({ message: 'Document resubmitted successfully', version: newVersion });
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
      .input('id', sql.Int, id)
      .query('SELECT file_url, title FROM documents WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const doc = result.recordset[0];
    const filePath = path.join(__dirname, '..', doc.file_url);
    res.download(filePath, doc.title + path.extname(doc.file_url));
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

    const docResult = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM documents WHERE id = @id');

    if (docResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const doc = docResult.recordset[0];

    // Update approver assignment
    await pool.request()
      .input('docId', sql.Int, id)
      .input('approverId', sql.Int, req.user.id)
      .input('stage', sql.VarChar, doc.current_stage)
      .input('comment', sql.Text, comment || '')
      .query(`
        UPDATE document_approvers 
        SET status = 'Approved', comment = @comment, acted_at = GETDATE()
        WHERE document_id = @docId AND approver_id = @approverId AND stage = @stage
      `);

    // Determine next stage
    let nextStage = null;
    let newStatus = doc.status;

    if (doc.current_stage === 'Initial Level') {
      nextStage = 'Compliance Level';
    } else if (doc.current_stage === 'Compliance Level') {
      nextStage = 'Final Level';
    } else if (doc.current_stage === 'Final Level') {
      newStatus = 'Approved';
    }

    // Update document
    if (nextStage) {
      await pool.request()
        .input('id', sql.Int, id)
        .input('nextStage', sql.VarChar, nextStage)
        .query(`UPDATE documents SET current_stage = @nextStage, updated_at = GETDATE() WHERE id = @id`);
    } else {
      await pool.request()
        .input('id', sql.Int, id)
        .input('status', sql.VarChar, newStatus)
        .query(`UPDATE documents SET status = @status, updated_at = GETDATE() WHERE id = @id`);
    }

    // Add history
    const stepText = newStatus === 'Approved'
      ? 'Approved (Final)'
      : `Approved at ${doc.current_stage}`;

    await pool.request()
      .input('docId', sql.Int, id)
      .input('step', sql.VarChar, stepText)
      .input('performedBy', sql.Int, req.user.id)
      .input('color', sql.VarChar, '#16a34a')
      .query(`
        INSERT INTO document_history (document_id, step, performed_by, color)
        VALUES (@docId, @step, @performedBy, @color)
      `);

    // Add comment if provided
    if (comment) {
      await pool.request()
        .input('docId', sql.Int, id)
        .input('userId', sql.Int, req.user.id)
        .input('text', sql.Text, comment)
        .query(`INSERT INTO comments (document_id, user_id, text) VALUES (@docId, @userId, @text)`);
    }

    res.json({
      id: parseInt(id),
      status: nextStage ? 'Pending Approval' : 'Approved',
      currentStage: nextStage || doc.current_stage,
      message: nextStage
        ? `Document advanced to ${nextStage}`
        : 'Document has been fully approved'
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

    const docResult = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM documents WHERE id = @id');

    if (docResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const doc = docResult.recordset[0];

    await pool.request()
      .input('id', sql.Int, id)
      .query(`UPDATE documents SET status = 'Rejected', updated_at = GETDATE() WHERE id = @id`);

    await pool.request()
      .input('docId', sql.Int, id)
      .input('approverId', sql.Int, req.user.id)
      .input('stage', sql.VarChar, doc.current_stage)
      .input('comment', sql.Text, comment || '')
      .query(`
        UPDATE document_approvers 
        SET status = 'Rejected', comment = @comment, acted_at = GETDATE()
        WHERE document_id = @docId AND approver_id = @approverId AND stage = @stage
      `);

    await pool.request()
      .input('docId', sql.Int, id)
      .input('step', sql.VarChar, `Rejected at ${doc.current_stage}`)
      .input('performedBy', sql.Int, req.user.id)
      .input('color', sql.VarChar, '#dc2626')
      .query(`
        INSERT INTO document_history (document_id, step, performed_by, color)
        VALUES (@docId, @step, @performedBy, @color)
      `);

    if (comment) {
      await pool.request()
        .input('docId', sql.Int, id)
        .input('userId', sql.Int, req.user.id)
        .input('text', sql.Text, comment)
        .query(`INSERT INTO comments (document_id, user_id, text) VALUES (@docId, @userId, @text)`);
    }

    res.json({
      id: parseInt(id),
      status: 'Rejected',
      currentStage: doc.current_stage,
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

    const docResult = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM documents WHERE id = @id');

    if (docResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const doc = docResult.recordset[0];

    await pool.request()
      .input('id', sql.Int, id)
      .query(`UPDATE documents SET status = 'Revision Required', updated_at = GETDATE() WHERE id = @id`);

    await pool.request()
      .input('docId', sql.Int, id)
      .input('approverId', sql.Int, req.user.id)
      .input('stage', sql.VarChar, doc.current_stage)
      .input('comment', sql.Text, comment || '')
      .query(`
        UPDATE document_approvers 
        SET status = 'Revision', comment = @comment, acted_at = GETDATE()
        WHERE document_id = @docId AND approver_id = @approverId AND stage = @stage
      `);

    await pool.request()
      .input('docId', sql.Int, id)
      .input('step', sql.VarChar, `Revision Required at ${doc.current_stage}`)
      .input('performedBy', sql.Int, req.user.id)
      .input('color', sql.VarChar, '#f59e0b')
      .query(`
        INSERT INTO document_history (document_id, step, performed_by, color)
        VALUES (@docId, @step, @performedBy, @color)
      `);

    if (comment) {
      await pool.request()
        .input('docId', sql.Int, id)
        .input('userId', sql.Int, req.user.id)
        .input('text', sql.Text, comment)
        .query(`INSERT INTO comments (document_id, user_id, text) VALUES (@docId, @userId, @text)`);
    }

    res.json({
      id: parseInt(id),
      status: 'Revision Required',
      currentStage: doc.current_stage,
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
