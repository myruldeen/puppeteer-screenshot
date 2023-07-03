const path = require('path');
const express = require('express'),
  app = express(),
  puppeteer = require('puppeteer');

app.get("/", async (request, response) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1024 });
    await page.goto(request.query.url, {
      waitUntil: "networkidle2",
      timeout: 0
    });

    const image = await page.screenshot({
      path: 'screenshot_full.jpg',
      fullPage: true,
      delay: '500ms'
    });

    await browser.close();
    response.set('Content-Type', 'image/png');
    response.send(image);
  } catch (error) {
    console.log(error);
  }
});

app.get("/soil", async (request, response) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1400 });
    await page.goto('https://nodered.denoodev.com/ui/#!/1?socketid=fmH2JUlerO7KcBXzAAEU', {
      waitUntil: "networkidle2",
      timeout: 0
    });

    const image = await page.screenshot({
      path: 'screenshot_full.jpg',
      fullPage: true,
      delay: '500ms'
    });

    await browser.close();
    response.set('Content-Type', 'image/png');
    response.send(image);
  } catch (error) {
    console.log(error);
  }
});

app.get("/weather", async (request, response) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1024 });
    await page.goto("https://nodered.denoodev.com/ui/#!/0?socketid=fmH2JUlerO7KcBXzAAEU", {
      waitUntil: "networkidle2",
      timeout: 0
    });


    const image = await page.screenshot({
      path: 'screenshot_full.jpg',
      fullPage: true,
      delay: '500ms'
    });

    await browser.close();
    response.set('Content-Type', 'image/png');
    response.send(image);
  } catch (error) {
    console.log(error);
  }
});

var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});