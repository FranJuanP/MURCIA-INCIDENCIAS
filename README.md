# Murcia Sentinel — GitHub Pages Ready

- `docs/` → sitio estático para GitHub Pages (UI)
- `api/`, `worker/`, `docker-compose.yml` → backend (Docker)

## GitHub Pages
1) Activa Pages para `docs/`
2) Edita `docs/config.js` y define `window.API_BASE`

## Local (fullstack)
```powershell
docker compose up --build
```
Luego abre:
- http://localhost:8080
