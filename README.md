# Traductor Inteligente Multilenguaje 🌍🤖

Este proyecto es una aplicación web de traducción de texto que utiliza Inteligencia Artificial (Ollama) para realizar traducciones precisas y contextuales entre múltiples idiomas. El sistema cuenta con un backend robusto en Node.js y un frontend intuitivo, todo orquestado mediante Docker.

## 👥 Equipo y Responsabilidades

El desarrollo de este proyecto ha sido realizado por:

### **Pablo (Backend)** ⚙️
*   **Servidor y API**: Configuración del servidor Express (`server.js`) y definición de rutas (`routes.js`).
*   **Lógica de Negocio**: Implementación de servicios de traducción y gestión de historial (`services.js`).
*   **Base de Datos**: Configuración de SQLite (`db.js`) para persistencia de traducciones.
*   **Integración IA**: Conexión con la API de Ollama para el motor de traducción.
*   **Validación**: Creación de `validacion.http` para pruebas de endpoints.
*   **Docker**: Dockerización del servicio backend.

### **Fran (Frontend)** 🎨
*   **Interfaz de Usuario**: Diseño y estructura HTML5 semántica (`index.html`).
*   **Estilos**: Diseño responsivo y moderno con CSS (`style.css`).
*   **Lógica Cliente**: Interacción con la API, manejo de estado y actualizaciones dinámicas (`main.js`).
*   **Docker**: Dockerización del servicio frontend.

### **Responsabilidades Compartidas** 🤝
*   Configuración inicial del proyecto y estructura de directorios.
*   Configuración de Docker Compose para orquestar los servicios.
*   Documentación (`README.md` y `checklist.md`).
*   Control de versiones con Git.

## 🚀 Requisitos Previos

Para ejecutar este proyecto necesitas tener instalado:

*   [Docker](https://www.docker.com/)
*   [Docker Compose](https://docs.docker.com/compose/)

## 🛠️ Instalación y Ejecución

1.  **Clonar el repositorio** (si no lo has hecho ya):
    ```bash
    git clone <url-del-repositorio>
    cd traductor-ia-Francisco-JJL-Pablo-BL
    ```

2.  **Configurar variables de entorno**:
    Asegúrate de tener el archivo `.env` configurado. Puedes usar `.env.example` como referencia.

3.  **Iniciar la aplicación**:
    Ejecuta el siguiente comando en la raíz del proyecto para construir y levantar los contenedores:
    ```bash
    docker compose up --build
    ```
    *Este comando descargará la imagen de Ollama, construirá el frontend y el backend, e iniciará todos los servicios.*

4.  **Acceder a la aplicación**:
    Una vez que los contenedores estén corriendo, abre tu navegador y visita:
    ```
    http://localhost:3000
    ```

## 🔌 Endpoints de la API

La API del backend está disponible en el puerto `3005` (o el configurado en tu `.env`) y expone los siguientes endpoints:

*   `GET /api/health`: Verifica el estado del servidor.
*   `POST /api/translate`: Realiza una traducción.
    *   Body: `{ "text": "...", "sourceLang": "...", "targetLang": "..." }`
*   `GET /api/translations`: Obtiene el historial de traducciones.
*   `GET /api/translations/:id`: Obtiene una traducción específica por ID.
*   `DELETE /api/translations/:id`: Elimina una traducción específica.
*   `DELETE /api/translations`: Borra todo el historial.
*   `GET /api/languages`: Lista los idiomas soportados.

## 🐳 Estructura Docker

El proyecto utiliza `docker-compose.yml` para gestionar tres servicios principales:

*   **backend**: Servidor Node.js/Express.
*   **frontend**: Servidor web para la interfaz de usuario.
*   **ollama**: Servicio de IA para las traducciones.

---
*Proyecto desarrollado para la asignatura de Desarrollo Web en Entorno Servidor / Cliente.*