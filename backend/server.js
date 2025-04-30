import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  'https://af-countries-api-app.vercel.app',
  'http://af-countries-api-app.vercel.app',
  'https://af-countries-api-app-vercel.app',
  'https://af-countries-api-app-vercel.app:11',
  'https://af-countries-api-app.vercel.app:11',
  'http://localhost:5173',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.log(`Origin ${origin} not allowed by CORS`);
      callback(null, true); // Allow all origins in development
      // In production, you might want to use:
      // callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS before routes
app.use(cors());

// Enable pre-flight requests for all routes
// app.options('*', cors(corsOptions));

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});