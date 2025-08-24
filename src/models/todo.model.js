// todo.model.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['todo', 'inprogress', 'review', 'completed'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['lowest', 'low', 'medium', 'high', 'highest'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);
