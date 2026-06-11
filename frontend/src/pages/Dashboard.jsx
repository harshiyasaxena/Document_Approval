import { motion } from 'framer-motion';
import { FiFileText, FiClock, FiCheckCircle, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Dashboard() {
  const stats = [
    {
      title: 'Total Documents',
      value: '128',
      icon: <FiFileText />,
      color: '#2563eb',
      bg: 'rgba(37, 99, 235, 0.12)',
    },
    {
      title: 'Pending Approval',
      value: '24',
      icon: <FiClock />,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
    },
    {
      title: 'Approved',
      value: '89',
      icon: <FiCheckCircle />,
      color: '#16a34a',
      bg: 'rgba(22, 163, 74, 0.12)',
    },
    {
      title: 'Revision Required',
      value: '15',
      icon: <FiAlertCircle />,
      color: '#dc2626',
      bg: 'rgba(220, 38, 38, 0.12)',
    },
  ];

  const documents = [
    {
      id: 1,
      title: 'Project Proposal',
      category: 'Business',
      status: 'Pending Approval',
      date: 'Today',
      color: '#f59e0b',
    },
    {
      id: 2,
      title: 'Budget Request',
      category: 'Finance',
      status: 'Approved',
      date: 'Yesterday',
      color: '#16a34a',
    },
    {
      id: 3,
      title: 'Policy Document',
      category: 'HR',
      status: 'Revision Required',
      date: '2 days ago',
      color: '#dc2626',
    },
  ];

  const activities = [
    'John approved Budget Request',
    'Revision requested for Policy Document',
    'New document uploaded: Project Proposal',
    'Admin assigned approver for Finance workflow',
  ];

  const getStatusStyle = (status) => {
    if (status === 'Approved') {
      return { bg: 'rgba(22, 163, 74, 0.12)', color: '#16a34a' };
    }
    if (status === 'Pending Approval') {
      return { bg: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' };
    }
    return { bg: 'rgba(220, 38, 38, 0.12)', color: '#dc2626' };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '34px', letterSpacing: '-0.03em' }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--muted)', marginTop: '8px', fontSize: '16px' }}>
          Overview of document workflow activity and status.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '18px',
          marginBottom: '28px',
        }}
      >
        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            style={{
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              borderRadius: '22px',
              padding: '20px',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: item.color,
                background: item.bg,
                fontSize: '20px',
                marginBottom: '14px',
              }}
            >
              {item.icon}
            </div>

            <div style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '6px' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, letterSpacing: '-0.04em' }}>
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.8fr',
          gap: '22px',
        }}
        className="dashboard-grid"
      >
        {/* Documents */}
        <div
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: '22px',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '18px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>Recent Documents</h2>
              <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>
                Latest document submissions and workflow status.
              </p>
            </div>

            <Link
              to="/upload"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 14px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                color: 'white',
                fontWeight: 700,
              }}
            >
              Upload New <FiArrowRight />
            </Link>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {documents.map((doc, index) => {
              const badgeStyle = getStatusStyle(doc.status);

              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '18px',
                    padding: '18px',
                    background: 'rgba(248, 250, 252, 0.75)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '14px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <h3 style={{ margin: '0 0 8px' }}>{doc.title}</h3>
                      <p style={{ margin: '0 0 8px', color: 'var(--muted)' }}>
                        Category: {doc.category}
                      </p>
                      <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>
                        Submitted: {doc.date}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '8px 12px',
                        borderRadius: '999px',
                        background: badgeStyle.bg,
                        color: badgeStyle.color,
                        fontSize: '12px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {doc.status}
                    </div>
                  </div>

                  <div style={{ marginTop: '14px' }}>
                    <Link
                      to={`/document/${doc.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--primary)',
                        fontWeight: 700,
                      }}
                    >
                      View Details <FiArrowRight />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Activity */}
        <div
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: '22px',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Recent Activity</h2>
          <p style={{ marginTop: '-6px', color: 'var(--muted)' }}>
            Latest updates in the system
          </p>

          <div style={{ display: 'grid', gap: '14px', marginTop: '18px' }}>
            {activities.map((activity, index) => (
              <motion.div
                key={activity}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                style={{
                  padding: '14px 16px',
                  borderRadius: '16px',
                  background: 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  lineHeight: 1.6,
                }}
              >
                {activity}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;