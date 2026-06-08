import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiFileText,
    FiClock,
    FiCheckCircle,
    FiSearch,
    FiArrowRight,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

function ApproverNotifications() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [categoryFilter, setCategoryFilter] =
        useState('All Categories');

    const documents = [
        {
            id: 1,
            title: 'Build a Tracker',
            category: 'Project Proposal',
            submittedBy: 'John Doe',
            assignedDate: 'Today',
            status: 'Pending Review',
        },
        {
            id: 2,
            title: 'CSR',
            category: 'Budget Request',
            submittedBy: 'Sarah Khan',
            assignedDate: 'Yesterday',
            status: 'Approved',
        },
        {
            id: 3,
            title: 'Security',
            category: 'Policy Document',
            submittedBy: 'Ali Ahmed',
            assignedDate: '2 days ago',
            status: 'Revision Required',
        },
    ];

    const filteredDocuments = documents.filter((doc) => {
        const matchesSearch =
            doc.title.toLowerCase().includes(search.toLowerCase()) ||
            doc.submittedBy.toLowerCase().includes(search.toLowerCase()) ||
            doc.category.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === 'All Statuses' ||
            doc.status === statusFilter;


        const matchesCategory =
            categoryFilter === 'All Categories' ||
            doc.category === categoryFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
        );
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Approved':
                return {
                    bg: 'rgba(22,163,74,.12)',
                    color: '#16a34a',
                };

            case 'Pending Review':
                return {
                    bg: 'rgba(245,158,11,.12)',
                    color: '#f59e0b',
                };

            case 'Revision Required':
                return {
                    bg: 'rgba(37,99,235,.12)',
                    color: '#2563eb',
                };

            case 'Rejected':
                return {
                    bg: 'rgba(220,38,38,.12)',
                    color: '#dc2626',
                };

            default:
                return {
                    bg: '#f1f5f9',
                    color: '#475569',
                };
        }
    };

    const stats = [
        {
            title: 'Total Assigned',
            value: '40',
            icon: <FiFileText />,
            color: '#2563eb',
            bg: 'rgba(37,99,235,.12)',
        },
        {
            title: 'Pending Reviews',
            value: '12',
            icon: <FiClock />,
            color: '#f59e0b',
            bg: 'rgba(245,158,11,.12)',
        },
        {
            title: 'Completed Reviews',
            value: '28',
            icon: <FiCheckCircle />,
            color: '#16a34a',
            bg: 'rgba(22,163,74,.12)',
        },
    ];

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
                    Pending Reviews
                </h1>

                <p
                    style={{
                        color: 'var(--muted)',
                        marginTop: '8px',
                    }}
                >
                    Documents assigned to you for review and approval.
                </p>
            </div>

            {/* Stats */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fit,minmax(220px,1fr))',
                    gap: '18px',
                    marginBottom: '28px',
                }}
            >
                {stats.map((item) => (
                    <div
                        key={item.title}
                        style={{
                            background: 'rgba(255,255,255,.82)',
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
                                background: item.bg,
                                color: item.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                marginBottom: '14px',
                            }}
                        >
                            {item.icon}
                        </div>

                        <div
                            style={{
                                color: 'var(--muted)',
                                fontSize: '14px',
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

            {/* Search & Filter */}
            <div
                style={{
                    background: 'rgba(255,255,255,.82)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--border)',
                    borderRadius: '24px',
                    padding: '20px',
                    marginBottom: '24px',
                    boxShadow: 'var(--shadow-soft)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '14px',
                        flexWrap: 'wrap',
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            flex: 1,
                            minWidth: '250px',
                        }}
                    >
                        <FiSearch
                            style={{
                                position: 'absolute',
                                left: '14px',
                                top: '14px',
                                color: 'var(--muted)',
                            }}
                        />

                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            style={{
                                width: '100%',
                                padding: '12px 14px 12px 42px',
                                borderRadius: '12px',
                                border: '1px solid var(--border)',
                            }}
                        />
                    </div>


                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        style={{
                            padding: '12px',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            minWidth: '220px',
                        }}
                    >
                        <option>All Statuses</option>
                        <option>Pending Review</option>
                        <option>Approved</option>
                        <option>Revision Required</option>
                        <option>Rejected</option>
                    </select>

                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(e.target.value)
                        }
                        style={{
                            padding: '12px',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            minWidth: '220px',
                        }}
                    >
                        <option>All Categories</option>
                        <option>Project Proposal</option>
                        <option>Budget Request</option>
                        <option>Policy Document</option>
                    </select>
                </div>
            </div>

            {/* Documents */}
            <div>
                <h2 style={{ marginBottom: '8px' }}>
                    All Documents
                </h2>

                <p
                    style={{
                        color: 'var(--muted)',
                        marginTop: 0,
                        marginBottom: '20px',
                    }}
                >
                    View all documents assigned to you.
                </p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit,minmax(320px,1fr))',
                        gap: '18px',
                    }}
                >
                    {filteredDocuments.map((doc) => {
                        const badge = getStatusStyle(doc.status);

                        return (
                            <motion.div
                                key={doc.id}
                                whileHover={{ y: -4 }}
                                style={{
                                    background: 'rgba(255,255,255,.82)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid var(--border)',
                                    borderLeft:
                                        doc.status === 'Pending Review'
                                            ? '5px solid #f59e0b'
                                            : '1px solid var(--border)',
                                    borderRadius: '22px',
                                    padding: '20px',
                                    boxShadow: 'var(--shadow-soft)',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent:
                                            'space-between',
                                        gap: '12px',
                                        flexWrap: 'wrap',
                                        marginBottom: '16px',
                                    }}
                                >
                                    <h3
                                        style={{
                                            margin: 0,
                                        }}
                                    >
                                        {doc.title}
                                    </h3>

                                    <span
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '999px',
                                            background: badge.bg,
                                            color: badge.color,
                                            fontSize: '12px',
                                            fontWeight: 800,
                                        }}
                                    >
                                        {doc.status}
                                    </span>
                                </div>
                                <p
                                    style={{
                                        margin: '0 0 6px',
                                        color: 'var(--muted)',
                                    }}
                                >
                                    Category: {doc.category}
                                </p>

                                <p
                                    style={{
                                        margin: '0 0 8px',
                                        color: 'var(--muted)',
                                    }}
                                >
                                    Submitted By: {doc.submittedBy}
                                </p>

                                <p
                                    style={{
                                        margin: '0 0 18px',
                                        color: 'var(--muted)',
                                    }}
                                >
                                    Assigned: {doc.assignedDate}
                                </p>

                                <Link
                                    to={`/approver/document/${doc.id}`}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: 'var(--primary)',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                    }}
                                >
                                    {doc.status === 'Pending Review'
                                        ? 'Review Document'
                                        : 'View Details'}

                                    <FiArrowRight />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div >
    );
}

export default ApproverNotifications;