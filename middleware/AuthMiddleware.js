const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

module.exports = {
  async authenticate(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Access denied: No token provided' });
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },
};
