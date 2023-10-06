# Screenshot Capture Service

This Node.js application serves as a simple screenshot capture service using Puppeteer and Express.js. It listens for HTTP requests on different routes, captures full-page screenshots of specified web pages, and returns them as image responses.

## Getting Started

To use this service, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo

2. Install the dependencies:

   ```bash
   npm install

3. Start the application:

   ```bash
   npm start
The application will start listening on port 5000 by default. You can customize the port by modifying the port variable in the code.

# Usage

## Capture a Screenshot

To capture a screenshot of a web page, make a GET request to the root endpoint ("/") with the url query parameter specifying the URL of the web page you want to capture.

Example:

```bash
curl "http://localhost:5000/?url=https://example.com"

```
The captured screenshot will be returned as an image response.

## Capture Soil or Weather Data Screenshots

You can also use predefined routes to capture screenshots of specific web pages:
- /soil: Captures a screenshot of a soil data visualization page.
- /weather: Captures a screenshot of a weather data visualization page.

Example:

```bash
curl "http://localhost:5000/soil"
```

## Error Handling
- If the url query parameter is missing in a request to the root endpoint ("/"), a 400 Bad Request response will be returned.
- If an error occurs during screenshot capture, a 500 Internal Server Error response will be returned.

## Configuration
- You can customize the Puppeteer launch options, such as disabling the sandbox, by modifying the puppeteerLaunchOptions object in the code.
- Adjust the viewport size and other capture settings within the captureScreenshot function.

## Contributing
Contributions to this project are welcome. Feel free to fork the repository, make changes, and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.





