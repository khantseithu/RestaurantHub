import { Request, Response } from 'express';
import User from '../models/User';

// User registration
const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Failed to register user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// User login
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    res.json({ token });
  } catch (error) {
    console.error('Failed to login user:', error);
    res.status(500).json({ error: 'Failed to login user' });
  }
};

export { registerUser, loginUser };
