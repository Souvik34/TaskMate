import React, { useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "../helper/showToast";
import Todo from "../components/Todo";
import { motion, AnimatePresence } from "framer-motion";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showToast("error", "Unauthorized! Please log in.");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/todo/get`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTodos(response.data.todos);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Failed to fetch todos"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showToast("error", "Unauthorized! Please log in.");
        return;
      }

      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/todo/delete/${todoId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showToast("success", "Todo deleted successfully!");
      setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Failed to delete todo!"
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    return todo.status === filter;
  });

  return (
    <div className="pt-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-violet-700 drop-shadow">
        📝 My Todos
      </h1>

      {/* Filter Buttons */}
      <div className="mb-6 flex justify-center gap-4">
        {["All", "Pending", "Completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold border shadow transition-all duration-300 hover:scale-105 ${
              filter === type
                ? "bg-violet-600 text-white border-violet-600 shadow-md"
                : "bg-white text-violet-600 border-violet-300 hover:bg-violet-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredTodos.length > 0 ? (
          <AnimatePresence>
            {filteredTodos.map((todo, index) => (
              <motion.div
                key={todo._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Todo props={todo} onDelete={deleteTodo} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className="text-center text-gray-400">No Todos Available </p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
