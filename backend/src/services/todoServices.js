import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import * as repo from '../db/todoRepo.js';
import { pool } from '../db/index.js';
//create a list to keep note of all todos


let nextId = 1;

//function to get all todos
export const getAllTodos = async () => {
    //return await repo.getAll(pool);
    return await repo.getAll(pool);
};

//function to add a new todo

export async function addTodo(title) {
  // 1) normalize
  const clean = String(title ?? '').trim();

  // 2) domain rules
  if (!clean) throw { code: 'TITLE_REQUIRED' };
  if (clean.length > 100) throw { code: 'TITLE_TOO_LONG' };

  // 3) build the new todo (UUID, not nextId++)
  const newTodo = { id: randomUUID(), title: clean, completed: false };

  // 4) write to DB and return the DB row (includes created_at)
  const inserted = await repo.insert(pool, newTodo);
  return inserted;
}


export async function toggleTodo(id) {
  const clean = String(id ?? '').trim();
  if (!clean) throw { code: 'ID_REQUIRED' };          // domain error (simple words: missing id)

  const updated = await repo.toggle(pool, clean);
  if (!updated) throw { code: 'NOT_FOUND' };          // no todo with that id
  return updated; // { id, title, completed, created_at }
}


export async function deleteTodo(id) {
  const clean_id = String(id ?? '').trim();
  if (!clean_id) throw { code: 'ID_REQUIRED' }; 

  const updated = await repo.remove(pool, clean_id);
  if (!updated) throw { code: 'NOT_FOUND' };          // no todo with that id
  return updated; // { id, title, completed, created_at }
}
