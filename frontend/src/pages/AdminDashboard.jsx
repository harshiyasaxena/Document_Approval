import { useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiUserCheck, FiFileText } from "react-icons/fi";
import pendingIcon from "../images/pending.png";
import approvedIcon from "../images/approve.png";
import rejectedIcon from "../images/rejected.png";
import revisionIcon from "../images/revision.png";
import { FiUser, FiFolder, FiCalendar } from "react-icons/fi";
 
function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showSummary, setShowSummary] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);
  const stats = [
    {
      title: "Total Submitters",
      value: "24",
      icon: <FiUsers />,
      color: "#2563eb",
      bg: "rgba(37, 99, 235, 0.12)",
    },
    {
      title: "Total Approvers",
      value: "8",
      icon: <FiUserCheck />,
      color: "#7c3aed",
      bg: "rgba(124, 58, 237, 0.12)",
    },
    {
      title: "All Documents",
      value: "128",
      icon: <FiFileText />,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.12)",
    },
  ];
 
  const documents = [
  {
    title: "Project Name 1",
    status: "Pending Approval",
    owner: "John Doe",
    category: "Project Proposal",
    date: "Today",
  },
  {
    title: "Project Name 2",
    status: "Approved",
    owner: "Sarah Khan",
    category: "Budget Request",
    date: "Yesterday",
  },
  {
    title: "Project Name 3",
    status: "Revision Required",
    owner: "Ali Ahmed",
    category: "Policy Document",
    date: "2 days ago",
  },
  {
    title: "Project Name 4",
    status: "Rejected",
    owner: "Michael Scott",
    category: "Vendor Contract",
    date: "3 days ago",
  },
];
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.owner.toLowerCase().includes(search.toLowerCase());
 
    const matchesFilter = filter === "All" || doc.status === filter;
 
    return matchesSearch && matchesFilter;
  });
 
  const summaryStats = [
    {
      label: "Pending Approval",
      value: documents.filter((d) => d.status === "Pending Approval").length,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.12)",
      icon: pendingIcon,
    },
    {
      label: "Approved",
      value: documents.filter((d) => d.status === "Approved").length,
      color: "#16a34a",
      bg: "rgba(22, 163, 74, 0.12)",
      icon: approvedIcon,
    },
    {
      label: "Rejected",
      value: documents.filter((d) => d.status === "Rejected").length,
      color: "#dc2626",
      bg: "rgba(220, 38, 38, 0.12)",
      icon: rejectedIcon,
    },
    {
      label: "Revision Required",
      value: documents.filter((d) => d.status === "Revision Required").length,
      color: "#7c3aed",
      bg: "rgba(124, 58, 237, 0.12)",
      icon: revisionIcon,
    },
  ];
 
  const getStatusStyle = (status) => {
    if (status === "Approved" || status === "Active") {
      return { bg: "rgba(22, 163, 74, 0.12)", color: "#16a34a" };
    }
    if (status === "Pending Approval" || status === "Pending") {
      return { bg: "rgba(245, 158, 11, 0.12)", color: "#f59e0b" };
    }
    return { bg: "rgba(220, 38, 38, 0.12)", color: "#dc2626" };
  };
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "34px", letterSpacing: "-0.03em" }}>
          Welcome back, Admin!{" "}
          <span className="wave-emoji" role="img" aria-label="wave">
            👋
          </span>
        </h1>
        <p
          style={{ color: "var(--muted)", marginTop: "8px", fontSize: "16px" }}
        >
          Manage users, approvers, document workflows, and system activity.
        </p>
      </div>
 
      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
          marginBottom: "28px",
        }}
      >
        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            style={{
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--border)",
              borderTop: `4px solid ${item.color}`,
              borderRadius: "22px",
              padding: "20px",
              boxShadow: "var(--shadow-soft)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              cursor: "pointer",
            }}
          >
            <div style={{ position: "relative", minHeight: "120px" }}>
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "70px",
                  color: item.color,
                  opacity: 0.12,
                  pointerEvents: "none",
                  lineHeight: 1,
                }}
              >
                {item.icon}
              </div>
 
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    color: "#111827",
                    fontSize: "14px",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </div>
 
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 900,
                    color: "#111827",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
 
      <div
        style={{
          marginTop: "10px",
          textAlign: "right",
        }}
      >
        <button
          onClick={() => setShowSummary(true)}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          View Detailed Summary
        </button>
      </div>
 
      {/* Main Content */}
      <div
        style={{
          display: "grid",
          gap: "22px",
        }}
      >
        {/* User / Documents Panel */}
        <div style={{ display: "grid", gap: "22px" }}>
          {/* Documents */}
          <div
            style={{
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              padding: "22px",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Monitor All Documents</h2>
            <p style={{ marginTop: "-6px", color: "var(--muted)" }}>
              Track document status across all users.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "14px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              {showSummary && (
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                    padding: "20px",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    style={{
                      width: "100%",
                      maxWidth: "650px",
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(14px)",
                      borderRadius: "24px",
                      padding: "22px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                      position: "relative",
                    }}
                  >
                    <button
                      onClick={() => setShowSummary(false)}
                      style={{
                        position: "absolute",
                        top: "14px",
                        right: "14px",
                        border: "none",
                        background: "#f1f5f9",
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        fontWeight: 800,
                      }}
                    >
                      ×
                    </button>
 
                    <h2 style={{ marginTop: 0 }}>Detailed Summary</h2>
                    <p style={{ color: "var(--muted)", marginTop: "-6px" }}>
                      Overview of document status distribution.
                    </p>
 
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "260px",
                          height: "260px",
                          margin: "0 auto",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* Donut chart */}
                        <svg
                          width="260"
                          height="260"
                          viewBox="0 0 260 260"
                          style={{ display: "block" }}
                        >
                          <circle
                            cx="130"
                            cy="130"
                            r="92"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="38"
                            strokeDasharray="144.5 434"
                            strokeDashoffset="0"
                            style={{
                              cursor: "pointer",
                              opacity:
                                hoveredSection === "pending" || !hoveredSection
                                  ? 1
                                  : 0.35,
                            }}
                            onMouseEnter={() => setHoveredSection("pending")}
                            onMouseLeave={() => setHoveredSection(null)}
                          />
 
                          <circle
                            cx="130"
                            cy="130"
                            r="92"
                            fill="none"
                            stroke="#16a34a"
                            strokeWidth="38"
                            strokeDasharray="144.5 434"
                            strokeDashoffset="-144.5"
                            style={{
                              cursor: "pointer",
                              opacity:
                                hoveredSection === "approved" || !hoveredSection
                                  ? 1
                                  : 0.35,
                            }}
                            onMouseEnter={() => setHoveredSection("approved")}
                            onMouseLeave={() => setHoveredSection(null)}
                          />
 
                          <circle
                            cx="130"
                            cy="130"
                            r="92"
                            fill="none"
                            stroke="#dc2626"
                            strokeWidth="38"
                            strokeDasharray="144.5 434"
                            strokeDashoffset="-289"
                            style={{
                              cursor: "pointer",
                              opacity:
                                hoveredSection === "rejected" || !hoveredSection
                                  ? 1
                                  : 0.35,
                            }}
                            onMouseEnter={() => setHoveredSection("rejected")}
                            onMouseLeave={() => setHoveredSection(null)}
                          />
 
                          <circle
                            cx="130"
                            cy="130"
                            r="92"
                            fill="none"
                            stroke="#7c3aed"
                            strokeWidth="38"
                            strokeDasharray="144.5 434"
                            strokeDashoffset="-433.5"
                            style={{
                              cursor: "pointer",
                              opacity:
                                hoveredSection === "revision" || !hoveredSection
                                  ? 1
                                  : 0.35,
                            }}
                            onMouseEnter={() => setHoveredSection("revision")}
                            onMouseLeave={() => setHoveredSection(null)}
                          />
 
                          {/* center hole */}
                          <circle
                            cx="130"
                            cy="130"
                            r="72"
                            fill="rgba(255,255,255,0.95)"
                          />
                        </svg>
 
                        {/* Inner circle */}
                        <div
                          style={{
                            position: "absolute",
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(8px)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              color: "var(--muted)",
                              fontWeight: 600,
                            }}
                          >
                            Total Docs
                          </div>
                          <div
                            style={{
                              fontSize: "28px",
                              fontWeight: 900,
                              color: "#111827",
                            }}
                          >
                            4
                          </div>
                        </div>
                      </div>
 
                      {/* Stats in % format */}
                      <div style={{ display: "grid", gap: "12px" }}>
                        <div
                          onMouseEnter={() => setHoveredSection("pending")}
                          onMouseLeave={() => setHoveredSection(null)}
                          style={{
                            transform:
                              hoveredSection === "pending"
                                ? "scale(1.05)"
                                : "scale(1)",
                            transition: "transform 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 14px",
                            borderRadius: "14px",
                            background: "rgba(245, 158, 11, 0.10)",
                            border: "1px solid rgba(245, 158, 11, 0.18)",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          <span>Pending Approvals</span>
                          <span style={{ color: "#f59e0b" }}>25%</span>
                        </div>
 
                        <div
                          onMouseEnter={() => setHoveredSection("approved")}
                          onMouseLeave={() => setHoveredSection(null)}
                          style={{
                            transform:
                              hoveredSection === "approved"
                                ? "scale(1.05)"
                                : "scale(1)",
                            transition: "transform 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 14px",
                            borderRadius: "14px",
                            background: "rgba(22, 163, 74, 0.10)",
                            border: "1px solid rgba(22, 163, 74, 0.18)",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          <span>Approved</span>
                          <span style={{ color: "#16a34a" }}>25%</span>
                        </div>
 
                        <div
                          onMouseEnter={() => setHoveredSection("rejected")}
                          onMouseLeave={() => setHoveredSection(null)}
                          style={{
                            transform:
                              hoveredSection === "rejected"
                                ? "scale(1.05)"
                                : "scale(1)",
                            transition: "transform 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 14px",
                            borderRadius: "14px",
                            background: "rgba(220, 38, 38, 0.10)",
                            border: "1px solid rgba(220, 38, 38, 0.18)",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          <span>Rejected</span>
                          <span style={{ color: "#dc2626" }}>25%</span>
                        </div>
 
                        <div
                          onMouseEnter={() => setHoveredSection("revision")}
                          onMouseLeave={() => setHoveredSection(null)}
                          style={{
                            transform:
                              hoveredSection === "revision"
                                ? "scale(1.05)"
                                : "scale(1)",
                            transition: "transform 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 14px",
                            borderRadius: "14px",
                            background: "rgba(25, 8, 56, 0.1)",
                            border: "1px solid rgba(124, 58, 237, 0.18)",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          <span>Revision Required</span>
                          <span style={{ color: "#7c3aed" }}>25%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
              {summaryStats.map((item) => (
                <motion.div
                 onClick={() => setFilter(item.label)}
                  key={item.label}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: "rgba(255,255,255,0.75)",
                    border: "1px solid var(--border)",
                    borderRadius: "18px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: "var(--shadow-soft)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: item.bg,
                      color: item.color,
                      fontWeight: 800,
                      fontSize: "18px",
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
 
                  <div>
                    <div style={{ color: "var(--muted)", fontSize: "13px" }}>
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 800,
                        color: item.color,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                placeholder="Search document or owner..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: "240px",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  background: "white",
                }}
              />
 
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  minWidth: "220px",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  background: "white",
                }}
              >
                <option value="All">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Revision Required">Revision Required</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
 
            <div style={{ display: "grid", gap: "14px", marginTop: "18px" }}>
              {filteredDocuments.map((doc, index) => {
                const badge = getStatusStyle(doc.status);
 
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    style={{
                      padding: "16px",
                      borderRadius: "18px",
                      background: "rgba(248, 250, 252, 0.75)",
                      border: "1px solid var(--border)",
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
        <strong>Submitted by :</strong> {doc.owner}
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
                          background: badge.bg,
                          color: badge.color,
                          fontSize: "12px",
                          fontWeight: 800,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {doc.status}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
 
export default AdminDashboard;