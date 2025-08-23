const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
// const todoRoutes = require('./src/routes/todoRoutes');
const todoRoutes= require('./src/routes/todo.routes');



// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse incoming JSON data

 //Routes
 app.use('/api/todos', todoRoutes);

// Root endpoint (for testing)
// app.get('/', (req, res) => {
//   res.send('✅ To-Do List Backend is running...');
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
