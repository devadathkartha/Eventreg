const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');

// User Registration
const registerUser = async (req, res) => {
  const { username, password, rollNo, role, adminPassword } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔥 Check if admin password is correct
    let userRole = 'user'; // Default to "user"
    if (role === 'admin') {
      if (adminPassword !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: 'Invalid admin password' });
      }
      userRole = 'admin'; // Set role to admin if correct admin password is provided
    }

    // Create the user
    const user = await User.create({
      username,
      password: hashedPassword,
      rollNo,
      role: userRole
    });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(201).json({
        message: 'User registered successfully!',
        token,
        user: { id: user._id, username: user.username, role: user.role }
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
