/**
 * Health-Check-Endpunkte fuer Kubernetes Liveness- und Readiness-Probes.
 */

let isReady = false;

// Nach kurzer Initialisierungsphase als ready markieren
setTimeout(() => {
  isReady = true;
}, 2000);

/**
 * Liveness Probe: Prüft, ob die Anwendung grundsätzlich läuft.
 */
function healthCheck(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
}



/**
 * Readiness Probe: Prüft, ob die Anwendung bereit ist, Traffic zu empfangen.
 */
function readinessCheck(req, res) {
  if (isReady) {
    res.status(200).json({
      status: 'ready',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(503).json({
      status: 'not ready',
      message: 'Application is still initializing'
    });
  }
}

module.exports = { healthCheck, readinessCheck };
