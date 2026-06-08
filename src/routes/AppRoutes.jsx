import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UploadDocument from "../pages/UploadDocument";
import DocumentDetails from "../pages/DocumentDetails";
import SubmitterDashboard from "../pages/SubmitterDashboard";
import ApproverDashboard from "../pages/ApproverDashboard";
import ApproverNotifications from "../pages/ApproverNotifications";
import AdminDashboard from "../pages/AdminDashboard";
import AssignRoles from "../pages/AssignRoles";
import AssignApprovers from "../pages/AssignApprovers";
import Layout from "../components/Layout";
import ApproverLayout from "../components/ApproverLayout";
import AdminLayout from "../components/AdminLayout";
import PublicLayout from "../components/PublicLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route element={<PublicLayout />}>
          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Route>

        {/* Submitter Layout */}
        <Route element={<Layout />}>
          <Route
            path="/submitter-dashboard"
            element={<SubmitterDashboard />}
          />

          <Route
            path="/upload"
            element={<UploadDocument />}
          />

          <Route
            path="/submitter/document/:id"
            element={<DocumentDetails />}
          />
        </Route>

        {/* Approver Layout */}
        <Route element={<ApproverLayout />}>
          <Route
            path="/approver-dashboard"
            element={<ApproverDashboard />}
          />

          <Route
            path="/approver-notifications"
            element={<ApproverNotifications />}
          />

          <Route
            path="/approver/document/:id"
            element={<DocumentDetails />}
          />
        </Route>

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/assign-roles"
            element={<AssignRoles />}
          />

          <Route
            path="/assign-approvers"
            element={<AssignApprovers />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;