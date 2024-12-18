const jwt = require('jsonwebtoken');

// jwt: Refers to the JSON Web Token (JWT) library. It is used to create and verify tokens, which are often used for authentication and authorization.


module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  //authHeader.split(' ')[1]: This retrieves the second part of the split string, which is the actual token.


  const token = authHeader && authHeader.split(' ')[1];

  //  The authorization header is typically where a client sends their authentication token (like a JWT) to prove their identity.

  //an authorization header is in the format Bearer <token>, where Bearer is the first part, and the token is the second part.


  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;

    //you are adding user information to the request so that other parts of the application can easily access it.
    next();
  });
};

// 