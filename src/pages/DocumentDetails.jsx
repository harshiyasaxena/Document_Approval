import { motion } from 'framer-motion';
import {
  FiFileText,
  FiInfo,
  FiTag,
  FiLayers,
  FiClock,
  FiUser,
  FiMessageCircle,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

function DocumentDetails() {
  const location = useLocation();

  const isApprover =
    location.pathname.includes('/approver/');

  const isSubmitter =
    location.pathname.includes('/submitter/');
  const documentData = {
    title: 'Project Name',
    description: 'Proposal for the new company project.',
    workflowType: 'Project Proposal',
    status: 'Pending Approval',
    version: 'v1',
    submittedBy: 'John Doe',
    submittedAt: 'Today, 10:30 AM',
  };

  const comments = [
    {
      name: 'Sarah Khan',
      text: 'Please update the budget section before final approval.',
      time: '1 hour ago',
    },
    {
      name: 'Admin',
      text: 'Document assigned to the department approver.',
      time: '2 hours ago',
    },
  ];

  const history = [
    {
      step: 'Submitted',
      by: 'John Doe',
      time: 'Today, 10:30 AM',
      icon: <FiFileText />,
      color: '#2563eb',
    },
    {
      step: 'Pending Approval',
      by: 'System',
      time: 'Today, 10:35 AM',
      icon: <FiClock />,
      color: '#f59e0b',
    },
  ];

  const getStatusStyle = (status) => {
    if (status === 'Approved') {
      return { bg: 'rgba(22, 163, 74, 0.12)', color: '#16a34a', icon: <FiCheckCircle /> };
    }
    if (status === 'Pending Approval') {
      return { bg: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', icon: <FiClock /> };
    }
    if (status === 'Revision Required') {
      return { bg: 'rgba(220, 38, 38, 0.12)', color: '#dc2626', icon: <FiAlertCircle /> };
    }
    return { bg: 'rgba(37, 99, 235, 0.12)', color: '#2563eb', icon: <FiInfo /> };
  };

  const statusStyle = getStatusStyle(documentData.status);

  const cardStyle = {
    background: 'rgba(255,255,255,0.82)',
    backdropFilter: 'blur(12px)',
    border: '1px solid var(--border)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: 'var(--shadow-soft)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'grid', gap: '22px' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={cardStyle}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '999px',
                background: statusStyle.bg,
                color: statusStyle.color,
                fontSize: '12px',
                fontWeight: 800,
                marginBottom: '14px',
              }}
            >
              {statusStyle.icon}
              {documentData.status}
            </div>

            <h1 style={{ margin: 0, fontSize: '34px', letterSpacing: '-0.03em' }}>
              {documentData.title}
            </h1>
            <p style={{ margin: '10px 0 0', color: 'var(--muted)', lineHeight: 1.7 }}>
              {documentData.description}
            </p>
          </div>

          <div
            style={{
              minWidth: '180px',
              padding: '16px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))',
              border: '1px solid rgba(255,255,255,0.7)',
            }}
          >
            <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Version</div>
            <div style={{ fontSize: '24px', fontWeight: 800 }}>{documentData.version}</div>
          </div>
        </div>
      </motion.div>

      {/* Metadata */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '18px',
        }}
      >
        {[
          { label: 'Submitted By', value: documentData.submittedBy, icon: <FiUser /> },
          { label: 'Submitted At', value: documentData.submittedAt, icon: <FiClock /> },
          { label: 'Workflow Type', value: documentData.workflowType, icon: <FiLayers /> },
        ].map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={cardStyle}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(37, 99, 235, 0.12)',
                color: 'var(--primary)',
                fontSize: '18px',
                marginBottom: '14px',
              }}
            >
              {item.icon}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '6px' }}>
              {item.label}
            </div>
            <div style={{ fontWeight: 800, fontSize: '18px' }}>{item.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Comments and History */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '22px',
        }}
        className="details-grid"
      >
        {/* Comments */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={cardStyle}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <FiMessageCircle style={{ color: 'var(--primary)' }} />
            <h2 style={{ margin: 0 }}>Comments</h2>
          </div>

          <div style={{ display: 'grid', gap: '14px' }}>
            {comments.map((comment, index) => (
              <div
                key={index}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'rgba(248,250,252,0.8)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: '6px' }}>{comment.name}</div>
                <div style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{comment.text}</div>
                <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--muted)' }}>
                  {comment.time}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Approval History */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={cardStyle}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <FiClock style={{ color: 'var(--primary)' }} />
            <h2 style={{ margin: 0 }}>Approval History</h2>
          </div>

          <div style={{ display: 'grid', gap: '14px' }}>
            {history.map((step, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '14px',
                    background: `${step.color}20`,
                    color: step.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </div>

                <div
                  style={{
                    flex: 1,
                    padding: '14px 16px',
                    borderRadius: '16px',
                    background: 'rgba(248,250,252,0.8)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: '4px' }}>{step.step}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
                    By {step.by}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '6px' }}>
                    {step.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DocumentDetails;