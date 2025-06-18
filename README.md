# SEO API for Single Page Applications (SPA)

This API generates SEO-optimized HTML for Single Page Applications by:
1. Rendering the JavaScript application in a headless browser
2. Injecting custom metadata (Open Graph tags, etc.)
3. Returning the fully rendered HTML

## Use Cases
- Improve SEO for JavaScript-heavy applications
- Generate dynamic social media previews
- Server-side rendering for SPAs
- Content scraping with executed JavaScript

## Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/seo-api.git
cd seo-api

Install dependencies:
npm install

Start the server:
node seo-api.js

Deployment
For AWS Lambda deployment:

Install serverless framework: npm install -g serverless

Configure AWS credentials

Deploy: serverless deploy

API Endpoints
GET /
Description: Homepage with usage instructions

Response: HTML documentation page

POST /render
Description: Renders a URL and returns SEO-optimized HTML

Headers: Content-Type: application/json

Request Body:

{
  "url": "https://example.com",
  "metadata": {
    "og:title": "Custom Title",
    "og:description": "Custom description",
    "twitter:card": "summary_large_image"
  }
}

Success Response: 200 OK with rendered HTML

Error Response: 500 Internal Server Error with error message

Example Usage
Curl Request

curl -X POST http://localhost:4000/render \
-H "Content-Type: application/json" \
-d '{
  "url": "https://example.com",
  "metadata": {
    "og:title": "Custom Open Graph Title",
    "og:image": "https://example.com/image.jpg"
  }
}'

Node.js Client
const fetch = require('node-fetch');

const apiUrl = 'http://localhost:4000/render';
const payload = {
  url: 'https://your-spa.com',
  metadata: {
    'og:title': 'Dynamic Title',
    'og:description': 'Page description for social media'
  }
};

fetch(apiUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
.then(response => response.text())
.then(html => console.log(html))
.catch(error => console.error('Error:', error));

Configuration
Environment Variables:

NODE_ENV: Set to production for AWS Lambda execution

PORT: Server port (default: 4000)

Technical Implementation
const express = require('express');
const puppeteer = require('puppeteer-core');
const chrome = require('chrome-aws-lambda');

const app = express();
app.use(express.json());

// Homepage
app.get('/', (req, res) => {
  res.send(`
    <h1>SEO API for SPAs</h1>
    <p>Use POST /render to generate SEO-optimized HTML</p>
    <p>Example curl:</p>
    <pre>
curl -X POST http://${req.headers.host}/render \\
-H "Content-Type: application/json" \\
-d '{
  "url": "https://example.com",
  "metadata": {
    "og:title": "Custom Title"
  }
}'
    </pre>
  `);
});

// Main endpoint
app.post('/render', async (req, res) => {
  try {
    const { url, metadata = {} } = req.body;
    
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: process.env.NODE_ENV === 'production' 
        ? await chrome.executablePath
        : require('puppeteer').executablePath(),
      headless: true
    });

    const page = await browser.newPage();
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Inject metadata
    await page.evaluate((meta) => {
      for (const [property, content] of Object.entries(meta)) {
        const tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.content = content;
        document.head.appendChild(tag);
      }
    }, metadata);

    const html = await page.content();
    await browser.close();

    res.send(html);

  } catch (error) {
    console.error(error);
    res.status(500).send('SEO rendering error: ' + error.message);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

Key Features
Dynamic Metadata Injection: Add/update Open Graph tags and other metadata

Full JavaScript Execution: Renders client-side frameworks (React, Vue, Angular)

Timeout Handling: 60-second page load timeout

Cross-Platform: Works in both local development and AWS Lambda

Error Handling: Detailed error messages for debugging

Dependencies
Express.js - Web framework

Puppeteer Core - Headless Chrome control

Chrome AWS Lambda - Chromium for serverless environments

Contributing
Fork the repository

Create a feature branch (git checkout -b feature/improvement)

Commit your changes (git commit -am 'Add some feature')

Push to the branch (git push origin feature/improvement)

Create a new Pull Request

Key Notes
Document Structure:

Clear header with project name and purpose

Step-by-step installation instructions

Usage examples in multiple formats

Comprehensive endpoint documentation

Integrated code explanations

Contribution guidelines

Code Syntax:

Code blocks wrapped in ``` for proper formatting

Technical section shows full implementation

Examples include both curl and Node.js

Highlighted Key Features:

Serverless environment support

Dynamic metadata injection

Error handling

Compatibility with modern JavaScript frameworks

GitHub Optimizations:

Hierarchical headers (##, ###)

Correct Markdown syntax

Standard contribution section

Links to key dependencies
