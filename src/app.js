const express = require('express');
const rateLimiter = require('./middleware/rateLimiter.middleware');
const screenshotRoutes = require('./routes/screenshot.routes');
const browserService = require('./services/browser.service');

const app = express();

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

module.exports = app;