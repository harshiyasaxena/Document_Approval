import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiAlignLeft, FiLayers, FiUploadCloud } from 'react-icons/fi';

function UploadDocument() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Document Data:', formData);
  };

  const fieldStyle = {
    width: '100%',
    padding: '14px 14px 14px 42px',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    outline: 'none',
    background: 'rgba(255,255,255,0.9)',
    boxShadow: '0 6px 20px rgba(15, 23, 42, 0.04)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px',
        alignItems: 'start',
      }}
      className="upload-grid"
    >
      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        style={{
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          borderRadius: '28px',
          boxShadow: 'var(--shadow)',
          padding: '30px',
          maxWidth: '820px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '30px', letterSpacing: '-0.03em' }}>
            Upload Document
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: '10px', lineHeight: 1.6 }}>
            Submit a new document for approval with title, description, category, and file attachment.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px', position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700 }}>
              Title
            </label>
            <FiFileText style={{ position: 'absolute', left: '14px', top: '44px', color: 'var(--muted)' }} />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter document title"
              style={fieldStyle}
            />
          </div>

          <div style={{ marginBottom: '18px', position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700 }}>
              Description
            </label>
            <FiAlignLeft style={{ position: 'absolute', left: '14px', top: '44px', color: 'var(--muted)' }} />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter document description"
              rows="5"
              style={{
                ...fieldStyle,
                paddingLeft: '42px',
                resize: 'vertical',
              }}
            />
          </div>


          <div style={{ marginBottom: '18px', position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700 }}>
              Category
            </label>
            <FiLayers style={{ position: 'absolute', left: '14px', top: '44px', color: 'var(--muted)' }} />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                ...fieldStyle,
                paddingLeft: '42px',
              }}
            >
              <option value="" disabled>Select the Category</option>
              <option value="Business">Business</option>
              <option value="Finance">Finance</option>
              <option value="Policy">Policy</option>
              <option value="HR">HR</option>
              <option value="General">General</option>
            </select>
          </div>

          <div style={{ marginBottom: '26px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700 }}>
              File Upload
            </label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.9)',
              }}
            />
            <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '8px' }}>
              Upload PDF, DOCX, or image files.
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{
              width: '100%',
              padding: '14px 18px',
              border: 'none',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              color: 'white',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: '0 14px 30px rgba(37, 99, 235, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <FiUploadCloud />
            Submit Document
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default UploadDocument;