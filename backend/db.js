// backend/db.js
import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

// Necesario en ES Modules para __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear carpeta db/ si no existe
const dbDirectory = path.join(__dirname, "db");
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

// Crear/abrir base de datos
const dbPath = path.join(dbDirectory, "traducciones.db");
const db = new Database(dbPath);

// Activar claves foráneas
db.pragma("foreign_keys = ON");

// Crear tabla si no existe
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

// Export ESM
export default db;


