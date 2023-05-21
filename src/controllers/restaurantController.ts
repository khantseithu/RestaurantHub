import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';

// Get all restaurants
const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error('Failed to get restaurants:', error);
    res.status(500).json({ error: 'Failed to get restaurants' });
  }
};

// Get a restaurant by ID
const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error('Failed to get restaurant:', error);
    res.status(500).json({ error: 'Failed to get restaurant' });
  }
};

// Create a new restaurant
const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, cuisine, rating } = req.body;
    const restaurant = new Restaurant({ name, cuisine, rating });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Failed to create restaurant:', error);
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
};

// Update a restaurant by ID
const updateRestaurantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, cuisine, rating } = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, cuisine, rating },
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error('Failed to update restaurant:', error);
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
};

// Delete a restaurant by ID
const deleteRestaurantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Failed to delete restaurant:', error);
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
};

export {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
};
