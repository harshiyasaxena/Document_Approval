import { motion } from "framer-motion";
import {
  FiUpload,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiXCircle,
  FiClock,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FiUser, FiFolder, FiCalendar } from "react-icons/fi";
 
function SubmitterDashboard() {
  const [search, setSearch] = useState("");
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
      name: "Approved",
      value: approved,
      color: "#16a34a",
    },
    {
      name: "Pending",
      value: pending,
      color: "#f59e0b",
    },
    {
      name: "Revision",
      value: revision,
      color: "#2563eb",
    },
    {
      name: "Rejected",
      value: rejected,
      color: "#dc2626",
    },
  ];
 
  const documents = [
    {
      id: 1,
      title: "Project Name 1",
      submittedBy: "John Doe",
      category: "Project Proposal",
      status: "Pending Approval",
      version: "v1",
      date: "Today",
      color: "#f59e0b",
    },
    {
      id: 2,
      title: "Project Name 2",
      submittedBy: "Sarah Khan",
      category: "Budget Request",
      status: "Approved",
      version: "v2",
      date: "Yesterday",
      color: "#16a34a",
    },
    {
      id: 3,
      title: "Project Name 3",
      submittedBy: "Ali Ahmed",
      category: "Policy Document",
      status: "Revision Required",
      version: "v3",
      date: "2 days ago",
      color: "#dc2626",
    },
    {
      id: 4,
      title: "Project Name 4",
      submittedBy: "Emma Watson",
      category: "Leave Application",
      status: "Rejected",
      version: "v1",
      date: "3 days ago",
    },
  ];
 
  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );
 
  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return {
        bg: "rgba(22,163,74,.12)",
        color: "#16a34a",
      };
    }
 
    if (status === "Pending Approval") {
      return {
        bg: "rgba(245,158,11,.12)",
        color: "#f59e0b",
      };
    }
 
    if (status === "Revision Required") {
      return {
        bg: "rgba(37,99,235,.12)",
        color: "#2563eb",
      };
    }
 
    return {
      bg: "rgba(220,38,38,.12)",
      color: "#dc2626",
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
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "26px",
            }}
          >
            Welcome back, Harshiya{" "}
            <span className="wave-emoji" role="img" aria-label="wave">
              👋
            </span>
          </h2>
 
          <p
            style={{
              margin: "4px 0 0",
              color: "var(--muted)",
            }}
          >
            Manage and track your documents.
          </p>
        </div>
      </div>
 
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "28px",
          width: "100%",
        }}
      >
        {/* DONUT CHART */}
 
        <div
          style={{
            background: "transparent",
            borderRadius: "24px",
            padding: "24px",
            border: "transparent",
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Document Status Overview</h2>
 
          <div
            className="chart-legend-wrapper"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "28px",
              flexWrap: "wrap",
              marginTop: "0px",
              width: "100%",
              maxWidth: "900px",
            }}
          >
            <div
              style={{
                width: "280px",
                height: "230px",
                position: "relative",
                flexShrink: 0,
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
                    onMouseLeave={() => setActiveSegment(null)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
 
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  pointerEvents: "none",
                }}
              >
                <div style={{ fontSize: "40px", fontWeight: 800 }}>
                  {activeSegment ? activeSegment.value : totalDocuments}
                </div>
 
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {activeSegment ? activeSegment.name : "Total Documents"}
                </div>
              </div>
            </div>
 
            <div
              className="chart-summary-stats"
              style={{
                display: "grid",
                gap: "8px",
                minWidth: "220px",
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>Total Documents</div>
                <div style={{ color: "var(--muted)" }}>
                  All submitted documents
                </div>
                <div
                  style={{
                    fontSize: "42px",
                    fontWeight: 800,
                    color: "#7c3aed",
                    marginTop: "8px",
                  }}
                >
                  {totalDocuments}
                </div>
              </div>
 
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, color: "#334155" }}>
                  Approved
                </span>
                <span style={{ fontWeight: 700, color: "#16a34a" }}>
                  {approvedPercent}%
                </span>
              </div>
 
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, color: "#334155" }}>
                  Pending
                </span>
                <span style={{ fontWeight: 700, color: "#f59e0b" }}>
                  {pendingPercent}%
                </span>
              </div>
 
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, color: "#334155" }}>
                  Revision Required
                </span>
                <span style={{ fontWeight: 700, color: "#2563eb" }}>
                  {revisionPercent}%
                </span>
              </div>
 
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, color: "#334155" }}>
                  Rejected
                </span>
                <span style={{ fontWeight: 700, color: "#dc2626" }}>
                  {rejectedPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      <div
        style={{
          width: "100%",
          gridTemplateColumns: "1.4fr 0.8fr",
          gap: "22px",
        }}
        className="dashboard-grid"
      >
        <div
          style={{
            background: "transparent",
            backdropFilter: "blur(12px)",
            border: "1px solid black",
            borderRadius: "24px",
            padding: "22px",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>My Documents</h2>
 
              <p
                style={{
                  margin: "6px 0 0",
                  color: "var(--muted)",
                }}
              >
                Track document status and continue workflows.
              </p>
            </div>
 
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                placeholder="Search document..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  minWidth: "280px",
                }}
              />
 
              <Link
                to="/upload"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 14px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, var(--primary), var(--accent))",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                Upload New <FiUpload />
              </Link>
            </div>
          </div>
 
          <div style={{ display: "grid", gap: "16px" }}>
            {filteredDocuments.map((doc, index) => {
              const badgeStyle = getStatusStyle(doc.status);
 
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.06 }}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "18px",
                    padding: "18px",
                    background: "rgba(248, 250, 252, 0.75)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "14px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: 0 }}>{doc.title}</h3>
 
                      <div
                        style={{
                          marginTop: "12px",
                          display: "grid",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "var(--muted)",
                          }}
                        >
                          <FiUser size={16} />
                          <span>
                            <strong>Submitted by :</strong> {doc.submittedBy}
                          </span>
                        </div>
 
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "var(--muted)",
                          }}
                        >
                          <FiFolder size={16} />
                          <span>
                            <strong>Category :</strong> {doc.category}
                          </span>
                        </div>
 
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "var(--muted)",
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
                        padding: "8px 12px",
                        borderRadius: "999px",
                        background: badgeStyle.bg,
                        color: badgeStyle.color,
                        fontSize: "12px",
                        fontWeight: 800,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {doc.status}
                    </div>
                  </div>
 
                  <div
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      gap: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Link
                      to={`/submitter/document/${doc.id}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "var(--primary)",
                        fontWeight: 700,
                      }}
                    >
                      View Details <FiArrowRight />
                    </Link>
 
                    {doc.status === "Revision Required" && (
                      <Link
                        to={`/upload?resubmitId=${doc.id}&version=${doc.version}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#dc2626",
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
                  textAlign: "center",
                  padding: "30px",
                  color: "var(--muted)",
                }}
              >
                No documents found.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
 
export default SubmitterDashboard;
 
 