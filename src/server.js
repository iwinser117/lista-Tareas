const path = require('path');
const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;
const TARGET = 'https://express-raily-demo-production.up.railway.app';

app.use(cors());
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, '..')));

// Simple CORS-friendly proxy for API routes
app.use('/api', (req, res) => {
  const url = new URL(req.originalUrl, TARGET);
  const options = {
    method: req.method,
    headers: {
      ...req.headers,
      host: new URL(TARGET).host,
      origin: TARGET,
    },
  };

  const proxyReq = https.request(url, options, (proxyRes) => {
    res.status(proxyRes.statusCode || 500);
    Object.entries(proxyRes.headers || {}).forEach(([k, v]) => {
      if (k.toLowerCase() === 'access-control-allow-origin') return; // we'll set our own
      res.setHeader(k, v);
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  });

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    req.pipe(proxyReq);
  } else {
    proxyReq.end();
  }
});

// Fallback to index.html for SPA-like routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
