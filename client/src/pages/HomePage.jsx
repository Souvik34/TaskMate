import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ZodError } from "zod";
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";
import { todoSchema } from "../schemas/validationSchema";

const HomePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", description: "", status: "Pending" });
  const [err, setError] = useState();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = todoSchema.parse(formData);

      const token = localStorage.getItem("token");
      if (!token) {
        showToast("error", "You are not logged in. Please sign in first.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/v1/todo/create",
        validatedData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      setFormData({ title: "", description: "", status: "Pending" });
      setError(null);
      showToast("success", response.data.message);
    } catch (error) {
      console.error(" Full API Error:", error);

      if (error.response?.status === 403) {
        showToast("error", "Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/");
      } else if (error instanceof ZodError) {
        setError(getZodError(error.errors));
      } else {
        showToast("error", error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <input
            value={formData.title}
            onChange={handleInput}
            name="title"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Todo title"
          />
          {err?.title && <span className="text-red-500 text-sm">{err.title}</span>}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
          <textarea
            value={formData.description}
            onChange={handleInput}
            name="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Todo description..."
          />
          {err?.description && <span className="text-red-500 text-sm">{err.description}</span>}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Status</label>
          <select
            value={formData.status}
            onChange={handleInput}
            name="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          {err?.status && <span className="text-red-500 text-sm">{err.status}</span>}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
