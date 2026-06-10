const express = require('express');
const { healthCheck, readinessCheck } = require('./health');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health-Check-Endpunkte fuer Kubernetes
app.get('/health', healthCheck);
app.get('/ready', readinessCheck);

// API-Endpunkte
app.get('/', (req, res) => {
  res.status(500).json({
    message: 'GitHub Actions CI/CD Demo',
    version: process.env.npm_package_version || '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'github-actions-demo-webapp',
    environment: process.env.NODE_ENV || 'development',
    node_version: process.version,
    uptime: process.uptime()
  });
});

app.get('/api/items', (req, res) => {
  // Beispiel-Endpunkt: Liste von Items
  const items = [
    { id: 1, name: 'CI Pipeline', status: 'active' },
    { id: 2, name: 'CD Pipeline', status: 'active' },
    { id: 3, name: 'Security Scan', status: 'active' }
  ];
  res.json({ items });
});

// Server starten 
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server laeuft auf Port ${PORT}`);
  });
}

module.exports = app;
