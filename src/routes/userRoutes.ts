import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: string;
}


const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Protected route to get user profile
router.get('/profile', authMiddleware, (req: AuthenticatedRequest, res) => {
  // Access the authenticated user ID from req.user
  const userId = req.user;
  // Retrieve user profile information based on the user ID
  // ...
  res.json({ userId });
});

export default router;
