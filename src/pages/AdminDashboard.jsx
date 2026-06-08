import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiUserCheck,
  FiFileText,
} from 'react-icons/fi';

function AdminDashboard() {
  const [search, setSearch] = useState('');
const [filter, setFilter] = useState('All');
  const stats = [
  {
    title: 'Total Submitters',
    value: '24',
    icon: <FiUsers />,
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.12)',
  },
  {
    title: 'Total Approvers',
    value: '8',
    icon: <FiUserCheck />,
    color: '#7c3aed',
    bg: 'rgba(124, 58, 237, 0.12)',
  },
  {
    title: 'All Documents',
    value: '128',
    icon: <FiFileText />,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.12)',
  },
];

  
 const documents = [
  {
    title: 'Project Proposal',
    status: 'Pending Approval',
    owner: 'John Doe',
  },
  {
    title: 'Budget Request',
    status: 'Approved',
    owner: 'Sarah Khan',
  },
  {
    title: 'Policy Document',
    status: 'Revision Required',
    owner: 'Ali Ahmed',
  },
  {
    title: 'Vendor Contract',
    status: 'Rejected',
    owner: 'Michael Scott',
  },
];
const filteredDocuments = documents.filter((doc) => {
  const matchesSearch =
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.owner.toLowerCase().includes(search.toLowerCase());

  const matchesFilter =
    filter === 'All' || doc.status === filter;

  return matchesSearch && matchesFilter;
});

 

  const getStatusStyle = (status) => {
    if (status === 'Approved' || status === 'Active') {
      return { bg: 'rgba(22, 163, 74, 0.12)', color: '#16a34a' };
    }
    if (status === 'Pending Approval' || status === 'Pending') {
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
          Admin Dashboard
        </h1>
        <p style={{ color: 'var(--muted)', marginTop: '8px', fontSize: '16px' }}>
          Manage users, approvers, document workflows, and system activity.
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
    gap: '22px',
  }}
>
        {/* User / Documents Panel */}
        <div style={{ display: 'grid', gap: '22px' }}>
          

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
            <h2 style={{ marginTop: 0 }}>Monitor All Documents</h2>
            <p style={{ marginTop: '-6px', color: 'var(--muted)' }}>
              Track document status across all users.
            </p>
            <div
  style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '20px',
    marginBottom: '20px',
  }}
>
  <input
    type="text"
    placeholder="Search document or owner..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      flex: 1,
      minWidth: '240px',
      padding: '12px 14px',
      borderRadius: '12px',
      border: '1px solid var(--border)',
      background: 'white',
    }}
  />

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    style={{
      minWidth: '220px',
      padding: '12px 14px',
      borderRadius: '12px',
      border: '1px solid var(--border)',
      background: 'white',
    }}
  >
    <option value="All">All Status</option>
    <option value="Approved">Approved</option>
    <option value="Pending Approval">Pending Approval</option>
    <option value="Revision Required">Revision Required</option>
    <option value="Rejected">Rejected</option>
  </select>
</div>

            <div style={{ display: 'grid', gap: '14px', marginTop: '18px' }}>
              {filteredDocuments.map((doc, index) => {
                const badge = getStatusStyle(doc.status);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    style={{
                                            padding: '16px',
                      borderRadius: '18px',
                      background: 'rgba(248, 250, 252, 0.75)',
                      border: '1px solid var(--border)',
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
                        <div style={{ fontWeight: 800, marginBottom: '4px' }}>
                          {doc.title}
                        </div>
                        <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                          Owner: {doc.owner}
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '8px 12px',
                          borderRadius: '999px',
                          background: badge.bg,
                          color: badge.color,
                          fontSize: '12px',
                          fontWeight: 800,
                          whiteSpace: 'nowrap',
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