import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TodoList from "./pages/TodoList";
import ShowTodo from "./pages/ShowTodo";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="add-todo" element={<HomePage />} />
          <Route path="todo-list" element={<TodoList />} />
          <Route path="show-todo/:todoId" element={<ShowTodo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
