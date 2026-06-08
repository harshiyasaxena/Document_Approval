import { motion } from 'framer-motion';
import {
  FiClock,
  FiCheckCircle,
  FiRefreshCw,
  FiFileText,
  FiXCircle,
  FiUser,
  FiFolder,
  FiCalendar,
} from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ApproverDashboard() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const stats = [
    {
      title: 'Total Assigned',
      value: '28',
      icon: <FiFileText />,
      color: '#2563eb',
      bg: 'rgba(37,99,235,.12)',
    },
    {
      title: 'Pending Approvals',
      value: '12',
      icon: <FiClock />,
      color: '#f59e0b',
      bg: 'rgba(245,158,11,.12)',
    },
    {
      title: 'Approved',
      value: '9',
      icon: <FiCheckCircle />,
      color: '#16a34a',
      bg: 'rgba(22,163,74,.12)',
    },
    {
      title: 'Revision Requests',
      value: '4',
      icon: <FiRefreshCw />,
      color: '#dc2626',
      bg: 'rgba(220,38,38,.12)',
    },
    {
      title: 'Rejected',
      value: '3',
      icon: <FiXCircle />,
      color: '#7f1d1d',
      bg: 'rgba(127,29,29,.12)',
    },
  ];
  const documents = [
    {
      id: 1,
      title: 'Project Name 1',
      submitter: 'John Doe',
      workflow: 'Project Proposal',
      date: 'Today',
      status: 'Pending Approval',
    },
    {
      id: 2,
      title: 'Project Name 2',
      submitter: 'Sarah Khan',
      workflow: 'Budget Request',
      date: 'Yesterday',
      status: 'Approved',
    },
    {
      id: 3,
      title: 'Project Name 3',
      submitter: 'Ali Ahmed',
      workflow: 'Policy Document',
      date: '2 days ago',
      status: 'Revision Required',
    },
  ];
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.submitter.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === 'All' || doc.status === filter;

    return matchesSearch && matchesFilter;
  });
  const getStatusStyle = (status) => {
    if (status === 'Approved') {
      return {
        bg: 'rgba(22,163,74,.12)',
        color: '#16a34a',
      };
    }

    if (status === 'Pending Approval') {
      return {
        bg: 'rgba(245,158,11,.12)',
        color: '#f59e0b',
      };
    }

    if (status === 'Revision Required') {
      return {
        bg: 'rgba(59,130,246,.12)',
        color: '#2563eb',
      };
    }

    return {
      bg: 'rgba(220,38,38,.12)',
      color: '#dc2626',
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '34px',
            letterSpacing: '-0.03em',
          }}
        >
          Approver Dashboard
        </h1>

        <p
          style={{
            color: 'var(--muted)',
            marginTop: '8px',
          }}
        >
          Review, approve, reject, and request revisions for submitted documents.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        className="stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '18px',
          marginBottom: '28px',
        }}
      >
        {stats.map((item) => (
          <div
            key={item.title}
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

            <div
              style={{
                color: 'var(--muted)',
                marginBottom: '6px',
              }}
            >
              {item.title}
            </div>

            <div
              style={{
                fontSize: '30px',
                fontWeight: 800,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: '28px',
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
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>
              All Documents
            </h2>

            <p
              style={{
                marginTop: '6px',
                color: 'var(--muted)',
              }}
            >
              Track all assigned documents and their current status.
            </p>


          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <input
              type="text"
              placeholder="Search document..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                minWidth: '220px',
              }}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid var(--border)',
              }}
            >
              <option>All</option>
              <option>Pending Approval</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Revision Required</option>
            </select>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gap: '16px',
          }}
        >
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              style={{
                padding: '18px',
                borderRadius: '18px',
                background: 'rgba(248,250,252,.8)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '14px',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>
                    {doc.title}
                  </h3>

                  <div
                    style={{
                      marginTop: '12px',
                      display: 'grid',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--muted)',
                      }}
                    >
                      <FiUser size={16} />
                      <span>
                        <strong>Submitted by :</strong> {doc.submitter}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--muted)',
                      }}
                    >
                      <FiFolder size={16} />
                      <span>
                        <strong>Category :</strong> {doc.workflow}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--muted)',
                      }}
                    >
                      <FiCalendar size={16} />
                      <span>
                        <strong>Submitted :</strong> {doc.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '999px',
                    background: getStatusStyle(doc.status).bg,
                    color: getStatusStyle(doc.status).color,
                    fontWeight: 700,
                    height: 'fit-content',
                  }}
                >
                  {doc.status}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  marginTop: '16px',
                }}
              >
                <Link
                  to={`/approver/document/${doc.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    background:
                      'linear-gradient(135deg,var(--primary),var(--accent))',
                    color: '#fff',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {doc.status === 'Pending Approval'
                    ? 'Review Document'
                    : 'View Details'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div>

  );
}

export default ApproverDashboard;