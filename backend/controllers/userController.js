// BACKEND: backend/controllers/userController.js
const User = require('../models/User');
const generateOtp = require('../utils/otpGenerator');
const sendMail = require('../utils/sendMail');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const otp = generateOtp();
    const user = await User.create({ name, email, password, otp });
    await sendMail(email, otp);

    res.status(201).json({ message: 'OTP sent to email', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user || user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({ message: 'Account verified' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email first' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};