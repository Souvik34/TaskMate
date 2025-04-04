import axios from "axios";
import React, { useState } from "react";
import { z, ZodError } from "zod";
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";

const HomePage = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [err, setError] = useState();

  const todoSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
    description: z.string().min(3, { message: "Description must be at least 3 characters long." }).max(500, { message: "Length exceeded." }),
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = todoSchema.parse(formData);
      const token = localStorage.getItem("token"); // Ensure token is sent

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/todo/create`,
        validatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      setFormData({ title: "", description: "" });
      showToast("success", response.data.message);
    } catch (error) {
      if (error instanceof ZodError) {
        setError(getZodError(error.errors));
      } else {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        showToast("error", errorMessage);
      }
    }
  };

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
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
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
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
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
