import React, { useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "../helper/showToast";
import Todo from "../components/Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showToast("error", "Unauthorized! Please log in.");
        return;
      }

      console.log(" Token from localStorage:", token);

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/todo/get`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Todos fetched:", response.data);
      setTodos(response.data.todos);
    } catch (error) {
      console.error(" Failed to fetch todos:", error);

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
      console.error("Failed to delete todo:", error);

      showToast(
        "error",
        error.response?.data?.message || "Failed to delete todo!"
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">My Todos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : todos.length > 0 ? (
        todos.map((todo) => (
          <Todo key={todo._id} props={todo} onDelete={deleteTodo} />
        ))
      ) : (
        <p>No Todos Available.</p>
      )}
    </div>
  );
};

export default TodoList;
  