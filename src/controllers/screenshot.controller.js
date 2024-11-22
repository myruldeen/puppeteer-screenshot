const screenshotService = require('../services/screenshot.service');
const config = require('../config');

class ScreenshotController {
  async captureCustomUrl(req, res) {
    const url = req.query.url;
    
    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }

    try {
      new URL(url); // Validate URL
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
      const image = await screenshotService.captureScreenshot(url, 1440, 1024);
      res.contentType('image/png');
      res.send(image);
    } catch (error) {
      res.status(500).json({
        error: 'Screenshot capture failed',
        message: error.message
      });
    }
  }

  async captureSoil(req, res) {
    try {
      const image = await screenshotService.captureScreenshot(config.routes.soil, 1440, 1400);
      res.contentType('image/png');
      res.send(image);
    } catch (error) {
      res.status(500).json({
        error: 'Screenshot capture failed',
        message: error.message
      });
    }
  }

  async captureWeather(req, res) {
    try {
      const image = await screenshotService.captureScreenshot(config.routes.weather, 1440, 1024);
      res.contentType('image/png');
      res.send(image);
    } catch (error) {
      res.status(500).json({
        error: 'Screenshot capture failed',
        message: error.message
      });
    }
  }
}

module.exports = new ScreenshotController();