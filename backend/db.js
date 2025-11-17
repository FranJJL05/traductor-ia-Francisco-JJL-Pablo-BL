// backend/db.js
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// Ruta a la carpeta db/
const dbDirectory = path.join(__dirname, 'db');

// Crear carpeta backend/db/ si no existe
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

// Ruta al archivo de base de datos
const dbPath = path.join(dbDirectory, 'traducciones.db');

// Crear/abrir base de datos
const db = new Database(dbPath);

// Activar claves foráneas (opcional pero recomendado)
db.pragma('foreign_keys = ON');

// -------------------------------------------------------
// 📌 CREACIÓN DE TABLAS AUTOMÁTICA
// -------------------------------------------------------
const createTableSQL = `
CREATE TABLE IF NOT EXISTS traducciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  texto_original TEXT NOT NULL,
  texto_traducido TEXT NOT NULL,
  idioma_origen TEXT NOT NULL,
  idioma_destino TEXT NOT NULL,
  modelo TEXT,
  duration_ms INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

db.exec(createTableSQL);

// Exportar instancia
module.exports = db;

