# GitHub Actions CI/CD Prototyp

Dieses Projekt demonstriert eine vollständige CI/CD-Pipeline mit GitHub Actions für eine containerisierte Node.js-Webanwendung.

## Projektstruktur

```
prototype/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Haupt-CI/CD-Pipeline
├── k8s/
│   ├── deployment.yaml        # Kubernetes Deployment
│   └── service.yaml           # Kubernetes Service
├── src/
│   ├── server.js              # Express-Backend
│   └── health.js              # Health-Check-Endpunkte
├── test/
│   └── server.test.js         # Unit-Tests
├── Dockerfile                 # Multi-Stage Docker Build
├── package.json               # Node.js Abhängigkeiten
├── .eslintrc.json             # Linting-Konfiguration
└── README.md                  # Diese Datei
```

## Voraussetzungen

- Node.js >= 20
- Docker
- kubectl + Kubernetes-Cluster (z.B. Minikube)
- GitHub Account mit Repository

## Lokale Entwicklung

```bash
npm install
npm run dev        # Startet den Server auf Port 3000
npm test           # Führt Tests aus
npm run lint       # Führt Linting aus
```

## Docker Build

```bash
docker build -t webapp:latest .
docker run -p 3000:3000 webapp:latest
```

## Kubernetes Deployment

```bash
# Minikube starten
minikube start

# Deployment anwenden
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Status prüfen
kubectl get pods
kubectl get services
```

## CI/CD-Pipeline

Die Pipeline wird bei jedem Push auf `main` und bei Pull Requests ausgelöst:

1. **build-and-test**: Installiert Abhängigkeiten, führt Linting und Tests aus
2. **build-image**: Baut Docker Image und pusht es in die GitHub Container Registry
3. **security-scan**: Scannt das Image mit Trivy auf Schwachstellen
4. **deploy**: Deployt die Anwendung in den Kubernetes-Cluster

## Einrichtung der Secrets

Folgende Secrets müssen im GitHub Repository konfiguriert werden:

- `KUBE_CONFIG`: Base64-kodierte kubeconfig für den Kubernetes-Cluster

Der `GITHUB_TOKEN` wird automatisch bereitgestellt und benötigt keine manuelle Konfiguration.
