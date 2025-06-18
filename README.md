SEO Rendering API for Single Page Applications (SPA)
Dynamically render SEO-optimized HTML for your JavaScript-powered websites with this lightweight Express.js API. Built with Puppeteer Core and Chrome AWS Lambda, it solves the critical challenge of search engine visibility for SPAs by:

Server-Side Rendering (SSR) on Demand
Perfect for static site generators, Jamstack apps, or client-side rendered SPAs that need SEO support.

Dynamic Meta Tag Injection
Enhance Open Graph/twitter cards by injecting custom metadata (titles, descriptions, images) before serving HTML to crawlers.

Zero Configuration for Production
Pre-configured for seamless deployment on serverless platforms (AWS Lambda, Vercel, Netlify).

Simple Integration
Call via REST API with a JSON payload - no complex setups required.

{
  "url": "https://your-spa-url.com",
  "metadata": {
    "og:title": "Custom Open Graph Title",
    "og:description": "Engaging social media description",
    "twitter:image": "https://path/to/image.jpg"
  }
}

curl -X POST https://your-api-url/render \
-H "Content-Type: application/json" \
-d '{
  "url": "https://react-app.com",
  "metadata": {
    "og:title": "My React App | Dynamic SEO Solution"
  }
}'


Ideal For
SPAs built with React, Vue, Angular

Improving SEO rankings for dynamic content

Generating social media previews dynamically

Adding SEO support to static site generators

🛠️ Tech Stack
Diagram
Code




Get crawler-friendly HTML without compromising your SPA's architecture!
