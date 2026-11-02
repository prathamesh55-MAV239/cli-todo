// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTitle.trim()) return;
    // Determine next id based on current tasks
    const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const task = { id: nextId, title: newTitle, done: false };
    await axios.post("/tasks", task);
    setNewTitle("");
    fetchTasks();
  };

  const toggleDone = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const updated = { ...task, done: !task.done };
    await axios.put(`/tasks/${id}`, updated);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Todo List</h1>
      <div className="flex mb-4">
        <input
          className="flex-1 border rounded px-2 py-1 mr-2"
          placeholder="New task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button
          className="bg-indigo-500 text-white px-4 py-1 rounded"
          onClick={addTask}
        >Add</button>
      </div>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={() => toggleDone(t.id)}
            onDelete={() => deleteTask(t.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

