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

## CI/CD-Pipeline

Die Pipeline wird bei jedem Push auf `main` und bei Pull Requests ausgelöst:

1. **build-and-test**: Installiert Abhängigkeiten, führt Linting und Tests aus
2. **build-image**: Baut Docker Image und pusht es in die GitHub Container Registry
3. **security-scan**: Scannt das Image mit Trivy auf Schwachstellen
4. **deploy**: Deployt die Anwendung in ein Google Cluster


## Cluster Management

```bash
# delete
gcloud container clusters delete demo-cluster \
  --region=europe-west1 \
  --project=gh-actions-demo-2026 --quiet

# create
gcloud container clusters create-auto demo-cluster \
  --region=europe-west1 \
  --project=gh-actions-demo-2026

# new credentials
gcloud container clusters get-credentials demo-cluster \
  --region=europe-west1 \
  --project=gh-actions-demo-2026

# new push/restart gh acitons deploy

kubectl get pods

kubectl get svc webapp-service

curl http://<external-ip>/health
```
