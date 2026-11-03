# ⚡ TaskFlow — Smart, Minimalist & Modern Todo Web App

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/prathamesh55-MAV239/cli-todo?color=7c3aed&style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/prathamesh55-MAV239/cli-todo?color=06b6d4&style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

<p align="center">
  <b>A polished, responsive task manager built with FastAPI, React 18, and Vite.</b>
</p>

[✨ Live Features](#-key-features) • [🚀 Quick Start](#-quick-start) • [📡 API Documentation](#-api-endpoints) • [📁 Project Structure](#-project-structure)

---

</div>

## ✨ Key Features

- **🎨 Natural, Colorful Interface**: Warm paper tones, leafy greens, and coral accents create a calm, clear workspace.
- **📱 Responsive Task Cards**: Task cards adapt to mobile screens, with actions available on touch devices and subtle hover feedback on buttons.
- **✅ Clear Completion States**: Completed tasks use a softer green surface and a checked control, while the title is visibly crossed out.
- **⚡ Task Priorities**: Label tasks as 🟢 **Low**, 🟡 **Medium**, or 🔴 **High** priority with clear visual badges.
- **📅 Due Dates & Timestamps**: Set target completion dates with calendar pickers and track task creation times down to the minute.
- **✏️ Live Inline Editing**: Double-click or click the ✏️ icon on any task to edit the title on the fly (press `Enter` to save, `Esc` to cancel).
- **🔍 Instant Live Search**: Filter and search through your tasks instantaneously as you type.
- **🎯 Dynamic Filter Tabs**: Effortlessly switch views between **All**, **Active**, and **Completed** with live counter badges.
- **📊 Real-time Dashboard Stats**: Live counters for total tasks, pending tasks, and completed items.
- **🧹 One-Click Cleanup**: Remove all completed tasks with the **Clear Completed** button.
- **🔔 Interactive Toast Feedback**: Sleek slide-up toast notifications confirming all user actions.
- **💾 Automatic JSON Persistence**: All changes automatically synchronize with `backend/tasks.json` in real time.

---

## 📸 Overview & UI Preview

```text
┌─────────────────────────────────────────────────────────────────┐
│                           TaskFlow                              │
│             Stay organized, focused, and productive.            │
│                                                                 │
│         [ 5 Total ]       [ 3 Pending ]       [ 2 Done ]        │
├─────────────────────────────────────────────────────────────────┤
│ [ What needs to be done today?...               ]  [ + Add Task ]│
│ [ 🟡 Medium Priority ▾ ]  [ 📅 Due Date        ]                │
│                                                                 │
│  🔍 Search your tasks...                                        │
│  [ All (5) ]       [ Active (3) ]       [ Completed (2) ]       │
├─────────────────────────────────────────────────────────────────┤
│  ☑  Finish system design architecture     🔴 HIGH  📅 Tomorrow  │
│  ☐  Fix navbar animation bug              🟡 MED   📅 05 Nov    │
│  ☐  Code review PR #42                    🟢 LOW   🕒 10:30 AM  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
|---|---|---|
| **Frontend** | [React 18](https://react.dev/) | Component-driven declarative UI |
| **Tooling** | [Vite 5](https://vitejs.dev/) | Next-generation fast frontend bundler |
| **Styling** | Custom CSS | Responsive layouts, accessible focus states, DM Sans and Fraunces typography |
| **HTTP Client** | [Axios](https://axios-http.com/) | REST API requests & proxy routing |
| **Backend** | [FastAPI](https://fastapi.tiangolo.com/) | High-performance Python async web framework |
| **Server** | [Uvicorn](https://www.uvicorn.org/) | Lightning-fast ASGI web server |
| **Validation** | [Pydantic v2](https://docs.pydantic.dev/) | Strict data schema validation & modeling |
| **Storage** | JSON Engine | File-based lightweight persistent storage |

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/prathamesh55-MAV239/cli-todo.git
cd cli-todo
```

### 2. Start the Backend (FastAPI)
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
> The API server will be live at: `http://127.0.0.1:8000`  
> Interactive OpenAPI documentation available at: `http://127.0.0.1:8000/docs`

### 3. Start the Frontend (React + Vite)
Open a second terminal at the repository root:
```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```
> Open **`http://localhost:5173`** in your browser. Do not open `frontend/index.html` directly: the Vite server loads the React app and proxies `/tasks` requests to the backend.

Both servers must remain running while using the app. If task requests fail, confirm the backend is listening at `http://127.0.0.1:8000` and the frontend is running at `http://localhost:5173`.

---

## 📡 API Endpoints

FastAPI provides an automatic, interactive OpenAPI Swagger interface at `http://127.0.0.1:8000/docs`.

| Method | Endpoint | Description | Request Body Example |
|---|---|---|---|
| `GET` | `/tasks` | Retrieve all tasks | — |
| `POST` | `/tasks` | Create a new task | `{"id": 1, "title": "Buy groceries", "priority": "high", "due_date": "2026-11-05"}` |
| `PUT` | `/tasks/{id}` | Update title, priority, or status | `{"id": 1, "title": "Updated title", "done": true}` |
| `DELETE` | `/tasks/{id}` | Delete a task by ID | — |

---

## 📁 Project Structure

```bash
cli-todo/
├── LICENSE
├── README.md
├── backend/
│   ├── __init__.py
│   ├── main.py                   # FastAPI application & route declarations
│   ├── requirements.txt          # Python dependencies
│   ├── server.py                 # Standard-library HTTP server
│   ├── tasks.json                # Local task data
│   └── tasks.py                  # Pydantic model & JSON persistence
└── frontend/
    ├── index.html                # Vite HTML entry point
    ├── package.json              # React and Vite dependencies
    ├── postcss.config.cjs
    ├── tailwind.config.cjs
    ├── vite.config.js            # Dev server and API proxy
    └── src/
        ├── main.jsx
        ├── App.jsx               # Task dashboard and workflow
        ├── TaskItem.jsx          # Task card and controls
        └── index.css             # Responsive theme and component styles
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check out the [issues page](https://github.com/prathamesh55-MAV239/cli-todo/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Built with ❤️ using FastAPI and React</sub>
</div>
