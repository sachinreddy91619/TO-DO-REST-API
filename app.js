

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const curdRoutes = require('./routes/curdRoutes');

require('dotenv').config(); // Load environment variables where we Store secrets (e.g., API keys, database URIs) in environment variables

const app = express();


// Middleware
app.use(express.json());
//t acts as a middleware that takes the incoming JSON data in the request body and parses it into a JavaScript object, so you can easily access and work with it in your routes. Without this, the server wouldn't know how to handle JSON data.


// Database connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
///api/auth: This is the base URL for the authentication-related endpoints (e.g., login, register). Any requests starting with /api/auth will be handled by the authRoutes module.



app.use('/api/todos', curdRoutes);
// /api/todos: This is the base URL for to-do-related endpoints (e.g., create, delete, edit a to-do). Any requests starting with /api/todos will be handled by the curdRoutes module.



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// here in err.stack 
// It contains a string representation of the stack trace.
// The stack trace shows the sequence of function calls that led to the error, including the file names and line numbers.



// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
