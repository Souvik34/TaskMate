import React, { useEffect, useState } from "react";
import Badge from "./Badge";
import { Link } from "react-router-dom";

const Todo = ({ props, onDelete }) => {
  const [badgecolor, setBadgecolor] = useState("");

  useEffect(() => {
    if (props.status === "Pending") {
      setBadgecolor("yellow"); 
    } else if (props.status === "Completed") {
      setBadgecolor("green");
    }
  }, [props.status]);

  const handleDelete = async () => {
    await onDelete(props._id);
  };

  const formattedDate = props.createdAt
    ? new Date(props.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Date not available";

  const isCompleted = props.status === "Completed";

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition duration-300 p-5 space-y-3">
      {/* Title Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {isCompleted && (
            <div className="w-6 h-6 bg-green-600 text-white flex items-center justify-center rounded-sm shadow">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          <span
            className={`text-lg font-semibold ${
              isCompleted ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {props.title}
          </span>
        </div>
        <Badge props={{ color: badgecolor, text: props.status }} />
      </div>

      {/* Date */}
      <p
        className={`text-sm ${
          isCompleted ? "text-gray-400 line-through" : "text-gray-500"
        }`}
      >
        🗓️ {formattedDate}
      </p>

      {/* Description */}
      <p
        className={`text-sm line-clamp-2 ${
          isCompleted ? "line-through text-gray-400" : "text-gray-700"
        }`}
      >
        {props.description}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-2">
        <Link
          to={`/dashboard/show-todo/${props._id}`}
          className="flex items-center gap-2 text-sm font-medium bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a2.06 2.06 0 0 1 2.915 2.915L7.5 18.679 3 20l1.321-4.5 12.541-12.013Z"
            />
          </svg>
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
