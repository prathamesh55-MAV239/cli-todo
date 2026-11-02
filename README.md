# Todo Web App

## Overview
A minimalistic Todo list web application built with:
- **Backend**: FastAPI (Python) exposing a REST API at `http://127.0.0.1:8000/tasks`.
- **Frontend**: React + Vite + Tailwind CSS running on `http://localhost:5173`.

The frontend proxies API calls (e.g., `/tasks`) to the FastAPI backend during development.

## Prerequisites
- Windows 10/11 with PowerShell.
- Node.js (v24 or later) and npm installed.
- Python 3.11+ and `pip`.

## Setup
```powershell
# Set execution policy for the session (required for npm scripts)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Install backend dependencies
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt

# Start backend (daemon)
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
Open a new PowerShell window for the frontend:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd ..\frontend
npm install
npm run dev```

## Usage
- Open **http://localhost:5173** in your browser.
- The UI lets you add, toggle, edit, and delete todo items.
- Data is persisted in `backend/tasks.json`.

## API Endpoints
- `GET /tasks` – list all tasks
- `POST /tasks` – create a task
- `PUT /tasks/{id}` – update a task
- `DELETE /tasks/{id}` – delete a task

## Stopping the App
- Press `Ctrl+C` in each PowerShell window to stop the backend and frontend servers.

## Git History
All changes are committed after each logical step. The latest commit (`1320b1d`) contains the complete, working application.
