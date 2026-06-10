const request = require('supertest');
const app = require('../src/server');

describe('API Endpoints', () => {
  
  describe('GET /', () => {
    it('sollte die Startseite mit Versionsinformation zurueckgeben', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body.message).toBe('GitHub Actions CI/CD Demo');
    });
  });

  describe('GET /api/info', () => {
    it('sollte Anwendungsinformationen zurueckgeben', async () => {
      const response = await request(app).get('/api/info');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('app', 'github-actions-demo-webapp');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('node_version');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api/items', () => {
    it('sollte eine Liste von Items zurueckgeben', async () => {
      const response = await request(app).get('/api/items');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('items');
      expect(Array.isArray(response.body.items)).toBe(true);
      expect(response.body.items.length).toBe(3);
    });

    it('sollte Items mit korrekter Struktur enthalten', async () => {
      const response = await request(app).get('/api/items');
      const item = response.body.items[0];
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('status');
    });
  });

  describe('GET /health', () => {
    it('sollte den Health-Status zurueckgeben', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /ready', () => {
    it('sollte den Readiness-Status zurueckgeben', async () => {
      // Warten bis die App als ready markiert ist
      await new Promise(resolve => setTimeout(resolve, 2500));
      const response = await request(app).get('/ready');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ready');
    });
  });

  describe('GET /unknown', () => {
    it('sollte 404 fuer unbekannte Routen zurueckgeben', async () => {
      const response = await request(app).get('/unknown');
      expect(response.status).toBe(404);
    });
  });
});
