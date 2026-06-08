
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiUserCheck,
  FiFileText,
  FiSearch,
} from 'react-icons/fi';

function AssignRoles() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Submitter',
    },
    {
      id: 2,
      name: 'Sarah Khan',
      email: 'sarah@example.com',
      role: 'Approver',
    },
    {
      id: 3,
      name: 'Ali Ahmed',
      email: 'ali@example.com',
      role: 'Approver',
    },
    {
      id: 4,
      name: 'Emma Watson',
      email: 'emma@example.com',
      role: 'Submitter',
    },
    {
      id: 5,
      name: 'Michael Scott',
      email: 'michael@example.com',
      role: 'Admin',
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === 'All' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const updateRole = (id, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, role: newRole }
          : user
      )
    );
  };

  const totalUsers = users.length;
  const totalSubmitters = users.filter(
    (u) => u.role === 'Submitter'
  ).length;
  const totalApprovers = users.filter(
    (u) => u.role === 'Approver'
  ).length;

  const getRoleStyle = (role) => {
    switch (role) {
      case 'Admin':
        return {
          bg: 'rgba(22,163,74,.12)',
          color: '#16a34a',
        };

      case 'Approver':
        return {
          bg: 'rgba(245,158,11,.12)',
          color: '#f59e0b',
        };

      default:
        return {
          bg: 'rgba(37,99,235,.12)',
          color: '#2563eb',
        };
    }
  };

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
          Assign Roles
        </h1>

        <p
          style={{
            color: 'var(--muted)',
            marginTop: '8px',
          }}
        >
          Manage platform access, permissions, and user roles.
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
        {[
          {
            title: 'Total Users',
            value: totalUsers,
            icon: <FiUsers />,
            color: '#2563eb',
            bg: 'rgba(37,99,235,.12)',
          },
          {
            title: 'Submitters',
            value: totalSubmitters,
            icon: <FiFileText />,
            color: '#7c3aed',
            bg: 'rgba(124,58,237,.12)',
          },
          {
            title: 'Approvers',
            value: totalApprovers,
            icon: <FiUserCheck />,
            color: '#16a34a',
            bg: 'rgba(22,163,74,.12)',
          },
        ].map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -3 }}
            style={{
              ...cardStyle,
              padding: '20px',
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
          </motion.div>
        ))}
      </div>

      {/* Users Section */}
      <div style={cardStyle}>
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ margin: 0 }}>
            Users & Permissions
          </h2>

          <p
            style={{
              marginTop: '6px',
              color: 'var(--muted)',
            }}
          >
            Assign and manage user roles across the
            platform.
          </p>
        </div>

        {/* Search + Filter */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            marginBottom: '22px',
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: '250px',
              position: 'relative',
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
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                borderRadius: '12px',
                border: '1px solid var(--border)',
              }}
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            style={{
              minWidth: '180px',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          >
            <option value="All">All Roles</option>
            <option value="Submitter">
              Submitter
            </option>
            <option value="Approver">
              Approver
            </option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* User Cards */}
        <div
          style={{
            display: 'grid',
            gap: '14px',
          }}
        >
          {filteredUsers.map((user) => {
            const badge = getRoleStyle(user.role);

            return (
              <motion.div
                key={user.id}
                whileHover={{ y: -2 }}
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  padding: '18px',
                  borderRadius: '18px',
                  background:
                    'rgba(248,250,252,.9)',
                  border:
                    '1px solid var(--border)',
                }}
              >
                {/* User Info */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '999px',
                      background:
                        'rgba(37,99,235,.12)',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent:
                        'center',
                      fontWeight: 800,
                    }}
                  >
                    {user.name
                      .split(' ')
                      .map(
                        (word) => word[0]
                      )
                      .join('')}
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        marginBottom: '4px',
                      }}
                    >
                      {user.name}
                    </div>

                    <div
                      style={{
                        color:
                          'var(--muted)',
                        fontSize: '14px',
                      }}
                    >
                      {user.email}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      padding:
                        '8px 12px',
                      borderRadius:
                        '999px',
                      background:
                        badge.bg,
                      color:
                        badge.color,
                      fontWeight: 700,
                      fontSize: '12px',
                    }}
                  >
                    {user.role}
                  </div>

                  <select
                    defaultValue={user.role}
                    onChange={(e) =>
                      updateRole(
                        user.id,
                        e.target.value
                      )
                    }
                    style={{
                      padding:
                        '10px 12px',
                      borderRadius:
                        '12px',
                      border:
                        '1px solid var(--border)',
                    }}
                  >
                    <option>
                      Submitter
                    </option>
                    <option>
                      Approver
                    </option>
                    <option>
                      Admin
                    </option>
                  </select>

                  <button
                    style={{
                      border: 'none',
                      padding:
                        '10px 16px',
                      borderRadius:
                        '12px',
                      background:
                        'linear-gradient(135deg,var(--primary),var(--accent))',
                      color: 'white',
                      fontWeight: 700,
                    }}
                  >
                    Update Role
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default AssignRoles;
