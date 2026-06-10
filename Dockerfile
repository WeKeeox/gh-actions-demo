# Multi-Stage Build fuer optimale Image-Groesse
# Stage 1: Abhaengigkeiten installieren
FROM node:20-alpine AS builder

WORKDIR /app

# Nur package-Dateien kopieren fuer besseres Layer-Caching
COPY package*.json ./

# Nur Produktionsabhaengigkeiten installieren
RUN npm ci --only=production && npm cache clean --force

# Quellcode kopieren
COPY src/ ./src/

# Stage 2: Produktions-Image
FROM node:20-alpine

WORKDIR /app

# Sicherheit: Non-root User erstellen
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Abhaengigkeiten und Code aus Builder-Stage kopieren
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/src ./src
COPY --from=builder --chown=appuser:appgroup /app/package.json ./

# Als Non-root User ausfuehren
USER appuser

# Port exponieren
EXPOSE 3000

# Health-Check fuer Docker
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Anwendung starten
CMD ["node", "src/server.js"]
