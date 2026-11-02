# Todo Web App

A minimalistic full‑stack todo list application.

- **Backend**: FastAPI (Python) exposing CRUD endpoints, persisting tasks to a JSON file.
- **Frontend**: React + Vite with Tailwind CSS for a clean, colorful UI.
- **Run locally**:
  ```
  # Backend
  cd backend && pip install -r requirements.txt
  uvicorn main:app --reload

  # Frontend
  cd ../frontend && npm install && npm run dev
  ```

The repository follows a strict commit‑per‑feature workflow as requested.
