const puppeteer = require('puppeteer');
const config = require('../config');
const { logger } = require('../config/logger.config');

class BrowserService {
  constructor() {
    this.browser = null;
  }

  async initBrowser() {
    try {
      this.browser = await puppeteer.launch(config.puppeteer);
      logger.info('Browser instance created successfully');

      // Restart browser every hour
      setTimeout(async () => {
        if (this.browser) {
          logger.info('Scheduled browser restart initiated');
          await this.browser.close();
          this.browser = null;
          await this.initBrowser();
        }
      }, 60 * 60 * 1000);
    } catch (error) {
      logger.error('Failed to launch browser:', {
        error: {
          message: error.message,
          stack: error.stack
        }
      });
      throw error;
    }
  }

  async getBrowser() {
    if (!this.browser) {
      await this.initBrowser();
    }
    return this.browser;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

module.exports = new BrowserService();
