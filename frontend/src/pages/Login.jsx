import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiShield,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import trackingIcon from '../images/tracking.png';
import approvalIcon from '../images/approved.png';
import secureIcon from '../images/shield.png';

function Login() {
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin123";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.email === "admin@gmail.com" &&
      formData.password === "admin123"
    ) {
      navigate("/admin-dashboard");
    } else if (
      formData.email === "approver@gmail.com" &&
      formData.password === "approver123"
    ) {
      navigate("/approver-dashboard");
    } else if (
      formData.email === "submitter@gmail.com" &&
      formData.password === "submitter123"
    ) {
      navigate("/submitter-dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  const fieldStyle = {
    width: "100%",
    padding: "13px 14px 13px 42px",
    border: "1px solid var(--border)",
    borderRadius: "14px",
    outline: "none",
    background: "rgba(255,255,255,0.95)",
  };

  return (
    <motion.div
      className="auth-grid"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="auth-hero"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          maxWidth: "720px",
          width: "100%",
          margin: "0 auto",
          justifySelf: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 14px",
            borderRadius: "999px",
            background: "rgba(37, 99, 235, 0.12)",
            color: "var(--primary-dark)",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          <FiShield />
          Secure Approval Workflow
        </div>

        <div className="hero-text-block">
          <h1
            style={{
              fontSize: "clamp(24px, 4vw, 48px)",
              lineHeight: 1.08,
              margin: "0 0 14px",
            }}
          >
            Approve documents faster with a modern workflow system
          </h1>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "620px",
              marginBottom: "20px",
            }}
          >
            Manage document submission, approval stages, comments, revision
            requests, and history tracking in one clean dashboard.
          </p>
        </div>

        <div
          className="feature-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
            maxWidth: "700px",
          }}
        >
          {[
            {
              icon: trackingIcon,
              title: "Document Tracking",
              text: "Track every submission and revision.",
            },
            {
              icon: approvalIcon,
              title: "Approval Flow",
              text: "Multi-stage approval process made simple.",
            },
            {
              icon: secureIcon,
              title: "Secure Access",
              text: "Role-based access for all users.",
            },
          ].map((item) => (
            <motion.div
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              transition={{ duration: 0.2 }}
              style={{
                background: "rgba(255,255,255,0.75)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "14px",
                boxShadow: "var(--shadow-soft)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "14px",
                  background: "rgba(37,99,235,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                <img
                  src={item.icon}
                  alt=""
                  style={{
                    width: "34px",
                    height: "34px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div style={{ fontWeight: 700, marginBottom: "6px" }}>
                {item.title}
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                {item.text}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="login-border-wrapper">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, x: 20, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            background: "#ffffff",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.7)",
            borderRadius: "22px",
            boxShadow: "var(--shadow)",
            padding: "24px",
          }}
        >
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{ margin: 0, fontSize: "28px" }}>Welcome Back</h2>
            <p
              style={{
                margin: "10px 0 0",
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              Login to continue to the document approval dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "18px", position: "relative" }}>
              <label
                style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
              >
                Email
              </label>
              <FiMail
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50px",
                  color: "var(--muted)",
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                style={fieldStyle}
              />
            </div>

            <div style={{ marginBottom: "18px", position: "relative" }}>
              <label
                style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
              >
                Password
              </label>
              <FiLock
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "44px",
                  color: "var(--muted)",
                }}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={fieldStyle}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--muted)",
                }}
              >
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#" style={{ color: "var(--primary)", fontWeight: 600 }}>
                Forgot password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "none",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, var(--primary), var(--accent))",
                color: "white",
                fontWeight: 700,
                fontSize: "15px",
                boxShadow: "0 14px 30px rgba(37, 99, 235, 0.25)",
              }}
            >
              Login
            </motion.button>

            <p
              style={{
                marginTop: "18px",
                textAlign: "center",
                color: "var(--muted)",
              }}
            >
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{ color: "var(--primary)", fontWeight: 700 }}
              >
                Register
              </Link>
            </p>
          </form>
        </motion.div>
        </div>
    </motion.div>
  );
}

export default Login;
