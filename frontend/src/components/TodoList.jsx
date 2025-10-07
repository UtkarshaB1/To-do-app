export default function TodoList({ todos = [], onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map(t => (
        <li key={t.id} className="todo-item">
          <label className="todo-row">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => onToggle?.(t.id)}
            />
            <span className={`title ${t.completed ? 'done' : ''}`}>{t.title}</span>
          </label>

          {/* delete button on the right */}
          <button
            className="icon-btn danger"
            aria-label="Delete todo"
            onClick={() => onDelete?.(t.id)}
            title="Delete"
          >
            {/* lightweight SVG trash icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18M9 6v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </li>
      ))}
      {todos.length === 0 && <li className="muted">No todos yet</li>}
    </ul>
  );
}