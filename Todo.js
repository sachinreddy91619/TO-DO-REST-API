const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  state: { type: String, enum: ['completed', 'incomplete'], default: 'incomplete' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Todo', TodoSchema);

// enum: This restricts the value to only two options: 'completed' or 'incomplete'.
// Default: If you don’t specify a value, it will automatically be 'incomplete'.

// Type: mongoose.Schema.Types.ObjectId (a special type used for MongoDB IDs).

//ref: 'User': This tells Mongoose that userId refers to the User collection in the database. It’s like saying, "This to-do belongs to a specific user."
