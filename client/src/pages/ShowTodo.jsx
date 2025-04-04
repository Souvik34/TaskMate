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
        console.log("📦 Full Todo API Response:", data);
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

    // 🚫 Prevent updating if the status is unchanged
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
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">Todo Details</h1>
      {apiData?.todo ? (
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
            <input
              value={formData.title}
              onChange={handleInput}
              name="title"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Todo title"
              required
            />
            {err?.title && <span className="text-red-500 text-sm">{err.title}</span>}
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
            <textarea
              value={formData.description}
              onChange={handleInput}
              name="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Todo description..."
            ></textarea>
            {err?.description && <span className="text-red-500 text-sm">{err.description}</span>}
          </div>

          {/* Status */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">Status</label>
            <select
              onChange={handleInput}
              name="status"
              value={formData.status}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            {err?.status && <span className="text-red-500 text-sm">{err.status}</span>}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      ) : (
        <p className="text-gray-600">Data not found</p>
      )}
    </div>
  );
};

export default ShowTodo;
