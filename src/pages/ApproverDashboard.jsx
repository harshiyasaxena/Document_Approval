import { motion } from "framer-motion";
import {
  FiClock,
  FiCheckCircle,
  FiRefreshCw,
  FiFileText,
  FiXCircle,
  FiUser,
  FiFolder,
  FiCalendar,
} from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";
import totalIcon from "../images/total.png";
import pendingIcon from "../images/pending.png";
import approvedIcon from "../images/approve.png";
import rejectedIcon from "../images/rejected.png";
import revisionIcon from "../images/revision.png";

function ApproverDashboard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const stats = [
    {
      title: "Total Assigned",
      value: "28",
      icon: totalIcon,
      color: "#2563eb",
      bg: "rgba(37,99,235,0.08)",
      borderColor: "#2563eb",
    },
    {
      title: "Pending Approvals",
      value: "12",
      icon: pendingIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.08)",
      borderColor: "#f59e0b",
    },
    {
      title: "Approved",
      value: "9",
      icon: approvedIcon,
      color: "#16a34a",
      bg: "rgba(22,163,74,0.08)",
      borderColor: "#16a34a",
    },
    {
      title: "Revision Requests",
      value: "4",
      icon: revisionIcon,
      color: "#dc2626",
      bg: "rgba(220,38,38,0.08)",
      borderColor: "#dc2626",
    },
    {
      title: "Rejected",
      value: "3",
      icon: rejectedIcon,
      color: "#7f1d1d",
      bg: "rgba(127,29,29,0.08)",
      borderColor: "#7f1d1d",
    },
  ];
  const documents = [
    {
      id: 1,
      title: "Project Name 1",
      submitter: "John Doe",
      workflow: "Project Proposal",
      date: "Today",
      status: "Pending Approvals",
    },
    {
      id: 2,
      title: "Project Name 2",
      submitter: "Sarah Khan",
      workflow: "Budget Request",
      date: "Yesterday",
      status: "Approved",
    },
    {
      id: 3,
      title: "Project Name 3",
      submitter: "Ali Ahmed",
      workflow: "Policy Document",
      date: "2 days ago",
      status: "Revision Required",
    },
    {
      id: 4,
      title: "Project Name 4",
      submitter: "Ali Ahmed",
      workflow: "Policy Document",
      date: "2 days ago",
      status: "Revision Required",
    },
  ];
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.submitter.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || doc.status === filter;

    return matchesSearch && matchesFilter;
  });
  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return {
        bg: "rgba(22,163,74,.12)",
        color: "#16a34a",
      };
    }

    if (status === "Pending Approvals") {
      return {
        bg: "rgba(245,158,11,.12)",
        color: "#f59e0b",
      };
    }

    if (status === "Revision Required") {
      return {
        bg: "rgba(59,130,246,.12)",
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
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "34px",
            letterSpacing: "-0.03em",
          }}
        >
          Welcome back, John{" "}
          <span className="wave-emoji" role="img" aria-label="wave">
            👋
          </span>
        </h1>

        <p
          style={{
            color: "black",
            marginTop: "8px",
          }}
        >
          Review, approve, reject, and request revisions for submitted
          documents.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "18px",
          marginBottom: "28px",
        }}
      >
        {stats.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              if (item.title === "Total Assigned") setFilter("All");
              else if (item.title === "Revision Requests")
                setFilter("Revision Required");
              else setFilter(item.title);
            }}
            style={{
              background: item.bg,
              // background: `linear-gradient(180deg, ${item.bg}, rgba(255,255,255,0.92))`,
              backdropFilter: "blur(12px)",
              border: `2px solid ${item.borderColor}`,
              borderRadius: "22px",
              padding: "20px",
              boxShadow: `0 10px 25px ${item.borderColor}22`,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                margin: "0 auto 14px",
              }}
            >
              <img
                src={item.icon}
                alt={item.title}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                }}
              />
            </div>

            <div
              style={{
                color: "var(--muted)",
                marginBottom: "6px",
              }}
            >
              {item.title}
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: 800,
              }}
            >
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
      <div
        style={{
          marginTop: "28px",
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
            <h2 style={{ margin: 0 }}>All Documents</h2>

            <p
              style={{
                marginTop: "6px",
                color: "var(--muted)",
              }}
            >
              Track all assigned documents and their current status.
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
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                minWidth: "220px",
              }}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid var(--border)",
              }}
            >
              <option>All</option>
              <option>Pending Approvals</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Revision Required</option>
            </select>
          </div>
        </div>

        <div className="documents-scroll"
          style={{
            display: "grid",
            gap: "16px",
            maxHeight: "600px",
    overflowY: "auto",
    paddingRight: "8px",
    scrollbarWidth: "thin",
          }}
        >
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              style={{
                padding: "18px",
                borderRadius: "18px",
                background: "rgba(248,250,252,.8)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
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
                        <strong>Submitted by :</strong> {doc.submitter}
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
                        <strong>Category :</strong> {doc.workflow}
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
                    background: getStatusStyle(doc.status).bg,
                    color: getStatusStyle(doc.status).color,
                    fontWeight: 700,
                    height: "fit-content",
                  }}
                >
                  {doc.status}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "16px",
                }}
              >
                <Link
                  to={`/approver/document/${doc.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 16px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg,var(--primary),var(--accent))",
                    color: "#fff",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  {doc.status === "Pending Approvals"
                    ? "Review Document"
                    : "View Details"}
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
