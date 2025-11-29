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
- [ ] Estructura HTML5 semántica
- [ ] Input/textarea para texto
- [ ] Selectores idioma origen/destino
- [ ] Botones “Traducir” y “Limpiar”
- [ ] Área para mostrar traducción
- [ ] Área para historial
- [ ] Indicadores de carga y errores

### 3.2 `frontend/style.css`
- [ ] Layout responsivo
- [ ] Estilos para carga/error
- [ ] Diferenciar input, resultado e historial
- [ ] Usabilidad clara y accesible

### 3.3 `frontend/main.js`
- [ ] Manejar estado de aplicación
- [ ] Fetch a `/api/translate`
- [ ] Mostrar resultado en UI
- [ ] Fetch a `/api/translations` (historial)
- [ ] Permitir eliminar traducciones
- [ ] Manejar errores de red y validaciones

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

- [ ] Crear `backend/Dockerfile`
- [ ] Crear `docker-compose.yml`
- [ ] Definir servicios: backend, ollama, frontend
- [ ] Configurar redes y puertos
- [ ] Probar `docker compose up --build`
- [ ] Verificar acceso a `http://localhost:3000`

---

## 📖 Parte 6: Documentación (Ambos)

- [ ] Crear `README.md` con:
  - [ ] Descripción del proyecto
  - [ ] Autores y roles
  - [ ] Requisitos del sistema
  - [ ] Instalación y ejecución
  - [ ] API endpoints
  - [ ] Decisiones de diseño
  - [ ] Extensiones futuras
- [ ] Completar `checklist.md`

---

## 🌿 Parte 7: Git y Control de Versiones (Ambos)

- [ ] Commits incrementales y descriptivos
- [ ] Rama `hito2/desarrollo-ia`
- [ ] PR “Entrega: Traductor Inteligente con Ollama”
- [ ] Co-authored commits con ambos nombres
- [ ] Indicar claramente división de trabajo

---

## ✅ Entrega Final

- [ ] PR creado antes de la fecha límite
- [ ] Docker Compose funcional
- [ ] README completo y claro
- [ ] Checklist completado
- [ ] Base de datos persiste entre sesiones
- [ ] Historial funcional en el frontend

---

🧠 **Resumen de responsabilidades:**

| Rol        | Tareas principales |
|-------------|--------------------|
| **Backend (Persona A)** | `server.js`, `routes.js`, `services.js`, `db.js`, `validacion.http`, Docker backend |
| **Frontend (Persona B)** | `index.html`, `style.css`, `main.js`, Docker frontend |
| **Ambos** | Docker Compose, README.md, Checklist, Git workflow |

---

📅 **Estado final:**  
- [ ] Proyecto funcional  
- [ ] Documentación completa  
- [ ] Docker Compose validado  
- [ ] Entregado vía Pull Request
