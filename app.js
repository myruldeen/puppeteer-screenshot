const path = require('path');
const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 5000;

const puppeteerLaunchOptions = {
  args: ['--no-sandbox'],
};

const captureScreenshot = async (url, viewportWidth, viewportHeight) => {
  try {
    const browser = await puppeteer.launch(puppeteerLaunchOptions);
    const page = await browser.newPage();
    await page.setViewport({ width: viewportWidth, height: viewportHeight });
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 0,
    });

    const image = await page.screenshot({
      path: 'screenshot_full.jpg',
      fullPage: true,
      delay: '500ms',
    });

    await browser.close();
    return image;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

app.get('/', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    res.status(400).send('Missing URL query parameter.');
    return;
  }

  try {
    const image = await captureScreenshot(url, 1440, 1024);
    res.contentType('image/png');
    res.send(image);
  } catch (error) {
    res.status(500).send('Error capturing screenshot.');
  }
});

app.get('/soil', async (req, res) => {
  const url = 'https://nodered.denoodev.com/ui/#!/1?socketid=fmH2JUlerO7KcBXzAAEU';
  try {
    const image = await captureScreenshot(url, 1440, 1400);
    res.contentType('image/png');
    res.send(image);
  } catch (error) {
    res.status(500).send('Error capturing screenshot.');
  }
});

app.get('/weather', async (req, res) => {
  const url = 'https://nodered.denoodev.com/ui/#!/0?socketid=fmH2JUlerO7KcBXzAAEU';
  try {
    const image = await captureScreenshot(url, 1440, 1024);
    res.contentType('image/png');
    res.send(image);
  } catch (error) {
    res.status(500).send('Error capturing screenshot.');
  }
});

const server = app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
