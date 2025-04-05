import React, { useEffect, useState } from 'react';
import Badge from './Badge';
import { Link } from 'react-router-dom';

const Todo = ({ props, onDelete }) => {
  const [badgecolor, setBadgecolor] = useState('');

  useEffect(() => {
    if (props.status === 'Pending') {
      setBadgecolor('blue');
    } else if (props.status === 'Completed') {
      setBadgecolor('green');
    }
  }, [props.status]);

  const handleDelete = async () => {
    await onDelete(props._id);
  };

  const formattedDate = props.createdAt
    ? new Date(props.createdAt).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
    : 'Date not available';

  const isCompleted = props.status === 'Completed';

  return (
    <div className="border p-3 rounded-md mb-5">
      <h3 className="text-lg font-semibold flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Green Square Checkbox Icon for Completed */}
          {isCompleted && (
            <div className="w-6 h-6 bg-green-600 text-white flex items-center justify-center rounded-sm">
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
          <span className={`${isCompleted ? 'line-through text-gray-500' : ''}`}>
            {props.title}
          </span>
        </div>
        <Badge props={{ color: badgecolor, text: props.status }} />
      </h3>

      <p className={`text-sm mb-2 ${isCompleted ? 'line-through text-gray-400' : 'text-gray-500'}`}>
        🗓️ {formattedDate}
      </p>

      <p className={`line-clamp-2 mb-3 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
        {props.description}
      </p>

      <div className="flex gap-5 items-center">
        <Link
          to={`/dashboard/show-todo/${props._id}`}
          className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm text-center inline-flex items-center p-2"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16.862 3.487a2.06 2.06 0 0 1 2.915 2.915L7.5 18.679 3 20l1.321-4.5 12.541-12.013Z"
            />
          </svg>
        </Link>


        <button
          onClick={handleDelete}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center inline-flex items-center p-2"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Todo;
