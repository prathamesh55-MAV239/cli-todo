from fastapi import FastAPI, HTTPException
from typing import List
from .tasks import Task, load_tasks, save_tasks

app = FastAPI()

@app.get("/tasks", response_model=List[Task])
def get_tasks():
    return load_tasks()

@app.post("/tasks", response_model=Task)
def add_task(task: Task):
    tasks = load_tasks()
    # Ensure unique ID
    if any(t.id == task.id for t in tasks):
        raise HTTPException(status_code=400, detail="Task ID already exists")
    tasks.append(task)
    save_tasks(tasks)
    return task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, updated: Task):
    tasks = load_tasks()
    for i, t in enumerate(tasks):
        if t.id == task_id:
            tasks[i] = updated
            save_tasks(tasks)
            return updated
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    tasks = load_tasks()
    new_tasks = [t for t in tasks if t.id != task_id]
    if len(new_tasks) == len(tasks):
        raise HTTPException(status_code=404, detail="Task not found")
    save_tasks(new_tasks)
    return {"detail": "Task deleted"}
