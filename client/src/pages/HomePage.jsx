import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ZodError } from "zod";
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";
import { todoSchema } from "../schemas/validationSchema";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", description: "", status: "Pending" });
  const [err, setError] = useState(null);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = todoSchema.parse(formData);
      const token = localStorage.getItem("token");

      if (!token) {
        showToast("error", "🔒 You are not logged in. Please sign in first.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/v1/todo/create",
        validatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({ title: "", description: "", status: "Pending" });
      setError(null);
      showToast("success", `✅ ${response.data.message}`);
    } catch (error) {
      if (error.response?.status === 403) {
        showToast("error", "⏰ Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/");
      } else if (error instanceof ZodError) {
        setError(getZodError(error.errors));
      } else {
        showToast("error", `❌ ${error.response?.data?.message || "Something went wrong"}`);
      }
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto pt-10 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-2">
        📝 Add a New Todo
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
      >
        {/* Title */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            value={formData.title}
            onChange={handleInput}
            name="title"
            type="text"
            placeholder="Enter todo title"
            className={`bg-gray-50 border ${
              err?.title ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 shadow-sm`}
          />
          {err?.title && <span className="text-red-500 text-sm mt-1">{err.title}</span>}
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
             Description
          </label>
          <textarea
            value={formData.description}
            onChange={handleInput}
            name="description"
            rows="4"
            placeholder="Enter todo description..."
            className={`bg-gray-50 border ${
              err?.description ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 shadow-sm`}
          />
          {err?.description && (
            <span className="text-red-500 text-sm mt-1">{err.description}</span>
          )}
        </div>

        {/* Status */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
             Status
          </label>
          <select
            value={formData.status}
            onChange={handleInput}
            name="status"
            className={`bg-gray-50 border ${
              err?.status ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 shadow-sm`}
          >
            <option value="Pending">⏳ Pending</option>
            <option value="Completed">✅ Completed</option>
          </select>
          {err?.status && <span className="text-red-500 text-sm mt-1">{err.status}</span>}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.03 }}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg shadow-lg transition duration-200"
        >
          Create Todo
        </motion.button>
      </form>
    </motion.div>
  );
};

export default HomePage;
