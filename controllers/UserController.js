const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../data/users'); // In-memory data store
const { secretKey } = require('../config'); // Secret key for JWT

module.exports = {
  async register(req, res) {
    try {
      const { username, password } = req.body;

      // Check if the username is already taken
      if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user and store it in the in-memory data store
      const newUser = {
        username,
        password: hashedPassword,
        preferences: [], // Initialize with empty preferences
      };

      users.push(newUser);

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = users.find(user => user.username === username);

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  },

  async getPreferences(req, res) {
    try {
      const user = req.user; // User object obtained from authentication middleware

      return res.status(200).json({ preferences: user.preferences });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  },

  async updatePreferences(req, res) {
    try {
      const user = req.user; // User object obtained from authentication middleware
      const newPreferences = req.body.preferences || [];

      user.preferences = newPreferences;

      return res.status(200).json({ message: 'Preferences updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  },
};
