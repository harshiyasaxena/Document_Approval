import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiArrowRight, FiEdit } from "react-icons/fi";
import availableIcon from "../images/available.png";

function AssignApprovers() {
  const [search, setSearch] = useState("");
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [draggedApprover, setDraggedApprover] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [workflowStep, setWorkflowStep] = useState(0);
  const [editData, setEditData] = useState({
    initial: "",
    compliance: "",
    final: "",
  });

  const approvers = [
    "Sarah Khan",
    "Ali Ahmed",
    "Michael Scott",
    "David Miller",
    "Emma Watson",
  ];

  const filteredApprovers = approvers.filter((approver) =>
    approver.toLowerCase().includes(search.toLowerCase())
  );

  const [workflows, setWorkflows] = useState([
    {
      name: "Project Proposal",
      initial: "Sarah Khan",
      compliance: "Ali Ahmed",
      final: "Michael Scott",
    },
    {
      name: "Budget Request",
      initial: "David Miller",
      compliance: "Sarah Khan",
      final: "Michael Scott",
    },
    {
      name: "Policy Document",
      initial: "Ali Ahmed",
      compliance: "Sarah Khan",
      final: "Michael Scott",
    },
  ]);

  const getAssignedCount = (name) => {
    return workflows.filter(
      (workflow) =>
        workflow.initial === name ||
        workflow.compliance === name ||
        workflow.final === name
    ).length;
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(12px)",
    border: "1px solid var(--border)",
    borderRadius: "24px",
    padding: "22px",
    boxShadow: "var(--shadow-soft)",
  };

useEffect(() => {
  const interval = setInterval(() => {
    setWorkflowStep((prev) => (prev + 1) % 5);
  }, 800);

  return () => clearInterval(interval);
}, []);
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "34px",
            letterSpacing: "-0.03em",
          }}
        >
          Assign Workflow Approvers
        </h1>

        <p
          style={{
            color: "var(--muted)",
            marginTop: "8px",
          }}
        >
          Configure approval chains for all document workflows.
        </p>
      </div>

      
      <div
        className="dashboard-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "310px 1fr",
          gap: "50px",
          alignItems: "start",
        }}
      >
        {/* Approver Panel */}
        <div className="approver-panel" style={{ cardStyle, border: "1.5px solid rgba(0,0,0,0.85)" , padding: "20px", borderRadius:"32px"}}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "18px",
            }}
          >
            <img
              src={availableIcon}
              alt="Available"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
              }}
            />
            <h2 style={{ margin: 0 }}>Available Approvers</h2>
          </div>

          <div
            style={{
              position: "relative",
              marginBottom: "18px",
            }}
          >
            <FiSearch
              style={{
                position: "absolute",
                left: "12px",
                top: "13px",
                color: "var(--muted)",
              }}
            />

            <input
              type="text"
              placeholder="Search approver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 38px",
                borderRadius: "12px",
                border: "1px solid var(--border)",
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gap: "10px",
            }}
          >
            {filteredApprovers.map((approver) => (
              <motion.div
                key={approver}
                draggable
                onDragStart={() => setDraggedApprover(approver)}
                onDragEnd={() => setDraggedApprover(null)}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "999px",
                  background: "rgba(248,250,252,0.9)",
                  border: "1px solid var(--border)",
                  fontWeight: 600,
                  boxShadow: "var(--shadow-soft)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "rgba(37,99,235,.12)",
                    color: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "13px",
                    flexShrink: 0,
                  }}
                >
                  {approver
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <span>{approver}</span>
                <span
                  style={{
                    color: "var(--muted)",
                    fontSize: "12px",
                    marginLeft: "auto",
                  }}
                >
                  Assigned: {getAssignedCount(approver)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Workflow Cards */}
        <div
          style={{
            display: "grid",
            gap: "22px",
          }}
        >
            <motion.div
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "18px",
    marginBottom: "24px",
    padding: "14px 18px",
    borderRadius: "18px",
  }}
>
  <div style={{ fontWeight: 800, color: "#111827" }}>Workflow</div>

  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
    style={{
      padding: "8px 12px",
      borderRadius: "999px",
      background: "rgba(37,99,235,.10)",
      color: "#2563eb",
      fontWeight: 700,
      border:
    workflowStep === 0
      ? "2px solid #2563eb"
      : "2px solid transparent",
  boxShadow:
    workflowStep === 0 ? "0 0 0 4px rgba(37,99,235,.10)" : "none",
    }}
  >
    Initial Level
  </motion.div>

  <motion.div
  animate={workflowStep === 1 ? { x: [0, 6, 0] } : { x: 0 }}
  transition={{ duration: 0.6 }}
>
  <FiArrowRight style={{ color: workflowStep === 1 ? "#2563eb" : "#94a3b8" }} />
</motion.div>

  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    style={{
      padding: "8px 12px",
      borderRadius: "999px",
      background: "rgba(245,158,11,.10)",
      color: "#f59e0b",
      fontWeight: 700,
       border:
    workflowStep === 2
      ? "2px solid #f59e0b"
      : "2px solid transparent",
  boxShadow:
    workflowStep === 2 ? "0 0 0 4px rgba(245,158,11,.10)" : "none",
    }}
  >
    Compliance Level
  </motion.div>

  <motion.div
  animate={workflowStep === 3 ? { x: [0, 6, 0] } : { x: 0 }}
  transition={{ duration: 0.6 }}
>
  <FiArrowRight style={{ color: workflowStep === 3 ? "#f59e0b" : "#94a3b8" }} />
</motion.div>

  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.3 }}
    style={{
      padding: "8px 12px",
      borderRadius: "999px",
      background: "rgba(22,163,74,.10)",
      color: "#16a34a",
      fontWeight: 700,
       border:
    workflowStep === 4
      ? "2px solid #16a34a"
      : "2px solid transparent",
  boxShadow:
    workflowStep === 4 ? "0 0 0 4px rgba(22,163,74,.10)" : "none",
    }}
  >
    Final Level
  </motion.div>
</motion.div>

          {workflows.map((workflow, index) => (
            <motion.div
              key={workflow.name}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              style={{
                ...cardStyle,
                cursor: "pointer",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "8px",
                }}
              >
                {workflow.name}
              </h2>

              <p
                style={{
                  marginTop: 0,
                  marginBottom: "24px",
                  color: "var(--muted)",
                }}
              >
                Configure approvers for each approval stage.
              </p>

              <div
                className="timeline-wrapper"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (!draggedApprover) return;

                    setWorkflows((prev) =>
                      prev.map((wf, i) =>
                        i === index ? { ...wf, initial: draggedApprover } : wf
                      )
                    );

                    if (editingWorkflow === index) {
                      setEditData((prev) => ({
                        ...prev,
                        initial: draggedApprover,
                      }));
                    }

                    setDropTarget("initial");
                  }}
                  style={{
                    flex: 1,
                    padding: "18px",
                    borderRadius: "18px",
                    textAlign: "center",
                    background: "rgba(37,99,235,.08)",
                    border: "2px solid #2563eb"
                   
                  }}
                >
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "999px",
                      margin: "0 auto 12px",
                      background: "rgba(37,99,235,.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      color: "#2563eb",
                    }}
                  >
                    {workflow.initial
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>

                  <div style={{ fontWeight: 700 }}>
                    {editingWorkflow === index
                      ? editData.initial
                      : workflow.initial}
                  </div>

                  <div
                    style={{
                      color: "#2563eb",
                      marginTop: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Initial Approval
                  </div>
                </div>

                <motion.div
                  transition={{ duration: 0.6 }}
                >
                  <FiArrowRight
                    className="timeline-arrow"
                    style={{
                      fontSize: "24px",
                    }}
                  />
                </motion.div>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (!draggedApprover) return;

                    setWorkflows((prev) =>
                      prev.map((wf, i) =>
                        i === index
                          ? { ...wf, compliance: draggedApprover }
                          : wf
                      )
                    );

                    if (editingWorkflow === index) {
                      setEditData((prev) => ({
                        ...prev,
                        compliance: draggedApprover,
                      }));
                    }

                    setDropTarget("compliance");
                  }}
                  style={{
                    flex: 1,
                    padding: "18px",
                    borderRadius: "18px",
                    textAlign: "center",
                    background: "rgba(245,158,11,.08)",
                    border:"2px solid #f59e0b",
                    boxShadow:"none",
                  }}
                >
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "999px",
                      margin: "0 auto 12px",
                      background: "rgba(245,158,11,.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      color: "#f59e0b",
                    }}
                  >
                    {workflow.compliance
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>

                  <div style={{ fontWeight: 700 }}>
                    {editingWorkflow === index
                      ? editData.compliance
                      : workflow.compliance}
                  </div>

                  <div
                    style={{
                      color: "#f59e0b",
                      marginTop: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Compliance Approval
                  </div>
                </div>

                <motion.div
                  transition={{ duration: 0.6 }}
                >
                  <FiArrowRight
                    className="timeline-arrow"
                    style={{
                      fontSize: "24px",
                    }}
                  />
                </motion.div>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (!draggedApprover) return;

                    setWorkflows((prev) =>
                      prev.map((wf, i) =>
                        i === index ? { ...wf, final: draggedApprover } : wf
                      )
                    );

                    if (editingWorkflow === index) {
                      setEditData((prev) => ({
                        ...prev,
                        final: draggedApprover,
                      }));
                    }

                    setDropTarget("final");
                  }}
                  style={{
                    flex: 1,
                    padding: "18px",
                    borderRadius: "18px",
                    textAlign: "center",
                    background: "rgba(22,163,74,.08)",
                    border:"2px solid #16a34a",
                  }}
                >
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "999px",
                      margin: "0 auto 12px",
                      background: "rgba(22,163,74,.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      color: "#16a34a",
                    }}
                  >
                    {workflow.final
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>

                  <div style={{ fontWeight: 700 }}>
                    {editingWorkflow === index
                      ? editData.final
                      : workflow.final}
                  </div>

                  <div
                    style={{
                      color: "#16a34a",
                      marginTop: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Final Approval
                  </div>
                </div>
              </div>
              {editingWorkflow === index && (
                <div
                  style={{
                    marginTop: "24px",
                    padding: "20px",
                    borderRadius: "18px",
                    background: "rgba(248,250,252,.9)",
                    border: "1px solid var(--border)",
                    display: "grid",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: 600,
                      }}
                    >
                      Initial Approval
                    </label>

                    <select
                      value={editData.initial}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          initial: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "12px",
                      }}
                    >
                      {approvers.map((a) => (
                        <option key={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: 600,
                      }}
                    >
                      Compliance Approval
                    </label>

                    <select
                      value={editData.compliance}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          compliance: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "12px",
                      }}
                    >
                      {approvers.map((a) => (
                        <option key={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: 600,
                      }}
                    >
                      Final Approval
                    </label>

                    <select
                      value={editData.final}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          final: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "12px",
                      }}
                    >
                      {approvers.map((a) => (
                        <option key={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <button
                      onClick={() => setEditingWorkflow(null)}
                      style={{
                        padding: "12px 18px",
                        borderRadius: "12px",
                        border: "1px solid var(--border)",
                        background: "white",
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        const updated = [...workflows];

                        updated[editingWorkflow] = {
                          ...updated[editingWorkflow],
                          initial: editData.initial,
                          compliance: editData.compliance,
                          final: editData.final,
                        };

                        setWorkflows(updated);
                        setEditingWorkflow(null);
                      }}
                      style={{
                        padding: "12px 18px",
                        borderRadius: "12px",
                        border: "none",
                        background:
                          "linear-gradient(135deg,var(--primary),var(--accent))",
                        color: "white",
                        fontWeight: 700,
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => {
                    setEditingWorkflow(index);

                    setEditData({
                      initial: workflow.initial,
                      compliance: workflow.compliance,
                      final: workflow.final,
                    });
                  }}
                  style={{
                    border: "none",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg,var(--primary),var(--accent))",
                    color: "white",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FiEdit />
                  Edit Workflow
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default AssignApprovers;
