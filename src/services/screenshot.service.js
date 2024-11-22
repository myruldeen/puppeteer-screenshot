const browserService = require('./browser.service');
const { logger } = require('../config/logger.config');

class ScreenshotService {
  async captureScreenshot(url, viewportWidth, viewportHeight) {
    const startTime = Date.now();
    logger.info('Starting screenshot capture', {
      url,
      viewport: { width: viewportWidth, height: viewportHeight }
    });

    const browser = await browserService.getBrowser();
    let page;

    try {
      page = await browser.newPage();
      logger.debug('New page created');
      
      await page.setViewport({ 
        width: viewportWidth, 
        height: viewportHeight,
        deviceScaleFactor: 1
      });

      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      page.setDefaultTimeout(30000);

      await page.setRequestInterception(true);
      page.on('request', (request) => {
        const resourceType = request.resourceType();
        if (['image', 'stylesheet', 'font', 'media', 'script'].includes(resourceType)) {
          request.continue();
        } else {
          request.continue();
        }
      });

      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      const screenshot = await page.screenshot({
        fullPage: true,
        type: 'png',
        optimizeForSpeed: true,
      });

      const duration = Date.now() - startTime;
      logger.info('Screenshot captured successfully', {
        url,
        duration: `${duration}ms`,
        screenshotSize: `${screenshot.length} bytes`
      });

      return screenshot;
    } catch (error) {
      logger.error('Screenshot capture failed', {
        url,
        error: {
          message: error.message,
          stack: error.stack
        },
        duration: `${Date.now() - startTime}ms`
      });
      throw error;
    } finally {
      if (page) {
        await page.close();
        logger.debug('Page closed');
      }
    }
  }
}

module.exports = new ScreenshotService();