const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Token not found. Please login.' });
    }




    
    // verify token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired. Please login again.' });
        }
        return res.status(401).json({ message: 'Invalid token. Please login.' });
      }

      // token valid
      req.userId = decoded.userId;
      req.role = decoded.role;
      next();
    });

  } catch (error) {
    console.error('Unexpected error in verifyToken middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = verifyToken;
