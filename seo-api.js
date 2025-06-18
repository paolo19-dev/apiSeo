const express = require('express');
const puppeteer = require('puppeteer-core');
const chrome = require('chrome-aws-lambda');

const app = express();
app.use(express.json());

// Homepage
app.get('/', (req, res) => {
  res.send(`
    <h1>API SEO per SPA</h1>
    <p>Usa POST /render per generare HTML ottimizzato</p>
    <p>Esempio curl:</p>
    <pre>
curl -X POST http://${req.headers.host}/render \\
-H "Content-Type: application/json" \\
-d '{
  "url": "https://example.com",
  "metadata": {
    "og:title": "Titolo Test"
  }
}'
    </pre>
  `);
});

// Endpoint principale
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
    res.status(500).send('Errore nel rendering SEO: ' + error.message);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API in esecuzione su http://localhost:${PORT}`);
});