import express from 'express';
import { listTodos, createTodo, patchToggle, deleteTodoItem } from '../controllers/todoController.js';

const router = express.Router();
//get all todos
router.get('/', listTodos);

//add a new todo
router.post('/', createTodo);

router.patch('/:id/toggle', patchToggle);

router.delete('/:id', deleteTodoItem);

export default router;