import React, { useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "../helper/showToast";
import Todo from "../components/Todo";

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
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">My Todos</h1>

      {/* Filter Buttons */}
      <div className="mb-5 flex gap-3">
        {["All", "Pending", "Completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-md border ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Todo List */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <Todo key={todo._id} props={todo} onDelete={deleteTodo} />
        ))
      ) : (
        <p>No Todos Available.</p>
      )}
    </div>
  );
};

export default TodoList;
