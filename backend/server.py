import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
from datetime import datetime

TASKS_FILE = os.path.join(os.path.dirname(__file__), "tasks.json")

def load_tasks():
    if not os.path.exists(TASKS_FILE):
        return []
    with open(TASKS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_tasks(tasks):
    with open(TASKS_FILE, "w", encoding="utf-8") as f:
        json.dump(tasks, f, indent=2)

class TodoHandler(BaseHTTPRequestHandler):
    def _serve_file(self, filepath, content_type="text/html"):
        try:
            with open(filepath, "rb") as f:
                data = f.read()
            self._set_headers(200, content_type)
            self.wfile.write(data)
        except FileNotFoundError:
            self._set_headers(404)
            self.wfile.write(b"{\"detail\": \"File not found\"}")

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/tasks":
            tasks = load_tasks()
            self._set_headers()
            self.wfile.write(json.dumps(tasks).encode())
        elif parsed.path == "/" or parsed.path == "":
            # Serve simple UI page
            self._serve_file(os.path.join(os.path.dirname(__file__), "index.html"))
        else:
            # Try to serve static file relative to this directory
            file_path = os.path.join(os.path.dirname(__file__), parsed.path.lstrip("/"))
            if os.path.isfile(file_path):
                # Guess content type based on extension
                ext = os.path.splitext(file_path)[1].lower()
                ct = "text/plain"
                if ext == ".js":
                    ct = "application/javascript"
                elif ext == ".css":
                    ct = "text/css"
                elif ext == ".html":
                    ct = "text/html"
                self._serve_file(file_path, ct)
            else:
                self._set_headers(404)
                self.wfile.write(b"{\"detail\": \"Not found\"}")
    def _set_headers(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-type", content_type)
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/tasks":
            tasks = load_tasks()
            self._set_headers()
            self.wfile.write(json.dumps(tasks).encode())
        else:
            self._set_headers(404)
            self.wfile.write(b"{\"detail\": \"Not found\"}")

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/tasks":
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            task = json.loads(body)
            tasks = load_tasks()
            # ensure unique id
            if any(t["id"] == task["id"] for t in tasks):
                self._set_headers(400)
                self.wfile.write(b"{\"detail\": \"Task ID already exists\"}")
                return
            tasks.append(task)
            save_tasks(tasks)
            self._set_headers(201)
            self.wfile.write(json.dumps(task).encode())
        else:
            self._set_headers(404)
            self.wfile.write(b"{\"detail\": \"Not found\"}")

    def do_PUT(self):
        parsed = urlparse(self.path)
        parts = parsed.path.strip("/").split("/")
        if len(parts) == 2 and parts[0] == "tasks":
            task_id = int(parts[1])
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            updated = json.loads(body)
            tasks = load_tasks()
            for i, t in enumerate(tasks):
                if t["id"] == task_id:
                    tasks[i] = updated
                    save_tasks(tasks)
                    self._set_headers()
                    self.wfile.write(json.dumps(updated).encode())
                    return
            self._set_headers(404)
            self.wfile.write(b"{\"detail\": \"Task not found\"}")
        else:
            self._set_headers(404)
            self.wfile.write(b"{\"detail\": \"Not found\"}")

    def do_DELETE(self):
        parsed = urlparse(self.path)
        parts = parsed.path.strip("/").split("/")
        if len(parts) == 2 and parts[0] == "tasks":
            task_id = int(parts[1])
            tasks = load_tasks()
            new_tasks = [t for t in tasks if t["id"] != task_id]
            if len(new_tasks) == len(tasks):
                self._set_headers(404)
                self.wfile.write(b"{\"detail\": \"Task not found\"}")
                return
            save_tasks(new_tasks)
            self._set_headers(200)
            self.wfile.write(b"{\"detail\": \"Task deleted\"}")
        else:
            self._set_headers(404)
            self.wfile.write(b"{\"detail\": \"Not found\"}")

if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", 8000), TodoHandler)
    print("Starting server on http://0.0.0.0:8000")
    server.serve_forever()
