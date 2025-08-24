// todo.routes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const auth = require('../middleware/auth.middleware');

// All todo routes require authentication
router.use(auth);

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
