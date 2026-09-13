# Tarea 3 — Micro-frontends

**Estudiante:** Irina Rivera  
**Curso:**  Sistemas Distribuidos EIF508
**Fecha:**  Septiembre, 2026

---

| Componente | URL |
|---|---|
| **Shell** | https://shell-minifront.vercel.app |

---

## Descripción

Esta tarea implementa una arquitectura de **micro-frontends** compuesta por:

- **4 microservicios backend** independientes, cada uno con su propia base de datos y proveedor FaaS.
- **4 mini-sitios frontend**, cada uno construido con una **tecnología distinta**.
- **1 shell** que compone los mini-sitios dentro de un `<iframe>`.

---

## URLs publicadas

### Backends (microservicios)

| Servicio | Tecnología | URL |
|---|---|---|
| **Books API** | Netlify Functions + Neon (PostgreSQL) | https://books-microservice.netlify.app |
| **Authors API** | Cloudflare Workers + D1 (SQLite) | https://authors-microservice.irina-rivera.workers.dev |
| **Publishers API** | Vercel Functions + Turso (SQLite) | https://publishers-microservice.vercel.app |
| **Reviews API** | Netlify Functions + Neon (PostgreSQL) | https://reviews-microservice.netlify.app |

### Frontends (mini-sitios)

| Mini-sitio | Tecnología | URL |
|---|---|---|
| **Books** | Vue 3 + vue-router + Vite | https://books-minifront.vercel.app |
| **Authors** | Alpine.js (sin build) | https://authors-minifront.vercel.app |
| **Publishers** | petite-vue (sin build) | https://publishers-minifront.vercel.app |
| **Reviews** | Web Components nativos | https://reviews-minifront.vercel.app |

### Shell (compositor)

| Componente | URL |
|---|---|
| **Shell** | https://shell-minifront.vercel.app |

---

## Endpoints de cada API

### Books API
Base: `https://books-microservice.netlify.app`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/books` | Lista todos los libros |
| `GET` | `/api/books/:id` | Detalle de un libro |


### Authors API
Base: `https://authors-microservice.irina-rivera.workers.dev`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/authors` | Lista todos los autores |
| `GET` | `/api/authors/:id` | Detalle de un autor |


### Publishers API
Base: `https://publishers-microservice.vercel.app`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/publishers` | Lista todas las editoriales |
| `GET` | `/api/publishers/:id` | Detalle de una editorial |


### Reviews API
Base: `https://reviews-microservice.netlify.app`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/reviews` | Lista todas las reseñas |
| `GET` | `/api/reviews?bookId=X` | Reseñas de un libro específico |
| `POST` | `/api/reviews` | Crea una reseña nueva |

---

## Arquitectura

┌─────────────────────────────────────────────────────────────────┐
│                         SHELL (iFrame)                          │
│              https://shell-minifront.vercel.app                 │
└─────────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    ┌────────┐    ┌─────────┐    ┌────────────┐  ┌─────────┐
    │ Books  │    │ Authors │    │ Publishers │  │ Reviews │
    │ (Vue3) │    │(Alpine) │    │(petite-vue)│  │  (WC)   │
    └────────┘    └─────────┘    └────────────┘  └─────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    ┌────────┐    ┌─────────┐    ┌────────────┐  ┌─────────┐
    │ Netlify│    │Cloudflare│   │   Vercel   │  │ Netlify │
    │  +     │    │   +      │   │    +       │  │  +      │
    │ Neon   │    │   D1     │   │   Turso    │  │  Neon   │
    └────────┘    └─────────┘    └────────────┘  └─────────┘


---


## Cómo ejecutar en local

### Backend Books

    cd books-microservice
    npm install
# Crear .env con DATABASE_URL=...
    npm run dev        # http://localhost:8888/api/books

---

### Backend Authors

    cd authors-microservice
    npm install
    npx wrangler d1 execute authors-microservice-db --local --file=./schema.sql
    npm run dev        # http://localhost:8788/api/authors

---

### Backend Publishers

    cd publishers-microservice
    npm install
# Crear .env con TURSO_DATABASE_URL y TURSO_AUTH_TOKEN
    npm run local      # http://localhost:8789/api/publishers

---

### Backend Reviews

    cd reviews-microservice
    npm install
# Crear .env con DATABASE_URL=...
    npm run dev        # http://localhost:8790/api/reviews

---

### Frontend Books

    cd books-minisite
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # genera dist/

---

### Frontends Sin build

    cd authors-minisite      # o publishers-minisite / reviews-minisite
    npx serve .

---

### Shell

    cd shell
    npx serve .
