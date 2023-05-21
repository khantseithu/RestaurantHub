import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
} from '../controllers/restaurantController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/restaurants', getAllRestaurants);
router.get('/restaurants/:id', getRestaurantById);

// Protected routes (require authentication)
router.post('/restaurants', authMiddleware, createRestaurant);
router.put('/restaurants/:id', authMiddleware, updateRestaurantById);
router.delete('/restaurants/:id', authMiddleware, deleteRestaurantById);

export default router;
