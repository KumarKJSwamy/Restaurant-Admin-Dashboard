const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
// const connectDB = require('../db/config');
const Category = require('./models/category.model');
const runSeed = require('./seed');
const orderRoutes = require('./routes/order');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Import routes
const authRoutes = require('./routes/auth.routes');
const menuRoutes = require('./routes/menu.routes');
const categoryRoutes = require('./routes/category.routes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// CONNECTION_URL = mongodb+srv://kumar_01:Prash_123@cluster0.mmowh7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// Seed endpoint
app.get('/api/seed', async (req, res) => {
  try {
    const result = await runSeed();
    res.json({ success: true, message: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// MongoDB connection with fallback URI and options
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

//check if the database is connected
app.get('/api/db-uri', (req, res) => {
  res.json({ uri: MONGODB_URI, url: process.env.CONNECTION_URL });
});

// MongoDB connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Connect to MongoDB
mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`MongoDB URI: ${MONGODB_URI}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Please make sure MongoDB is installed and running locally');
    process.exit(1);
  }); 




app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    console.log('Categories:', categories);
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});