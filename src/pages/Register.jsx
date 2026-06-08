import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim().length < 3) {
      alert("Name must be at least 3 characters long");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (!agreed) {
      alert("Please accept the Terms & Conditions");
      return;
    }

    console.log("Register Data:", formData);

    alert("Registration Successful!");
  };
  useEffect(() => {
  const interval = setInterval(() => {
    setActiveStep((prev) => (prev + 1) % 4);
  }, 1000);

  return () => clearInterval(interval);
}, []);

  const fieldStyle = {
    width: "100%",
    padding: "14px 14px 14px 44px",
    border: "1px solid var(--border)",
    borderRadius: "14px",
    outline: "none",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "80px",
        alignItems: "center",
        minHeight: "calc(100vh - 120px)",
      }}
      className="auth-grid"
    >
      {/* Hero Section */}
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
          alignSelf: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 14px",
            borderRadius: "999px",
            background: "rgba(124, 58, 237, 0.12)",
            color: "var(--accent)",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          <FiShield />
          Create Secure Access
        </div>

        <div className="hero-text-block">
          <h1
            style={{
              fontSize: "clamp(34px, 5vw, 58px)",
              lineHeight: 1.05,
              margin: "0 0 16px",
              letterSpacing: "-0.04em",
            }}
          >
            Join the document approval platform
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "var(--muted)",
              maxWidth: "620px",
              marginBottom: "28px",
            }}
          >
            Register a new user account and start managing submissions,
            approvals, revisions, and workflow tracking with ease.
          </p>
        </div>
        <div className="register-timeline">

  <div  className={`timeline-item left ${
    activeStep === 0 ? "active" : ""
  }`}>
    <h3>Create Account</h3>
    <p>Register securely with your credentials.</p>
  </div>

  <div  className={`timeline-item right ${
    activeStep === 1 ? "active" : ""
  }`}>
    <h3>Upload Documents</h3>
    <p>Submit documents for review and approval.</p>
  </div>

  <div  className={`timeline-item left ${
    activeStep === 2 ? "active" : ""
  }`}>
    <h3>Approval Process</h3>
    <p>Approvers review and provide feedback.</p>
  </div>

  <div  className={`timeline-item right ${
    activeStep === 3 ? "active" : ""
  }`}>
    <h3>Track Progress</h3>
    <p>Monitor status and approval history.</p>
  </div>

</div>

        
      </motion.div>

      {/* Register Card */}
      <div className="register-border-wrapper">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, x: 20, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{
          background: "#ffffff",
          backdropFilter: "blur(18px)",
          border: "none",
          borderRadius: "30px",
          boxShadow: "var(--shadow)",
          padding: "30px",
        }}
      >
        <div style={{ marginBottom: "22px" }}>
          <h2 style={{ margin: 0, fontSize: "28px" }}>Create Account</h2>
          <p
            style={{
              margin: "10px 0 0",
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            Register to access the document approval workflow platform.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px", position: "relative" }}>
            <label
              style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
            >
              Name
            </label>
            <FiUser
              style={{
                position: "absolute",
                left: "14px",
                top: "44px",
                color: "var(--muted)",
              }}
            />
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              style={fieldStyle}
            />
          </div>

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
                top: "44px",
                color: "var(--muted)",
              }}
            />
            <input
              type="email"
              required
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
              required
              minLength={6}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              style={fieldStyle}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              marginBottom: "20px",
              color: "var(--muted)",
              lineHeight: 1.5,
            }}
          >
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ marginTop: "4px" }}
            />
            <span>I agree to the terms and conditions and privacy policy.</span>
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
            Register
          </motion.button>

          <p
            style={{
              marginTop: "18px",
              textAlign: "center",
              color: "var(--muted)",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--primary)",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
      </div>
    </motion.div>
  );
}

export default Register;
