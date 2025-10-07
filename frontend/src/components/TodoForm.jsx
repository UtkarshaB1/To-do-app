import { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const trimmed = title.trim();
    if (!trimmed) { setError('Title required'); return; }

    try {
      setBusy(true);
      await onAdd(trimmed);
      setTitle('');
    } catch (err) {
      setError(err.message || 'Failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="title" className="label">New to-do</label>
      <input
        id="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add to-do here"
        className="input"
        type="text"
      />
      <button type="submit" className="btn" disabled={busy}>Add</button>
      {error && <span className="error">{error}</span>}
    </form>
  );
}