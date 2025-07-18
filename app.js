/**
 * Express application configuration
 */

// Import dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

// Initialize Express app
const app = express();

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Apply routes
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

module.exports = app;