import mongoose from 'mongoose';

interface IRestaurant extends mongoose.Document {
  name: string;
  cuisine: string;
  rating: number;
}

const restaurantSchema = new mongoose.Schema<IRestaurant>({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);

export default Restaurant;
