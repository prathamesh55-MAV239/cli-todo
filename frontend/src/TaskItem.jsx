// src/TaskItem.jsx
import React, { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(task.id, editText.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditText(task.title);
      setIsEditing(false);
    }
  };

  const priorityClass =
    task.priority === "high"
      ? "priority-high"
      : task.priority === "low"
      ? "priority-low"
      : "priority-medium";

  return (
    <li className="task-item">
      {isEditing ? (
        <div style={{ display: "flex", gap: "8px", width: "100%", alignItems: "center" }}>
          <input
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={() => { setEditText(task.title); setIsEditing(false); }}>Cancel</button>
        </div>
      ) : (
        <>
          <div
            className={`checkbox ${task.done ? "checked" : ""}`}
            onClick={onToggle}
            title={task.done ? "Mark as active" : "Mark as completed"}
          />
          <div className="task-content">
            <div className={`task-title ${task.done ? "done" : ""}`} onClick={onToggle} style={{ cursor: "pointer" }}>
              {task.title}
            </div>
            <div className="task-meta">
              {task.priority && (
                <span className={`priority-badge ${priorityClass}`}>
                  {task.priority}
                </span>
              )}
              {task.due_date && (
                <span className="due-date">
                  📅 {task.due_date}
                </span>
              )}
              {task.created_at && (
                <span className="due-date">
                  🕒 {new Date(task.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </div>
          <div className="task-actions">
            <button
              className="action-btn edit-btn"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              ✏️
            </button>
            <button
              className="action-btn delete-btn"
              onClick={onDelete}
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
