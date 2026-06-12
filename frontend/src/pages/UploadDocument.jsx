import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiAlignLeft,
  FiLayers,
  FiUploadCloud,
} from "react-icons/fi";

function UploadDocument() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const resubmitId = params.get("resubmitId");
  const currentVersion = params.get("version");
  const isResubmit = !!resubmitId;

  // Hard-coded document data for resubmit mode
  const existingDocuments = {
    "1": { title: "Project Name 1", description: "Proposal for the new company project.", category: "Business" },
    "2": { title: "Project Name 2", description: "Annual budget request for Q3.", category: "Finance" },
    "3": { title: "Project Name 3", description: "Updated policy document for the department.", category: "Policy" },
    "4": { title: "Project Name 4", description: "Leave application for employee.", category: "HR" },
  };

  const existingDoc = isResubmit
    ? existingDocuments[resubmitId] || { title: "Document", description: "Document description", category: "General" }
    : null;

  const [formData, setFormData] = useState({
    title: isResubmit && existingDoc ? existingDoc.title : "",
    description: isResubmit && existingDoc ? existingDoc.description : "",
    category: isResubmit && existingDoc ? existingDoc.category : "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: name === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let nextVersion = "v1";

    if (isResubmit && currentVersion) {
      const versionNumber = parseInt(currentVersion.replace("v", ""), 10);
      nextVersion = `v${versionNumber + 1}`;
    }

    console.log("Document Data:", {
      ...formData,
      version: nextVersion,
      resubmitId: isResubmit ? resubmitId : null,
    });
  };

  const fieldStyle = {
    width: "100%",
    padding: "14px 14px 14px 42px",
    border: "1px solid var(--border)",
    borderRadius: "14px",
    outline: "none",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
  };

  const readOnlyFieldStyle = {
    ...fieldStyle,
    background: "rgba(248,250,252,0.95)",
    color: "#64748b",
    cursor: "not-allowed",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "24px",
        alignItems: "start",
      }}
      className="upload-grid"
    >
      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(12px)",
          border: "1px solid var(--border)",
          borderRadius: "28px",
          boxShadow: "var(--shadow)",
          padding: "30px",
          maxWidth: "820px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ margin: 0, fontSize: "30px", letterSpacing: "-0.03em" }}>
            {isResubmit ? "Resubmit Document" : "Upload Document"}
          </h2>
          <p
            style={{
              color: "var(--muted)",
              marginTop: "10px",
              lineHeight: 1.6,
            }}
          >
            {isResubmit
              ? "Upload a revised version of this document. Only the file can be changed."
              : "Submit a new document for approval with title, description, category, and file attachment."}
          </p>

          {isResubmit && (
            <div
              style={{
                marginTop: "14px",
                padding: "12px 14px",
                borderRadius: "12px",
                background: "rgba(245,158,11,0.10)",
                border: "1px solid rgba(245,158,11,0.18)",
                fontWeight: 600,
              }}
            >
              Current version: <strong>{currentVersion}</strong> → New version: <strong>v{parseInt((currentVersion || "v1").replace("v", ""), 10) + 1}</strong>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px", position: "relative" }}>
            <label
              style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
            >
              Title
            </label>
            <FiFileText
              style={{
                position: "absolute",
                left: "14px",
                top: "44px",
                color: "var(--muted)",
              }}
            />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter document title"
              readOnly={isResubmit}
              style={isResubmit ? readOnlyFieldStyle : fieldStyle}
            />
          </div>

          <div style={{ marginBottom: "18px", position: "relative" }}>
            <label
              style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
            >
              Description
            </label>
            <FiAlignLeft
              style={{
                position: "absolute",
                left: "14px",
                top: "44px",
                color: "var(--muted)",
              }}
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter document description"
              rows="5"
              readOnly={isResubmit}
              style={{
                ...(isResubmit ? readOnlyFieldStyle : fieldStyle),
                paddingLeft: "42px",
                resize: isResubmit ? "none" : "vertical",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px", position: "relative" }}>
            <label
              style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
            >
              Category
            </label>
            <FiLayers
              style={{
                position: "absolute",
                left: "14px",
                top: "44px",
                color: "var(--muted)",
              }}
            />
            {isResubmit ? (
              <input
                type="text"
                value={formData.category}
                readOnly
                style={readOnlyFieldStyle}
              />
            ) : (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  ...fieldStyle,
                  paddingLeft: "42px",
                }}
              >
                <option value="" disabled>
                  Select the Category
                </option>
                <option value="Business">Business</option>
                <option value="Finance">Finance</option>
                <option value="Policy">Policy</option>
                <option value="HR">HR</option>
                <option value="General">General</option>
              </select>
            )}
          </div>

          <div style={{ marginBottom: "26px" }}>
            <label
              style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
            >
              {isResubmit ? "Upload Revised File" : "File Upload"}
            </label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "14px",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.9)",
              }}
            />
            <div
              style={{
                color: "var(--muted)",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              {isResubmit
                ? "Upload the revised file (PDF, DOCX, or image). Leave empty to keep the existing file."
                : "Upload PDF, DOCX, or image files."}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{
              width: "100%",
              padding: "14px 18px",
              border: "none",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, var(--primary), var(--accent))",
              color: "white",
              fontWeight: 700,
              fontSize: "15px",
              boxShadow: "0 14px 30px rgba(37, 99, 235, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <FiUploadCloud />
            {isResubmit ? "Resubmit Document" : "Submit Document"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default UploadDocument;
