import { getAllTodos, addTodo, toggleTodo, deleteTodo} from '../services/todoServices.js';

export async function listTodos(req, res, next) {
  try {
    const items = await getAllTodos();
    return res.status(200).json(items);
  } catch (err) { return next(err); }
}

export async function createTodo(req, res, next) {
  try {
    const item = await addTodo(req.body?.title);
    return res.status(201).json(item);
  } catch (err) {
    if (err?.code === 'TITLE_REQUIRED') return res.status(400).json({ error: 'title required' });
    if (err?.code === 'TITLE_TOO_LONG') return res.status(400).json({ error: 'title too long (max 100)' });
    return next(err);
  }
}

export async function patchToggle(req, res, next) {
  try {
    const item = await toggleTodo(req.params.id);
    return res.status(200).json(item);
  } catch (err) {
    if (err?.code === 'ID_REQUIRED') return res.status(400).json({ error: 'id required' });   // 400 = bad request (client sent wrong input)
    if (err?.code === 'NOT_FOUND')   return res.status(404).json({ error: 'todo not found' }); // 404 = id doesn’t exist
    return next(err); // unknown → global error handler (500/503)
  }
}


export async function deleteTodoItem(req, res, next) {
  try {
    const row = await deleteTodo(req.params.id);
    return res.status(200).json(row);
  } catch (err) {
    if (err?.code === 'ID_REQUIRED') return res.status(400).json({ error: 'id required' });   // 400 = bad request (client sent wrong input)
    if (err?.code === 'NOT_FOUND')   return res.status(404).json({ error: 'todo not found' }); // 404 = id doesn’t exist
    return next(err); // unknown → global error handler (500/503)
  }
}