import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TaskListPage from "./pages/TodoList";
import ShowTask from "./pages/ShowTodo";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // ✅ Check if token exists
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default: Show Signin */}
        <Route path="/" element={<Signin />} />

        {/* Public Route */}
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<HomePage />} />
          <Route path="task-list" element={<TaskListPage />} />
          <Route path="show-task/:todoId" element={<ShowTask />} /> {/* ✅ Updated todoId */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
