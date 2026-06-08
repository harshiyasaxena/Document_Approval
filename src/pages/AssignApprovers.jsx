import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiUserCheck,
    FiSearch,
    FiArrowRight,
    FiEdit,
} from 'react-icons/fi';


function AssignApprovers() {
    const [search, setSearch] = useState('');
    const [editingWorkflow, setEditingWorkflow] = useState(null);
    const [editData, setEditData] = useState({
        initial: '',
        compliance: '',
        final: '',
    });

    const approvers = [
        'Sarah Khan',
        'Ali Ahmed',
        'Michael Scott',
        'David Miller',
        'Emma Watson',
    ];

    const filteredApprovers = approvers.filter((approver) =>
        approver.toLowerCase().includes(search.toLowerCase())
    );

    const [workflows, setWorkflows] = useState([
  {
    name: 'Project Proposal',
    initial: 'Sarah Khan',
    compliance: 'Ali Ahmed',
    final: 'Michael Scott',
  },
  {
    name: 'Budget Request',
    initial: 'David Miller',
    compliance: 'Sarah Khan',
    final: 'Michael Scott',
  },
  {
    name: 'Policy Document',
    initial: 'Ali Ahmed',
    compliance: 'Sarah Khan',
    final: 'Michael Scott',
  },
]);

    const cardStyle = {
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '22px',
        boxShadow: 'var(--shadow-soft)',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
                <h1
                    style={{
                        margin: 0,
                        fontSize: '34px',
                        letterSpacing: '-0.03em',
                    }}
                >
                    Assign Workflow Approvers
                </h1>

                <p
                    style={{
                        color: 'var(--muted)',
                        marginTop: '8px',
                    }}
                >
                    Configure approval chains for all document workflows.
                </p>
            </div>

            <div
                className="dashboard-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '320px 1fr',
                    gap: '24px',
                    alignItems: 'start',
                }}
            >
                {/* Approver Panel */}
                <div style={cardStyle}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '18px',
                        }}
                    >
                        <FiUserCheck />
                        <h2 style={{ margin: 0 }}>Available Approvers</h2>
                    </div>

                    <div
                        style={{
                            position: 'relative',
                            marginBottom: '18px',
                        }}
                    >
                        <FiSearch
                            style={{
                                position: 'absolute',
                                left: '12px',
                                top: '13px',
                                color: 'var(--muted)',
                            }}
                        />

                        <input
                            type="text"
                            placeholder="Search approver..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 38px',
                                borderRadius: '12px',
                                border: '1px solid var(--border)',
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gap: '12px',
                        }}
                    >
                        {filteredApprovers.map((approver) => (
                            <div
                                key={approver}
                                style={{
                                    padding: '14px',
                                    borderRadius: '14px',
                                    background: 'rgba(248,250,252,0.9)',
                                    border: '1px solid var(--border)',
                                    fontWeight: 600,
                                }}
                            >
                                {approver}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Workflow Cards */}
                <div
                    style={{
                        display: 'grid',
                        gap: '22px',
                    }}
                >
                    {workflows.map((workflow, index) => (
                        <div
                            key={workflow.name}
                            style={cardStyle}
                        >

                            <h2
                                style={{
                                    marginTop: 0,
                                    marginBottom: '8px',
                                }}
                            >
                                {workflow.name}
                            </h2>

                            <p
                                style={{
                                    marginTop: 0,
                                    marginBottom: '24px',
                                    color: 'var(--muted)',
                                }}
                            >
                                Configure approvers for each approval stage.
                            </p>

                            <div
                                className="timeline-wrapper"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '16px',
                                }}
                            >

                                <div
                                    style={{
                                        flex: 1,
                                        padding: '18px',
                                        borderRadius: '18px',
                                        textAlign: 'center',
                                        background: 'rgba(37,99,235,.08)',
                                        border: '1px solid rgba(37,99,235,.15)',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '54px',
                                            height: '54px',
                                            borderRadius: '999px',
                                            margin: '0 auto 12px',
                                            background: 'rgba(37,99,235,.12)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 800,
                                            color: '#2563eb',
                                        }}
                                    >
                                        {workflow.initial
                                            .split(' ')
                                            .map((word) => word[0])
                                            .join('')}
                                    </div>

                                    <div style={{ fontWeight: 700 }}>
                                        {workflow.initial}
                                    </div>

                                    <div
                                        style={{
                                            color: '#2563eb',
                                            marginTop: '6px',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Initial Approval
                                    </div>
                                </div>

                                <FiArrowRight
                                    className="timeline-arrow"
                                    style={{
                                        fontSize: '24px',
                                        color: 'var(--muted)',
                                    }}
                                />

                                <div
                                    style={{
                                        flex: 1,
                                        padding: '18px',
                                        borderRadius: '18px',
                                        textAlign: 'center',
                                        background: 'rgba(245,158,11,.08)',
                                        border: '1px solid rgba(245,158,11,.15)',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '54px',
                                            height: '54px',
                                            borderRadius: '999px',
                                            margin: '0 auto 12px',
                                            background: 'rgba(245,158,11,.12)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 800,
                                            color: '#f59e0b',
                                        }}
                                    >
                                        {workflow.compliance
                                            .split(' ')
                                            .map((word) => word[0])
                                            .join('')}
                                    </div>

                                    <div style={{ fontWeight: 700 }}>
                                        {workflow.compliance}
                                    </div>

                                    <div
                                        style={{
                                            color: '#f59e0b',
                                            marginTop: '6px',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Compliance Approval
                                    </div>
                                </div>

                                <FiArrowRight
                                    className="timeline-arrow"
                                    style={{
                                        fontSize: '24px',
                                        color: 'var(--muted)',
                                    }}
                                />

                                <div
                                    style={{
                                        flex: 1,
                                        padding: '18px',
                                        borderRadius: '18px',
                                        textAlign: 'center',
                                        background: 'rgba(22,163,74,.08)',
                                        border: '1px solid rgba(22,163,74,.15)',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '54px',
                                            height: '54px',
                                            borderRadius: '999px',
                                            margin: '0 auto 12px',
                                            background: 'rgba(22,163,74,.12)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 800,
                                            color: '#16a34a',
                                        }}
                                    >
                                        {workflow.final
                                            .split(' ')
                                            .map((word) => word[0])
                                            .join('')}
                                    </div>

                                    <div style={{ fontWeight: 700 }}>
                                        {workflow.final}
                                    </div>

                                    <div
                                        style={{
                                            color: '#16a34a',
                                            marginTop: '6px',
                                            fontSize: '14px',
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
                                        marginTop: '24px',
                                        padding: '20px',
                                        borderRadius: '18px',
                                        background: 'rgba(248,250,252,.9)',
                                        border: '1px solid var(--border)',
                                        display: 'grid',
                                        gap: '16px',
                                    }}
                                >
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
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
                                                width: '100%',
                                                padding: '12px',
                                                borderRadius: '12px',
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
                                                display: 'block',
                                                marginBottom: '8px',
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
                                                width: '100%',
                                                padding: '12px',
                                                borderRadius: '12px',
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
                                                display: 'block',
                                                marginBottom: '8px',
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
                                                width: '100%',
                                                padding: '12px',
                                                borderRadius: '12px',
                                            }}
                                        >
                                            {approvers.map((a) => (
                                                <option key={a}>{a}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            gap: '12px',
                                        }}
                                    >
                                        <button
                                            onClick={() => setEditingWorkflow(null)}
                                            style={{
                                                padding: '12px 18px',
                                                borderRadius: '12px',
                                                border: '1px solid var(--border)',
                                                background: 'white',
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
                                                padding: '12px 18px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background:
                                                    'linear-gradient(135deg,var(--primary),var(--accent))',
                                                color: 'white',
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
                                    marginTop: '20px',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
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
                                        border: 'none',
                                        padding: '12px 18px',
                                        borderRadius: '12px',
                                        background:
                                            'linear-gradient(135deg,var(--primary),var(--accent))',
                                        color: 'white',
                                        fontWeight: 700,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    <FiEdit />
                                    Edit Workflow
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default AssignApprovers;