const browserService = require('./browser.service');

class ScreenshotService {
  async captureScreenshot(url, viewportWidth, viewportHeight) {
    const browser = await browserService.getBrowser();
    let page;

    try {
      page = await browser.newPage();
      
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

      return screenshot;
    } catch (error) {
      console.error(`Screenshot capture failed for ${url}:`, error);
      throw error;
    } finally {
      if (page) {
        await page.close();
      }
    }
  }
}

module.exports = new ScreenshotService();