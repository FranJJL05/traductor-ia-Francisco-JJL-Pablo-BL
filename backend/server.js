// backend/server.js

// 1) Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// 2) Inicializar la base de datos (crea traducciones.db)
require('./db');

// 3) Leer variables de entorno
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || '0.0.0.0';

// 4) Crear aplicación Express
const app = express();

// 5) Middlewares
app.use(cors());
app.use(express.json());

// 6) Registrar rutas (las crearemos en el paso 2.3)
app.use('/api', require('./routes')); 

// 7) Ruta base opcional
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor funcionando',
    port: PORT,
    host: HOST
  });
});

// 8) Iniciar servidor
app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor iniciado en http://${HOST}:${PORT}`);
});

