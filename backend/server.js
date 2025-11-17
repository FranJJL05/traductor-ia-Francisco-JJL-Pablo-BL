// backend/server.js

// 1. Inicializar la base de datos (crea la carpeta y traducciones.db)
require('./db');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Servidor funcionando y base de datos inicializada.');
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
