import React, { useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "../helper/showToast";
import Todo from "../components/Todo"; 

const TodoList = () => {
  const [todos, setTodos] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/todo/get-all`, {
        withCredentials: true,
      });
      setTodos(response.data.todoData || []);
    } catch (error) {
      showToast("error", error.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/todo/delete/${todoId}`, {
        withCredentials: true,
      });
      showToast("success", "Todo deleted successfully!");
      setTodos((prev) => prev.filter((todo) => todo._id !== todoId)); 
    } catch (error) {
      showToast("error", error.response?.data?.message || "Failed to delete todo");
    }
  };

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">My Todos</h1>
      {loading ? <p>Loading...</p> : todos.length > 0 ? (
        todos.map((todo) => <Todo key={todo._id} props={todo} onDelete={deleteTodo} />)
      ) : (
        <p>No Todos Available.</p>
      )}
    </div>
  );
};

export default TodoList;
