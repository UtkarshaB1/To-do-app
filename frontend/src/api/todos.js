// src/api/todos.js
// Centralize API base + error handling.
// DEV: leave VITE_API_BASE empty and use Vite proxy (/api -> backend).
// PROD: set VITE_API_BASE to your backend URL (e.g., https://your-backend.onrender.com)

const BASE = import.meta.env.VITE_API_BASE || ''; // '' -> use proxy in dev
const API = (path) => `${BASE}${path}`;

// If you use cookie-based auth later, add:  { credentials: 'include' }
async function handle(res, msg) {
  if (!res.ok) {
    let detail = '';
    try { const body = await res.json(); detail = body?.error || ''; } catch {}
    throw new Error(detail || msg || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function listTodos() {
  const res = await fetch(API('/todos'));
  return handle(res, 'Failed to load todos');
}

export async function createTodo(title) {
  const res = await fetch(API('/todos'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  // Special-case 400 to surface validation nicely
  if (res.status === 400) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || 'Bad request');
  }
  return handle(res, 'Failed to create todo'); // returns created row
}

export async function toggleTodo(id) {
  const res = await fetch(API(`/todos/${id}/toggle`), { method: 'PATCH' });
  if (res.status === 404) throw new Error('Not found');
  return handle(res, 'Failed to toggle');
}

export async function deleteTodo(id) {
  const res = await fetch(API(`/todos/${id}`), { method: 'DELETE' });
  if (res.status === 404) throw new Error('Not found');
  return handle(res, 'Failed to delete');
}