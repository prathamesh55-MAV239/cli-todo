// src/TaskItem.jsx
import React from "react";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between p-2 border rounded bg-gray-50">
      <span
        className={`flex-1 cursor-pointer ${task.done ? "line-through text-gray-400" : ""}`}
        onClick={onToggle}
      >
        {task.title}
      </span>
      <button
        className="ml-2 text-sm text-red-500 hover:underline"
        onClick={onDelete}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;

