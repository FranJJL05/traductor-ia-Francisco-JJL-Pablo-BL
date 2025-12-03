# ✅ Checklist - Traductor Inteligente Multilenguaje

## 👥 Equipo
- **Backend:** Pablo
- **Frontend:** Fran

---

## 🏗 Parte 1: Configuración Inicial del Proyecto (Ambos)

- [X] Crear carpeta `traductor-ia-[nombre-iniciales]`
- [X] Inicializar repositorio Git (`git init`)
- [X] Crear rama `hito2/desarrollo-ia`
- [X] Crear estructura de carpetas `/backend` y `/frontend`
- [X] Añadir `.gitignore`
- [X] Crear `.env.example` y `.env`
- [x] Verificar instalación de Node.js, Docker y Ollama

---

## 💻 Parte 2: Backend - Pablo

### 2.1 `backend/db.js`
- [x] Importar `better-sqlite3`
- [x] Crear base de datos `db/traducciones.db`
- [x] Crear tabla `traducciones`
- [x] Exportar instancia de BD

### 2.2 `backend/server.js`
- [x] Importar `express`, `cors`, `dotenv`
- [x] Configurar middlewares
- [x] Importar `routes.js`
- [x] Manejar errores 404 y globales
- [x] Levantar servidor con puerto del `.env`

### 2.3 `backend/routes.js`
- [x] Endpoint `GET /api/health`
- [x] Endpoint `POST /api/translate`
- [x] Endpoint `GET /api/translations`
- [x] Endpoint `GET /api/translations/:id`
- [x] Endpoint `DELETE /api/translations/:id`
- [x] Endpoint `DELETE /api/translations`
- [x] Endpoint `GET /api/languages`

### 2.4 `backend/services.js`
- [x] Función `traducir()`
- [x] Función `obtenerHistorial()`
- [x] Función `obtenerTraduccionPorId()`
- [x] Función `eliminarTraduccion()`
- [x] Función `limpiarHistorial()`
- [x] Función `validarIdioma()`
- [x] Integrar con **Ollama API**
- [x] Insertar traducción en BD
- [x] Manejar validaciones y errores

---

## 🎨 Parte 3: Frontend - Persona B

### 3.1 `frontend/index.html`
- [x] Estructura HTML5 semántica
- [x] Input/textarea para texto
- [x] Selectores idioma origen/destino
- [x] Botones “Traducir” y “Limpiar”
- [x] Área para mostrar traducción
- [x] Área para historial
- [x] Indicadores de carga y errores

### 3.2 `frontend/style.css`
- [x] Layout responsivo
- [x] Estilos para carga/error
- [x] Diferenciar input, resultado e historial
- [x] Usabilidad clara y accesible

### 3.3 `frontend/main.js`
- [x] Manejar estado de aplicación
- [x] Fetch a `/api/translate`
- [x] Mostrar resultado en UI
- [x] Fetch a `/api/translations` (historial)
- [x] Permitir eliminar traducciones
- [x] Manejar errores de red y validaciones

---

## 🧪 Parte 4: Validación y Tests (Persona A)

- [X] Crear `validacion.http`
- [x] Test `GET /api/health`
- [x] Test `POST /api/translate`
- [x] Test con errores (texto vacío, idiomas iguales)
- [x] Test `GET /api/translations`
- [x] Test `GET /api/languages`
- [x] Test `DELETE /api/translations/:id`
- [x] Test `DELETE /api/translations`

---

## 🐳 Parte 5: Dockerización (Ambos)

- [x] Crear `backend/Dockerfile`
- [x] Crear `docker-compose.yml`
- [x] Definir servicios: backend, ollama, frontend
- [x] Configurar redes y puertos
- [x] Probar `docker compose up --build`
- [x] Verificar acceso a `http://localhost:3000`

---

## 📖 Parte 6: Documentación (Ambos)

- [x] Crear `README.md` con:
  - [x] Descripción del proyecto
  - [x] Autores y roles
  - [x] Requisitos del sistema
  - [x] Instalación y ejecución
  - [x] API endpoints
  - [x] Decisiones de diseño
  - [x] Extensiones futuras
- [x] Completar `checklist.md`

---

## 🌿 Parte 7: Git y Control de Versiones (Ambos)

- [x] Commits incrementales y descriptivos
- [x] Rama `hito2/desarrollo-ia`
- [x] PR “Entrega: Traductor Inteligente con Ollama”
- [x] Co-authored commits con ambos nombres
- [x] Indicar claramente división de trabajo

---

## ✅ Entrega Final

- [x] PR creado antes de la fecha límite
- [x] Docker Compose funcional
- [x] README completo y claro
- [x] Checklist completado
- [x] Base de datos persiste entre sesiones
- [x] Historial funcional en el frontend

---

🧠 **Resumen de responsabilidades:**

| Rol        | Tareas principales |
|-------------|--------------------|
| **Backend (Persona A)** | `server.js`, `routes.js`, `services.js`, `db.js`, `validacion.http`, Docker backend |
| **Frontend (Persona B)** | `index.html`, `style.css`, `main.js`, Docker frontend |
| **Ambos** | Docker Compose, README.md, Checklist, Git workflow |

---

📅 **Estado final:**  
- [x] Proyecto funcional  
- [x] Documentación completa  
- [x] Docker Compose validado  
- [x] Entregado vía Pull Request
