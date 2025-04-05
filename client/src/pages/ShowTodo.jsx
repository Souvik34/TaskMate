import React, { useEffect, useState } from "react";
import axios from "axios";
import { ZodError } from "zod";
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";
import { useParams } from "react-router-dom";
import { todoSchema } from "../schemas/validationSchema";

const ShowTodo = () => {
  const { todoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [err, setError] = useState(null);

  const token = localStorage.getItem("token");

  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const getTodo = async () => {
      try {
        const { data } = await axios.get(`/todo/show/${todoId}`);
        setApiData(data);
        setFormData(data.todo);
      } catch (error) {
        showToast("error", error.response?.data?.message || "Failed to fetch todo");
      }
    };

    getTodo();
  }, [todoId]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      apiData?.todo?.status === formData.status &&
      apiData?.todo?.title === formData.title &&
      apiData?.todo?.description === formData.description
    ) {
      showToast("error", "No changes made. Please modify the fields before submitting.");
      return;
    }

    try {
      const validatedData = todoSchema.parse(formData);
      const { data } = await axios.put(`/todo/update/${todoId}`, validatedData);
      showToast("success", data.message);
    } catch (error) {
      if (error instanceof ZodError) {
        const getError = getZodError(error.errors);
        setError(getError);
      }
      showToast("error", error.response?.data?.message || "Failed to update todo");
    }
  };

  return (
    <div className="pt-6 pb-12 px-4 max-w-3xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 transition-all duration-300">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">📝 Todo Details</h1>

        {apiData?.todo ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
              <input
                value={formData.title}
                onChange={handleInput}
                name="title"
                type="text"
                className={`w-full px-4 py-2 rounded-lg border ${
                  err?.title ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200`}
                placeholder="Enter todo title"
              />
              {err?.title && <p className="text-red-500 text-sm mt-1">{err.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={handleInput}
                name="description"
                rows="4"
                className={`w-full px-4 py-2 rounded-lg border ${
                  err?.description ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200`}
                placeholder="Write your description here..."
              ></textarea>
              {err?.description && <p className="text-red-500 text-sm mt-1">{err.description}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                onChange={handleInput}
                name="status"
                value={formData.status}
                className={`w-full px-4 py-2 rounded-lg border ${
                  err?.status ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200`}
              >
                <option value="Pending">⏳ Pending</option>
                <option value="Completed">✅ Completed</option>
              </select>
              {err?.status && <p className="text-red-500 text-sm mt-1">{err.status}</p>}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-500 text-center mt-10">🚫 Todo data not found</p>
        )}
      </div>
    </div>
  );
};

export default ShowTodo;
