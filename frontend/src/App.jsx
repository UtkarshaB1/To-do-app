import { useEffect, useState } from 'react';
import './styles.css';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import { listTodos, createTodo, toggleTodo, deleteTodo } from './api/todos.js';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await listTodos();
        setTodos(data);
      } catch (e) {
        setLoadError(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAdd(title) {
    const created = await createTodo(title);
    setTodos(prev => [created, ...prev]);
  }

  async function handleToggle(id) {
    const updated = await toggleTodo(id);
    setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  }

  async function handleDelete(id) {
  // optimistic: remove immediately, rollback on failure
    const prev = todos;
    setTodos(prev => prev.filter(t => t.id !== id));
    try {
      await deleteTodo(id); 
    } catch (e) {
      setTodos(prev); // rollback
    }
  }


  return (
    <div className="container">
      <header className="header"><h1>To-do List</h1></header>

      {loading && <p className="muted">Loading…</p>}
      {loadError && <p className="error">{loadError}</p>}

      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete}/>
    </div>
  );
}
