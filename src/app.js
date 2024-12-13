// Load environment variables
require('dotenv').config();

const express = require('express');
const pricingRoutes = require('./routes/pricingRoutes');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/pricing', pricingRoutes);

// Error Handling
app.use(errorHandler);

// Connect to Database
connectDB();

module.exports = app;
