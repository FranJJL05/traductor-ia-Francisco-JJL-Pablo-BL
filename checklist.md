# ✅ Checklist - Traductor Inteligente Multilenguaje

## 👥 Equipo
- **Backend:** [Nombre Persona A]
- **Frontend:** [Nombre Persona B]

---

## 🏗 Parte 1: Configuración Inicial del Proyecto (Ambos)

- [X] Crear carpeta `traductor-ia-[nombre-iniciales]`
- [X] Inicializar repositorio Git (`git init`)
- [X] Crear rama `hito2/desarrollo-ia`
- [X] Crear estructura de carpetas `/backend` y `/frontend`
- [X] Añadir `.gitignore`
- [X] Crear `.env.example` y `.env`
- [ ] Verificar instalación de Node.js, Docker y Ollama

---

## 💻 Parte 2: Backend - Persona A

### 2.1 `backend/db.js`
- [ ] Importar `better-sqlite3`
- [ ] Crear base de datos `db/traducciones.db`
- [ ] Crear tabla `traducciones`
- [ ] Exportar instancia de BD

### 2.2 `backend/server.js`
- [ ] Importar `express`, `cors`, `dotenv`
- [ ] Configurar middlewares
- [ ] Importar `routes.js`
- [ ] Manejar errores 404 y globales
- [ ] Levantar servidor con puerto del `.env`

### 2.3 `backend/routes.js`
- [ ] Endpoint `GET /api/health`
- [ ] Endpoint `POST /api/translate`
- [ ] Endpoint `GET /api/translations`
- [ ] Endpoint `GET /api/translations/:id`
- [ ] Endpoint `DELETE /api/translations/:id`
- [ ] Endpoint `DELETE /api/translations`
- [ ] Endpoint `GET /api/languages`

### 2.4 `backend/services.js`
- [ ] Función `traducir()`
- [ ] Función `obtenerHistorial()`
- [ ] Función `obtenerTraduccionPorId()`
- [ ] Función `eliminarTraduccion()`
- [ ] Función `limpiarHistorial()`
- [ ] Función `validarIdioma()`
- [ ] Integrar con **Ollama API**
- [ ] Insertar traducción en BD
- [ ] Manejar validaciones y errores

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

- [ ] Crear `validacion.http`
- [ ] Test `GET /api/health`
- [ ] Test `POST /api/translate`
- [ ] Test con errores (texto vacío, idiomas iguales)
- [ ] Test `GET /api/translations`
- [ ] Test `GET /api/languages`
- [ ] Test `DELETE /api/translations/:id`
- [ ] Test `DELETE /api/translations`

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
