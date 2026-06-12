import { motion } from "framer-motion";
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
  FiDownload,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useState, Fragment } from "react";
import level1Icon from "../images/level1.png";
import level2Icon from "../images/level2.png";
import level3Icon from "../images/level3.png";
import historyIcon from "../images/history.png";
import submittedIcon from "../images/submitter.png";
import pendingIcon from "../images/pending.png";
import rejectedIcon from "../images/rejected.png";
import acceptedIcon from "../images/approved.png";
import commentIcon from "../images/comments.png";
 
function DocumentDetails() {
  const location = useLocation();
  const [currentStage, setCurrentStage] = useState("Initial Level");
  const [timelineStatus, setTimelineStatus] = useState("active");
  const [newComment, setNewComment] = useState("");
 
  const handleReject = () => {
    setTimelineStatus("rejected");
  };
 
  const handleRevision = () => {
    setTimelineStatus("revision");
  };
 
  const handleAccept = () => {
    const currentIndex = stages.findIndex((s) => s.name === currentStage);
 
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1].name);
      setTimelineStatus("active");
    }
  };
 
  const stages = [
    { name: "Initial Level", icon: level1Icon },
    { name: "Compliance Level", icon: level2Icon },
    { name: "Final Level", icon: level3Icon },
  ];
 
  const isApprover = location.pathname.includes("/approver/");
 
  const isSubmitter = location.pathname.includes("/submitter/");
  const isAdmin = location.pathname.includes("/admin/");
 
  const documentData = {
    title: "Project Name",
    description: "Proposal for the new company project.",
    workflowType: "Project Proposal",
    status: "Pending Approval",
    version: "v1",
    submittedBy: "John Doe",
    submittedAt: "Today, 10:30 AM",
  };
 
  const comments = [
    {
      name: "Sarah Khan",
      text: "Please update the budget section before final approval.",
      time: "1 hour ago",
    },
    {
      name: "Admin",
      text: "Document assigned to the department approver.",
      time: "2 hours ago",
    },
    {
      name: "Sarah Khan",
      text: "Please update the budget section before final approval.",
      time: "1 hour ago",
    },
    {
      name: "Sarah Khan",
      text: "Please update the budget section before final approval.",
      time: "1 hour ago",
    },
  ];
 
  const history = [
    {
      step: "Submitted",
      by: "John Doe",
      time: "Today, 10:30 AM",
      icon: submittedIcon,
      color: "#2563eb",
    },
    {
      step: "Pending Approval",
      by: "System",
      time: "Today, 10:35 AM",
      icon: pendingIcon,
      color: "#f59e0b",
    },
    {
      step: "Rejected",
      by: "Sarah Khan",
      time: "Today, 11:00 AM",
      icon: rejectedIcon,
      color: "#dc2626",
    },
    {
      step: "Accepted",
      by: "Admin",
      time: "Today, 11:30 AM",
      icon: acceptedIcon,
      color: "#16a34a",
    },
  ];
 
  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return {
        bg: "rgba(22, 163, 74, 0.12)",
        color: "#16a34a",
        icon: <FiCheckCircle />,
      };
    }
    if (status === "Pending Approval") {
      return {
        bg: "rgba(245, 158, 11, 0.12)",
        color: "#f59e0b",
        icon: <FiClock />,
      };
    }
    if (status === "Revision Required") {
      return {
        bg: "rgba(220, 38, 38, 0.12)",
        color: "#dc2626",
        icon: <FiAlertCircle />,
      };
    }
    return {
      bg: "rgba(37, 99, 235, 0.12)",
      color: "#2563eb",
      icon: <FiInfo />,
    };
  };
 
  const statusStyle = getStatusStyle(documentData.status);
 
  const cardStyle = {
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(12px)",
    border: "1px solid black",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "var(--shadow-soft)",
  };
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: "grid", gap: "22px" }}
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                borderRadius: "999px",
                background: statusStyle.bg,
                color: statusStyle.color,
                fontSize: "12px",
                fontWeight: 800,
                marginBottom: "14px",
              }}
            >
              {statusStyle.icon}
              {documentData.status}
            </div>
 
            <h1
              style={{ margin: 0, fontSize: "34px", letterSpacing: "-0.03em" }}
            >
              {documentData.title}
            </h1>
            <p
              style={{
                margin: "10px 0 0",
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              {documentData.description}
            </p>
            <div
              style={{
                display: "flex",
                gap: "18px",
                flexWrap: "wrap",
                marginTop: "18px",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "14px",
                  background: "rgba(37,99,235,0.08)",
                  border: "1px solid rgba(37,99,235,0.12)",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                <span style={{ color: "#64748b", marginRight: "6px" }}>
                  Submitted By:
                </span>
                {documentData.submittedBy}
              </div>
 
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "14px",
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.12)",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                <span style={{ color: "#64748b", marginRight: "6px" }}>
                  Submitted At:
                </span>
                {documentData.submittedAt}
              </div>
 
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "14px",
                  background: "rgba(22,163,74,0.08)",
                  border: "1px solid rgba(22,163,74,0.12)",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                <span style={{ color: "#64748b", marginRight: "6px" }}>
                  Workflow:
                </span>
                {documentData.workflowType}
              </div>
            </div>
          </div>
 
          <div
            style={{
              minWidth: "180px",
              padding: "16px",
              borderRadius: "18px",
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))",
              border: "1px solid rgba(255,255,255,0.7)",
            }}
          >
            <div style={{ color: "var(--muted)", fontSize: "13px" }}>
              Version
            </div>
            <div style={{ fontSize: "24px", fontWeight: 800 }}>
              {documentData.version}
            </div>
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("/path-to-file", "_blank")}
                title="Download Document"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "none",
                  background:
                    "linear-gradient(135deg, var(--primary), var(--accent))",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 10px 20px rgba(37, 99, 235, 0.25)",
                }}
              >
                <FiDownload />
              </motion.button>
 
              <span
                style={{
                  fontFamily: "'Kaushan Script', cursive",
                  fontSize: "20px",
                  background:
                    "linear-gradient(90deg, #746bf2 0%, #b7a6f7 50%, #dcdcf2 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "flowGradient 3s linear infinite",
                  fontWeight: 700,
                }}
              >
                Download
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      {isApprover && (
        <div
          style={{
            marginTop: "0",
            paddingTop: "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
            width: "100%",
          }}
          className="actions-row"
        >
          <h2 style={{ margin: 0, flexShrink: 0, paddingLeft: "25px" }}>
            Actions
          </h2>
 
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
            className="actions-buttons"
          >
            <button
              onClick={handleReject}
              style={{
                padding: "14px 22px",
                borderRadius: "14px",
                border: "none",
                background: "#dc2626",
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
                minWidth: "140px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Rejected
            </button>
 
            <button
              onClick={handleRevision}
              style={{
                padding: "14px 22px",
                borderRadius: "14px",
                border: "none",
                background: "#f59e0b",
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
                minWidth: "140px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Revision Requested
            </button>
 
            <button
              onClick={handleAccept}
              style={{
                padding: "14px 22px",
                borderRadius: "14px",
                border: "none",
                background:
                  "linear-gradient(135deg, var(--primary), var(--accent))",
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
                minWidth: "140px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          backdropFilter: "blur(12px)",
          borderRadius: "24px",
          padding: "24px",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "18px" }}>
          Approval Timeline
        </h2>
 
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          {stages.map((stage, index) => {
            const currentIndex = stages.findIndex(
              (s) => s.name === currentStage
            );
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;
            const isPending = index > currentIndex;
 
            return (
              <Fragment key={stage}>
                <div
                  style={{
                    flex: 1,
                    minWidth: "180px",
                    padding: "16px",
                    borderRadius: "18px",
                    textAlign: "center",
                    border: isActive
                      ? timelineStatus === "revision"
                        ? "2px solid #f59e0b"
                        : timelineStatus === "rejected"
                        ? "2px solid #dc2626"
                        : "2px solid #2563eb"
                      : isCompleted
                      ? "2px solid #16a34a"
                      : "1px solid var(--border)",
 
                    background: isActive
                      ? timelineStatus === "revision"
                        ? "rgba(245,158,11,0.08)"
                        : timelineStatus === "rejected"
                        ? "rgba(220,38,38,0.08)"
                        : "rgba(37,99,235,0.08)"
                      : isCompleted
                      ? "transparent"
                      : "rgba(248,250,252,0.8)",
 
                    boxShadow:
                      isActive && timelineStatus === "active"
                        ? "0 0 0 4px rgba(37,99,235,0.12)"
                        : "none",
 
                    animation:
                      isActive && timelineStatus === "active"
                        ? "blinkBorder 1s infinite"
                        : "none",
                    transition: "all 0.25s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      fontSize: "14px",
                      fontWeight: 800,
                      color: isActive
                        ? "#2563eb"
                        : isCompleted
                        ? "#16a34a"
                        : "#64748b",
                    }}
                  >
                    <img
                      src={stage.icon}
                      alt={stage.name}
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "contain",
                      }}
                    />
                    <span>{stage.name}</span>
                  </div>
                </div>
 
                {index !== stages.length - 1 && (
                  <div
                    style={{
                      width: "28px",
                      color: "#000",
                      fontSize: "20px",
                      fontWeight: 700,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    →
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </motion.div>
 
      {/* Comments and History */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.8fr",
          gap: "22px",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "18px",
            }}
          >
            <img
              src={commentIcon}
              alt="Comments"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
              }}
            />
            <h2 style={{ margin: 0 }}>Comments</h2>
          </div>
 
          <div
            className="comments-scroll"
            style={{
              display: "grid",
              gap: "14px",
              maxHeight: "320px",
              overflowY: "auto",
              paddingRight: "8px",
              background: "transparent",
            }}
          >
            {comments.map((comment, index) => (
              <div
                key={index}
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  background: "rgba(248,250,252,0.8)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: "6px" }}>
                  {comment.name}
                </div>
                <div style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                  {comment.text}
                </div>
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "13px",
                    color: "var(--muted)",
                  }}
                >
                  {comment.time}
                </div>
              </div>
            ))}
          </div>
          {isApprover && (
            <div
              style={{
                marginTop: "18px",
                paddingTop: "18px",
                borderTop: "1px solid var(--border)",
              }}
            >
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  border: "1px solid var(--border)",
                  resize: "vertical",
                  outline: "none",
                  background: "rgba(255,255,255,0.95)",
                }}
              />
 
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "12px",
                }}
              >
                <button
                  onClick={() => {
                    if (!newComment.trim()) return;
                    console.log("Send comment:", newComment);
                    setNewComment("");
                  }}
                  style={{
                    padding: "12px 18px",
                    border: "none",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, var(--primary), var(--accent))",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Send Comment
                </button>
              </div>
            </div>
          )}
        </motion.div>
 
        {/* Approval History */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            ...cardStyle,
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "18px",
            }}
          >
            <img
              src={historyIcon}
              alt="Approval History"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
              }}
            />
            <h2 style={{ margin: 0 }}>Approval History</h2>
          </div>
 
          <div
            className="approval-timeline-scroll"
            style={{
              maxHeight: "320px",
              overflowY: "auto",
              paddingRight: "8px",
              background: "transparent",
            }}
          >
            <div
              style={{
                position: "relative",
                paddingLeft: "28px",
                display: "grid",
                gap: "18px",
              }}
            >
              {/* vertical line */}
              <div
                style={{
                  position: "absolute",
                  left: "11px",
                  top: "6px",
                  bottom: "6px",
                  width: "2px",
                  background: "linear-gradient(180deg, #2563eb, #7c3aed)",
                  borderRadius: "999px",
                }}
              />
 
              {history.map((step, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-28px",
                      top: "2px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: step.color,
                      border: "3px solid #fff",
                      boxShadow: "0 0 0 3px rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "12px",
                      zIndex: 2,
                    }}
                  />
 
                  <div
                    style={{
                      flex: 1,
                      padding: "14px 16px",
                      borderRadius: "16px",
                      background: "rgba(248,250,252,0.8)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ fontWeight: 800, marginBottom: "4px" }}>
                      {step.step}
                    </div>
                    <div
                      style={{
                        color: "var(--muted)",
                        fontSize: "14px",
                        lineHeight: 1.6,
                      }}
                    >
                      By {step.by}
                    </div>
                    <div
                      style={{
                        color: "var(--muted)",
                        fontSize: "13px",
                        marginTop: "6px",
                      }}
                    >
                      {step.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
 
export default DocumentDetails;
 
 