import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import restaurantRoutes from './routes/restaurantRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = 3000;

// Parse JSON body
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Restaurant routes
app.use('/api', restaurantRoutes);

// User routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
