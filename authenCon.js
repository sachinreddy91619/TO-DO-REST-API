const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// handles the user registration
exports.registerUser = async (req, res) => {
  // exports.registerUser: This makes the registerUser function available to be used in other parts of the application.

  // req represents the request from the client (including data like username and password)



  const { username, password } = req.body;

  // req.body: This contains the data sent by the client (like username and password).


  try {
    const user = new User({ username, password });
    // This creates a new user object using the User model, setting the username and password fields based on the client input.

    await user.save();
    //This makes sure the code waits for the user.save() operation to complete before moving on. user.save() saves the new user to the database.

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// // handles the login requests.

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // // req.body: This contains the data sent by the client (like username and password).


  try {
    const user = await User.findOne({ username });
    // User.findOne({ username }): Searches the database for a user with the given username.

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);


    // bcrypt.compare: A function from the bcrypt library that compares password which is a plain-text password provided by the user. and the user.password is The hashed password stored in the database.
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


    // here jwt.sign is a function from the jsonwebtoken library that creates a JWT. ANd id: user._id is the payload, which includes the user's unique ID.
// process.env.JWT_SECRET is the secret key used to sign the token (from environment variables for security).

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
