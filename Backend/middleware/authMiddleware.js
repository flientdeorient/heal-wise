const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from header
  let token = req.header('Authorization');

  // Check for token
  if (!token) {
    return res.status(401).json({ message: 'No token, access denied' });
  }

  try {
    // If token includes "Bearer ", remove it for verification
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecret");
    
    // Attach the entire decoded payload (which is { id, role }) to req.user
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
