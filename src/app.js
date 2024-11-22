const express = require('express');
const { requestLogger } = require('./config/logger.config');
const errorHandler = require('./middleware/error.middleware');
const rateLimiter = require('./middleware/rateLimiter.middleware');
const screenshotRoutes = require('./routes/screenshot.routes');
const browserService = require('./services/browser.service');

const app = express();

// Add request logging middleware
app.use(requestLogger);

// Apply rate limiting to all routes
app.use(rateLimiter);

// Routes
app.use('/', screenshotRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Error handling middleware should be last
app.use(errorHandler);

module.exports = app;