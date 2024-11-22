const express = require('express');
const router = express.Router();
const screenshotController = require('../controllers/screenshot.controller');
const cacheMiddleware = require('../middleware/cache.middleware');

router.get('/', cacheMiddleware, screenshotController.captureCustomUrl);
router.get('/soil', cacheMiddleware, screenshotController.captureSoil);
router.get('/weather', cacheMiddleware, screenshotController.captureWeather);

module.exports = router;