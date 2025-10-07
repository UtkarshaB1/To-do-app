// Why this file: centralize fetch logic & error handling
export async function listTodos() {
  const res = await fetch('/api/todos'); // Vite proxy forwards to backend
  if (!res.ok) throw new Error('Failed to load todos');
  return res.json(); // [{id,title,completed,created_at}, ...]
}

export async function createTodo(title) {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ title }), // backend expects {title}
  });

  if (res.status === 400) {
    const body = await res.json();      // e.g., { error: 'title required' }
    throw new Error(body.error || 'Bad request');
  }
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json(); // created row from DB (includes created_at)
}

export async function toggleTodo(id) {
  const res = await fetch(`/api/todos/${id}/toggle`, { method: 'PATCH' });
  if (res.status === 404) throw new Error('Not found');
  if (!res.ok) throw new Error('Failed to toggle');
  return res.json();                       // updated row { id, title, completed, created_at }
}

export async function deleteTodo(id) {
  const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  if (res.status === 404) throw new Error('Not found');
  if (!res.ok) throw new Error('Failed to delete');
  return res.json(); // deleted row (contains the id)
}