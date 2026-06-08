import { motion } from 'framer-motion';
import {
  FiUpload,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiXCircle,
  FiClock,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function SubmitterDashboard() {
  const [search, setSearch] = useState('');
  const [activeSegment, setActiveSegment] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
  });
  const totalDocuments = 20;
  const approved = 9;
  const pending = 6;
  const revision = 3;
  const rejected = 2;

  const approvedPercent = ((approved / totalDocuments) * 100).toFixed(1);
  const pendingPercent = ((pending / totalDocuments) * 100).toFixed(1);
  const revisionPercent = ((revision / totalDocuments) * 100).toFixed(1);
  const rejectedPercent = ((rejected / totalDocuments) * 100).toFixed(1);
  const chartData = [
    {
      name: 'Approved',
      value: approved,
      color: '#16a34a',
    },
    {
      name: 'Pending',
      value: pending,
      color: '#f59e0b',
    },
    {
      name: 'Revision',
      value: revision,
      color: '#2563eb',
    },
    {
      name: 'Rejected',
      value: rejected,
      color: '#dc2626',
    },
  ];


  const documents = [
    {
      id: 1,
      title: 'Project Proposal',
      status: 'Pending Approval',
      version: 'v1',
      date: 'Today',
      color: '#f59e0b',
    },
    {
      id: 2,
      title: 'Budget Request',
      status: 'Approved',
      version: 'v2',
      date: 'Yesterday',
      color: '#16a34a',
    },
    {
      id: 3,
      title: 'Policy Document',
      status: 'Revision Required',
      version: 'v3',
      date: '2 days ago',
      color: '#dc2626',
    },
    {
      id: 4,
      title: 'Leave Application',
      status: 'Rejected',
      version: 'v1',
      date: '3 days ago',
    }
  ];
  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );



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
        bg: 'rgba(37,99,235,.12)',
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
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: '26px',
            }}
          >
            Welcome back, Harshiya 👋
          </h2>

          <p
            style={{
              margin: '4px 0 0',
              color: 'var(--muted)',
            }}
          >
            Manage and track your documents.
          </p>
        </div>
      </div>

      <div  className="overview-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '22px',
          marginBottom: '28px',
        }}
        className="dashboard-grid"
      >
        {/* DONUT CHART */}

        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Document Status Overview
          </h2>

          <div   className="chart-legend-wrapper"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >

            <div
              style={{
                width: '280px',
                height: '280px',
                position: 'relative',
              }}
            >

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={3}
                    cursor="pointer"
                    onMouseEnter={(data, index, e) => {
                      setActiveSegment(chartData[index]);

                      setTooltipPos({
                        x: e?.chartX || 0,
                        y: e?.chartY || 0,
                      });
                    }}
                    onMouseLeave={() =>
                      setActiveSegment(null)
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>


                </PieChart>
              </ResponsiveContainer>

              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    fontSize: '40px',
                    fontWeight: 800,
                  }}
                >
                  {activeSegment
                    ? activeSegment.value
                    : totalDocuments}
                </div>

                <div
                  style={{
                    color: '#64748b',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  {activeSegment
                    ? activeSegment.name
                    : 'Total Documents'}
                </div>
              </div>
            </div>
            <div  className="chart-legend"
              style={{
                marginTop: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: '16px',
                padding: '0 20px',
              }}
            >
              {chartData.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: item.color,
                      flexShrink: 0,
                    }}
                  />

                  <span
                    style={{
                      fontWeight: 600,
                      color: '#334155',
                      flex: 1,
                    }}
                  >
                    {item.name}
                  </span>

                  <span
                    style={{
                      fontWeight: 700,
                      color: item.color,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* RIGHT SUMMARY */}

        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          {[
            {
              title: 'Approved',
              icon: <FiCheckCircle />,
              value: approved,
              percent: approvedPercent,
              color: '#16a34a',
            },
            {
              title: 'Pending',
              icon: <FiClock />,
              value: pending,
              percent: pendingPercent,
              color: '#f59e0b',
            },
            {
              title: 'Revision Required',
              icon: <FiRefreshCw />,
              value: revision,
              percent: revisionPercent,
              color: '#2563eb',
            },
            {
              title: 'Rejected',
              icon: <FiXCircle />,
              value: rejected,
              percent: rejectedPercent,
              color: '#dc2626',
            },
          ].map((item) => (
            <motion.div
              whileHover={{
                x: 6,
                scale: 1.02,
              }}
              key={item.title}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '18px 0',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: item.color,
                  }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>

                <div
                  style={{
                    color: 'var(--muted)',
                    fontSize: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '120px',
                      height: '6px',
                      background: '#e2e8f0',
                      borderRadius: '999px',
                      marginTop: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: `${item.percent}%`,
                        height: '100%',
                        background: item.color,
                        borderRadius: '999px',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: '25px',
                  fontWeight: 800,
                  color: item.color,
                }}
              >
                {item.percent}%
              </div>
            </motion.div>
          ))}

          <div
            style={{
              marginTop: '20px',
              padding: '18px',
              borderRadius: '18px',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>
                Total Documents
              </div>

              <div
                style={{
                  color: 'var(--muted)',
                }}
              >
                All submitted documents
              </div>
            </div>

            <div
              style={{
                fontSize: '42px',
                fontWeight: 800,
                color: '#7c3aed',
              }}
            >
              {totalDocuments}
            </div>
          </div>
        </div>
      </div >



      <div
        style={{
          width: '100%',
          gridTemplateColumns: '1.4fr 0.8fr',
          gap: '22px',
        }}
        className="dashboard-grid"
      >
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
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>My Documents</h2>

              <p
                style={{
                  margin: '6px 0 0',
                  color: 'var(--muted)',
                }}
              >
                Track document status and continue workflows.
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
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  minWidth: '280px',
                }}
              />

              <Link
                to="/upload"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  background:
                    'linear-gradient(135deg, var(--primary), var(--accent))',
                  color: 'white',
                  fontWeight: 700,
                }}
              >
                Upload New <FiUpload />
              </Link>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {filteredDocuments.map((doc, index) => {
              const badgeStyle = getStatusStyle(doc.status);

              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.06 }}
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
                        Version: {doc.version}
                      </p>
                      <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>
                        Updated: {doc.date}
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

                  <div style={{ marginTop: '14px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Link
                      to={`/submitter/document/${doc.id}`}
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

                    {doc.status === 'Revision Required' && (
                      <Link
                        to="/upload"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#dc2626',
                          fontWeight: 700,
                        }}
                      >
                        Resubmit <FiRefreshCw />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
            {filteredDocuments.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '30px',
                  color: 'var(--muted)',
                }}
              >
                No documents found.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div >
  );
}

export default SubmitterDashboard;