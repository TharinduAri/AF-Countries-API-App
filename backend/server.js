import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.js';
import cors from 'cors'; // Import CORS

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.use(cors({
  origin: [
    'http://localhost:3000',  // Your local frontend
    'https://af-countries-api-app.vercel.app/', // Your production frontend
    // Add any other domains that need access
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // If you're using cookies/sessions
}));
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
