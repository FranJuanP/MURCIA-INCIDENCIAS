# Murcia Sentinel FULLSTACK — Windows 11 — v2

Incluye:
- UI (HTML) servida por Nginx en http://localhost:8080
- API FastAPI + SSE detrás de Nginx (sin CORS)
- Worker demo insertando incidencias
- PostgreSQL (host 55432)

## Arranque
En PowerShell, en esta carpeta:

```powershell
docker compose up --build
```

## Abrir la herramienta
- UI: http://localhost:8080

## Endpoints (a través de Nginx)
- Salud:    http://localhost:8080/api/health
- Snapshot: http://localhost:8080/api/incidents?limit=200
- SSE:      http://localhost:8080/api/stream

## Logs
```powershell
docker compose logs -f web
docker compose logs -f api
docker compose logs -f worker
docker compose logs -f db
```
