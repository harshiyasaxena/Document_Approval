import React from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiShield,
  FiFileText,
  FiCheckCircle,
  FiUsers,
  FiTrendingUp,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import secureIcon from '../images/security.png';
import roleIcon from '../images/easy-access.png';
import trackingIcon from '../images/real-time.png';
import brainstormImg from '../images/Discuss.png';
import submitImg from '../images/Submit.jpg';
import reviewImg from '../images/reviewed.jpg';
import successImg from '../images/Success.jpg';
import groupImg from '../images/Group.jpg';
import { FiArrowUp } from 'react-icons/fi';


function LandingPage() {
  const steps = [
    {
      title: 'Brainstorm',
      text: 'Start by gathering ideas and preparing your document.',
      image: brainstormImg,
      color: '#2563eb',
    },
    {
      title: 'Submit',
      text: 'Upload the document with title, description, and workflow type.',
      image: submitImg,
      color: '#7c3aed',
    },
    {
      title: 'Review',
      text: 'Approvers review the document and provide feedback or revision requests.',
      image: reviewImg,
      color: '#f59e0b',
    },
    {
      title: 'Success',
      text: 'Once approved, your document is finalized successfully.',
      image: successImg,
      color: '#16a34a',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, rgba(37, 99, 235, 0.14), transparent 28%), radial-gradient(circle at top right, rgba(124, 58, 237, 0.14), transparent 28%), linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)',
      }}
    >
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px 60px' }}>
        {/* Hero */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '28px',
            alignItems: 'center',
          }}
          className="landing-grid"
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '999px',
                background: 'rgba(37, 99, 235, 0.12)',
                color: 'var(--primary-dark)',
                fontWeight: 700,
                marginBottom: '18px',
              }}
            >
              <FiShield />
              Secure Document Approval System
            </div>

            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 62px)',
                lineHeight: 1.05,
                margin: '0 0 18px',
                letterSpacing: '-0.04em',
              }}
            >
              Submit, review, and approve documents with ease
            </h1>

            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.7,
                color: 'var(--muted)',
                maxWidth: '650px',
                marginBottom: '28px',
              }}
            >
              A modern workflow platform for submitters, approvers, and admins to manage document approval stages,
              feedback, and history in one place.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  background:
                    'linear-gradient(135deg, var(--primary), var(--accent))',
                  color: 'white',
                  fontWeight: 700,
                  boxShadow: '0 14px 30px rgba(37, 99, 235, 0.22)',
                }}
              >
                Login <FiArrowRight />
              </Link>

              <Link
                to="/register"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: '1px solid var(--border)',
                  background: 'white',
                  color: 'var(--text)',
                  fontWeight: 700,
                }}
              >
                Register
              </Link>
            </div>
          </motion.div>


          {/* Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            // animate={{ opacity: 1, x: 0, scale: 1 }}
            // transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.7)',
              borderRadius: '28px',
              boxShadow: 'var(--shadow)',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <img
              src={groupImg}
              alt="Team collaboration"
              style={{
                width: '100%',
                maxWidth: '420px',
                height: 'auto',
                borderRadius: '20px',
                margin: '0 auto 18px',
                display: 'block',
                objectFit: 'cover',
              }}
            />

            <h3 style={{ margin: '0 0 10px', fontSize: '22px' }}>
              Team collaboration made simple
            </h3>

            <p style={{ color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Brainstorm, review, and approve documents with a smooth workflow experience.
            </p>
          </motion.div>


        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: '50px',
          }}
        >
          <div
            className="stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                value: '500+',
                label: 'Documents Submitted',
                icon: <FiFileText />,
                color: '#2563eb',
              },
              {
                value: '250+',
                label: 'Approvals Completed',
                icon: <FiCheckCircle />,
                color: '#16a34a',
              },
              {
                value: '50+',
                label: 'Active Users',
                icon: <FiUsers />,
                color: '#7c3aed',
              },
              {
                value: '99%',
                label: 'Workflow Accuracy',
                icon: <FiTrendingUp />,
                color: '#f59e0b',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '24px',
                  border: '1px solid var(--border)',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-soft)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '130px',
                    opacity: 0.07,
                    color: item.color,
                    pointerEvents: 'none',
                  }}
                >
                  {item.icon}
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: '42px',
                    color: item.color,
                    position: 'relative',
                    zIndex: 2,
                    fontWeight: 800,
                  }}
                >
                  {item.value}
                </h2>

                <p
                  style={{
                    marginTop: '10px',
                    color: '#475569',
                    position: 'relative',
                    zIndex: 2,
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            marginTop: '48px',
            background: 'rgba(255,255,255,0.75)',
            border: '1px solid var(--border)',
            borderRadius: '28px',
            padding: '28px',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: '12px' }}>
            How the process works
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 0, marginBottom: '28px' }}>
            A clear visual flow from brainstorming to successful approval.
          </p>

          <div
            className="timeline-wrapper"
            style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}
          >
            {steps.map((step, index) => (
              <React.Fragment key={step.title}>
                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: 0.12 * index }}
                  style={{
                    flex: '1',
                    minWidth: '200px',
                    background: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: '22px',
                    padding: '18px',
                    boxShadow: 'var(--shadow-soft)',
                    textAlign: 'center',
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'loop',
                      delay: index * 0.2,
                    }}
                    style={{
                      width: '100%',
                      height: '180px',
                      marginBottom: '14px',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      background: '#f8fafc',
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </motion.div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '42px',
                      height: '42px',
                      borderRadius: '999px',
                      background: `${step.color}20`,
                      color: step.color,
                      fontWeight: 800,
                      marginBottom: '12px',
                    }}
                  >
                    {index + 1}
                  </div>

                  <div style={{ fontWeight: 800, marginBottom: '8px', fontSize: '18px' }}>
                    {step.title}
                  </div>

                  <div
                    style={{
                      color: 'var(--muted)',
                      fontSize: '14px',
                      lineHeight: 1.6,
                    }}
                  >
                    {step.text}
                  </div>
                </motion.div>

                {index !== steps.length - 1 && (
                  <div
                    className="timeline-arrow"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '40px',
                      color: 'var(--muted)',
                      fontSize: '24px',
                      fontWeight: 700,
                    }}
                  >
                    <FiArrowRight />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: '50px',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '30px',
            }}
          >
            Who Uses This Platform?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '22px',
            }}
          >
            {[
              {
                title: 'Submitter',
                text: 'Upload documents and track approval status.',
                color: '#2563eb',
                icon: '👤',
              },
              {
                title: 'Approver',
                text: 'Review, approve, reject or request revisions.',
                color: '#16a34a',
                icon: '✅',
              },
              {
                title: 'Admin',
                text: 'Manage users, roles and approval workflows.',
                color: '#7c3aed',
                icon: '⚙️',
              },
            ].map((role) => (
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{ duration: 0.2 }}
                key={role.title}
                style={{
                  background: `linear-gradient(
      135deg,
      ${role.color}10,
      white 60%
    )`,
                  borderRadius: '24px',
                  padding: '28px',
                  border: '1px solid var(--border)',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-soft)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-25px',
                    right: '-15px',
                    fontSize: '90px',
                    opacity: 0.08,
                  }}
                >
                  {role.icon}
                </div>

                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '20px',
                    margin: '0 auto 18px',
                    background: `${role.color}15`,
                    color: role.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '34px',
                  }}
                >
                  {role.icon}
                </div>

                <h3
                  style={{
                    marginBottom: '12px',
                    color: role.color,
                    fontSize: '22px',
                  }}
                >
                  {role.title}
                </h3>

                <p
                  style={{
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                    marginBottom: '18px',
                  }}
                >
                  {role.text}
                </p>



              </motion.div>
            ))}
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: '60px',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.08))',
            borderRadius: '28px',
            padding: '50px',
            textAlign: 'center',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-soft)',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '999px',
              background: 'rgba(37,99,235,0.12)',
              color: 'var(--primary)',
              fontWeight: 700,
              marginBottom: '18px',
            }}
          >
            🚀 Start Today
          </div>
          <h2
            style={{
              marginTop: 0,
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}
          >
            Ready to streamline document approvals?
          </h2>

          <p
            style={{
              color: 'var(--muted)',
              maxWidth: '650px',
              margin: '12px auto 24px',
              lineHeight: 1.7,
            }}
          >
            Start managing submissions, reviews, approvals and
            workflow tracking from one centralized platform.
          </p>

          <Link
            to="/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 22px',
              borderRadius: '14px',
              background:
                'linear-gradient(135deg, var(--primary), var(--accent))',
              color: 'white',
              fontWeight: 700,
            }}
          >
            Get Started Today
            <FiArrowRight />
          </Link>
          <div
            style={{
              marginTop: '22px',
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#000',
                fontWeight: 700,
              }}
            >
              <img
                src={secureIcon}
                alt=""
                style={{
                  width: '22px',
                  height: '22px',
                }}
              />
              Secure Workflows
            </span>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#000',
                fontWeight: 700,
              }}
            >
              <img
                src={roleIcon}
                alt=""
                style={{
                  width: '22px',
                  height: '22px',
                }}
              />
              Role-Based Access
            </span>

            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#000',
                fontWeight: 700,
              }}
            >
              <img
                src={trackingIcon}
                alt=""
                style={{
                  width: '22px',
                  height: '22px',
                }}
              />
              Real-Time Tracking
            </span>
          </div>
          <motion.button
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            style={{
              position: 'absolute',
              right: '25px',
              bottom: '25px',

              width: '52px',
              height: '52px',
              borderRadius: '50%',

              border: '1px solid rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',

              color: 'var(--primary)',
              cursor: 'pointer',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
            }}
          >
            <FiArrowUp />
          </motion.button>
        </motion.section>
      </main>
    </div>
  );
}

export default LandingPage;
