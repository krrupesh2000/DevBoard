import { Navigate, Route, Routes } from "react-router";

import ProtectedRoute from "./auth/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

import ActivityPage from "./pages/ActivityPage";
import ArchivePage from "./pages/ArchivePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import TrashPage from "./pages/TrashPage";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Default route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Protected application */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />

          <Route path="projects" element={<ProjectsPage />} />

          <Route path="tasks" element={<TasksPage />} />

          <Route path="activity" element={<ActivityPage />} />

          <Route path="archive" element={<ArchivePage />} />

          <Route path="trash" element={<TrashPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
