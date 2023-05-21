import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: string;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Get the token from the request headers
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string } | null | undefined;

    if (!decoded || !decoded._id) {
    throw new Error('Invalid token');
    }
    
    req.user = decoded._id;

    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    res.status(401).json({ error: 'Access denied. Invalid token' });
  }
};

export default authMiddleware;
