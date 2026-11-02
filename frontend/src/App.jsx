// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 2800);
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      showToast("Error loading tasks", "error");
    }
  };

  const addTask = async (e) => {
    if (e) e.preventDefault();
    if (!newTitle.trim()) return;

    const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id || 0)) + 1 : 1;
    const newTask = {
      id: nextId,
      title: newTitle.trim(),
      done: false,
      priority: priority,
      due_date: dueDate || null,
      created_at: new Date().toISOString(),
    };

    try {
      await axios.post("/tasks", newTask);
      setNewTitle("");
      setDueDate("");
      fetchTasks();
      showToast("Task added successfully! 🎉");
    } catch (err) {
      console.error(err);
      showToast("Failed to create task", "error");
    }
  };

  const toggleDone = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = { ...task, done: !task.done };
    try {
      await axios.put(`/tasks/${id}`, updated);
      fetchTasks();
      showToast(updated.done ? "Completed! Awesome job! ⭐" : "Marked active");
    } catch (err) {
      console.error(err);
      showToast("Failed to update status", "error");
    }
  };

  const editTask = async (id, newTitleText) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = { ...task, title: newTitleText };
    try {
      await axios.put(`/tasks/${id}`, updated);
      fetchTasks();
      showToast("Task updated! ✏️");
    } catch (err) {
      console.error(err);
      showToast("Failed to edit task", "error");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      fetchTasks();
      showToast("Task deleted! 🗑️");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete task", "error");
    }
  };

  const clearCompleted = async () => {
    const completedTasks = tasks.filter((t) => t.done);
    if (completedTasks.length === 0) return;
    try {
      await Promise.all(completedTasks.map((t) => axios.delete(`/tasks/${t.id}`)));
      fetchTasks();
      showToast("Cleared all completed tasks!");
    } catch (err) {
      console.error(err);
      showToast("Failed to clear completed", "error");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.done).length;
  const pendingCount = totalCount - completedCount;

  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "active") return !t.done;
      if (filter === "completed") return t.done;
      return true;
    })
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app">
      <header className="header">
        <h1>TaskFlow</h1>
        <p>Stay organized, focused, and productive.</p>
        <div className="task-stats">
          <div className="stat">
            <div className="stat-number">{totalCount}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat">
            <div className="stat-number" style={{ color: "#38bdf8" }}>{pendingCount}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat">
            <div className="stat-number" style={{ color: "#4ade80" }}>{completedCount}</div>
            <div className="stat-label">Done</div>
          </div>
        </div>
      </header>

      {/* Add Task Form */}
      <form onSubmit={addTask}>
        <div className="add-form">
          <input
            className="add-input"
            placeholder="What needs to be done today?..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit" className="add-btn">
            + Add Task
          </button>
        </div>

        <div className="options-row">
          <select
            className="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
          <input
            type="date"
            className="due-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            title="Set Due Date"
          />
        </div>
      </form>

      {/* Search & Filter Tabs */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search your tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({totalCount})
        </button>
        <button
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active ({pendingCount})
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✨</div>
          <div className="empty-title">
            {search ? "No matching tasks found" : filter === "completed" ? "No completed tasks yet" : "All caught up!"}
          </div>
          <div className="empty-text">
            {search ? "Try searching for a different keyword." : "Add a new task above to get started."}
          </div>
        </div>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onToggle={() => toggleDone(t.id)}
              onDelete={() => deleteTask(t.id)}
              onEdit={editTask}
            />
          ))}
        </ul>
      )}

      {/* Footer bar */}
      {totalCount > 0 && (
        <div className="footer-bar">
          <span className="footer-text">
            {completedCount} of {totalCount} tasks completed
          </span>
          {completedCount > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
              Clear Completed
            </button>
          )}
        </div>
      )}

      {/* Toast Notification */}
      <div className={`toast ${toast.show ? "show" : ""} ${toast.type === "error" ? "error" : ""}`}>
        {toast.message}
      </div>
    </div>
  );
}

export default App;
