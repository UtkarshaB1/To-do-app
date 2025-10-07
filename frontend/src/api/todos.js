const BASE = import.meta.env.VITE_API_BASE || ''; // dev: '', prod: Render URL

export async function listTodos() {
  const r = await fetch(`${BASE}/todos`);
  if (!r.ok) throw new Error('Failed to load todos');
  return r.json();
}

export async function createTodo(title) {
  const r = await fetch(`${BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!r.ok) throw new Error('Failed to create');
  return r.json();
}

export async function toggleTodo(id) {
  const r = await fetch(`${BASE}/todos/${id}/toggle`, { method: 'PATCH' });
  if (!r.ok) throw new Error('Failed to toggle');
  return r.json();
}