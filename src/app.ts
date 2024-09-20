import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import hpp from 'hpp';
import debug from 'debug';

import { errorHandler } from './middlewares/error-handler';
import routes from './routes/index';
import { sanitizeXSS, sanitizeMongoDB } from './middlewares/sanitization';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize debug for different parts of the application
const dbDebug = debug('app:db');
const serverDebug = debug('app:server');

const app = express();

// Security middleware
app.use(helmet()); // Set security HTTP headers
app.use(cors()); // Enable CORS for all routes

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Parse JSON bodies (as sent by API clients)
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Parse Cookie header and populate req.cookies
app.use(cookieParser());

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  })
);

// Data sanitization against XSS
app.use(sanitizeXSS);

// Data sanitization against NoSQL query injection
app.use(sanitizeMongoDB);

// Prevent parameter pollution
app.use(hpp());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Routes
app.use('/api/v1', routes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    dbDebug('Connected to MongoDB');
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    dbDebug('MongoDB connection error:', err);
    console.log('MongoDB connection error:', err);
  });

export default app;
