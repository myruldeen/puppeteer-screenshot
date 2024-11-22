const config = {
    port: process.env.PORT || 5000,
    cache: {
      ttl: 300 // 5 minutes
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests
    },
    puppeteer: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--disable-extensions'
      ],
      headless: 'new'
    },
    routes: {
      soil: 'https://nodered.denoodev.com/ui/#!/1?socketid=fmH2JUlerO7KcBXzAAEU',
      weather: 'https://nodered.denoodev.com/ui/#!/0?socketid=fmH2JUlerO7KcBXzAAEU'
    }
  };
  
  module.exports = config;