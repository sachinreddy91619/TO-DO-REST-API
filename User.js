const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save hook for hashing passwords
UserSchema.pre('save', async function (next) {
  
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  //The hashed password is saved into the this.password field.
  // This.password refers to the password field in the current user document.

  next();
});

module.exports = mongoose.model('User', UserSchema);

// bcrypt: This is another library, used to hash and encrypt passwords. Hashing is the process of turning the actual password into a secret string of characters that can't be easily reversed.


// Salt is a random value added to the password before hashing to ensure that even if two users have the same password, their hashed values will be different.
