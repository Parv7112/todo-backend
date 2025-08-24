// todo.controller.js
const Todo = require('../models/todo.model');

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const todoData = {
      ...req.body,
      user: req.user.userId
    };
    
    // Convert dueDate string to Date object if provided
    if (todoData.dueDate) {
      todoData.dueDate = new Date(todoData.dueDate);
    }
    
    const todo = await Todo.create(todoData);
    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all todos for the authenticated user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId }).populate('user', 'username email');
    res.json({ success: true, data: todos });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single todo by ID (user-specific)
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.userId
    }).populate('user', 'username email');
    
    if (!todo) return res.status(404).json({ success: false, error: 'Todo not found' });
    res.json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update todo by ID (user-specific)
exports.updateTodo = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Convert dueDate string to Date object if provided
    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }
    
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      updateData,
      { new: true }
    ).populate('user', 'username email');
    
    if (!todo) return res.status(404).json({ success: false, error: 'Todo not found' });
    res.json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete todo by ID (user-specific)
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });
    
    if (!todo) return res.status(404).json({ success: false, error: 'Todo not found' });
    res.json({ success: true, message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
