from pydantic import BaseModel, Field
from typing import List, Optional
import json, os
from datetime import datetime

TASKS_FILE = os.path.join(os.path.dirname(__file__), "tasks.json")

class Task(BaseModel):
    id: int
    title: str
    done: bool = False
    priority: Optional[str] = "medium"
    due_date: Optional[str] = None
    created_at: Optional[str] = Field(default_factory=lambda: datetime.now().isoformat())

def load_tasks() -> List[Task]:
    if not os.path.exists(TASKS_FILE):
        return []
    with open(TASKS_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    return [Task(**item) for item in data]

def save_tasks(tasks: List[Task]):
    with open(TASKS_FILE, "w", encoding="utf-8") as f:
        json.dump([t.model_dump() if hasattr(t, "model_dump") else t.dict() for t in tasks], f, indent=2)
