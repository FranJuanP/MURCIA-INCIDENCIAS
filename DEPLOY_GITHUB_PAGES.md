# Publicación en GitHub (sin cambiar el funcionamiento)

Tu app tiene 2 piezas:

1) **Frontend (HTML estático)** → sí puede ir en **GitHub Pages**
2) **Backend (API + SSE + DB + worker)** → **NO** puede ejecutarse en GitHub Pages (Pages solo sirve estático)

La adaptación que te dejo mantiene el comportamiento: la UI sigue consumiendo:
- Snapshot: `/api/incidents`
- Realtime SSE: `/api/stream`

Solo que ahora la UI usa un **API_BASE configurable** para que funcione tanto:
- en local con Docker (API_BASE vacío, usa `/api/*`)
- en GitHub Pages (API_BASE con URL absoluta del backend)

---

## A) Publicar el frontend en GitHub Pages

### 1) Sube este repo a GitHub (rama main)
Incluye la carpeta `docs/` (ya preparada).

### 2) Activar Pages
En GitHub:
- Settings → Pages
- Build and deployment: **GitHub Actions** (recomendado)  
  o “Deploy from a branch” apuntando a `/docs` si prefieres sin Actions.

El workflow `.github/workflows/pages.yml` desplegará el contenido de `docs/`.

### 3) Configurar la URL del backend (API_BASE)
Edita **`docs/config.js`** y pon tu backend real, por ejemplo:

```js
window.API_BASE = "https://api.tudominio.com";
```

> Importante: para SSE, usa **HTTPS** en producción (y que el servidor soporte conexiones largas).

---

## B) Desplegar el backend (API + DB + worker)

### Opción B1 (recomendada): Tu VPS / servidor (Docker)
En tu servidor (Linux):
1. Instala Docker y Docker Compose
2. Sube la carpeta del backend (puedes clonar este mismo repo)
3. Ejecuta:

```bash
docker compose up -d --build
```

Para que el frontend (Pages) acceda, expón la API en un dominio, por ejemplo:
- `https://api.tudominio.com`

y apunta `API_BASE` a esa URL.

#### CORS
El backend ya permite CORS. En producción ajusta `CORS_ORIGINS` para incluir tu Pages:
- `https://tuusuario.github.io`
- o tu dominio si usas custom domain para Pages

---

## Recomendación “PRO” (mismo dominio, cero CORS)
Si tienes dominio propio:
- Pages en `https://tudominio.com`
- Backend detrás de Nginx en el mismo dominio, proxy `/api/*`

Entonces `API_BASE` puede quedarse vacío y todo funciona como en local.

---

## Quick test
Cuando tengas el backend publicado:
- `https://api.tudominio.com/api/health`
- `https://api.tudominio.com/api/incidents`

Luego Pages:
- `https://tuusuario.github.io/tu-repo/`

y verás incidencias y realtime.
