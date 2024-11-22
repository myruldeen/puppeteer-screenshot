const puppeteer = require('puppeteer');
const config = require('../config');

class BrowserService {
  constructor() {
    this.browser = null;
  }

  async initBrowser() {
    try {
      this.browser = await puppeteer.launch(config.puppeteer);
      console.log('Browser instance created');

      // Restart browser every hour
      setTimeout(async () => {
        if (this.browser) {
          await this.browser.close();
          this.browser = null;
          await this.initBrowser();
        }
      }, 60 * 60 * 1000);
    } catch (error) {
      console.error('Failed to launch browser:', error);
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