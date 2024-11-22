const app = require('./app');
const config = require('./config');
const browserService = require('./services/browser.service');

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  browserService.initBrowser().catch(console.error);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing server and browser...');
  await browserService.cleanup();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});