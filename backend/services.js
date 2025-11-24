// backend/services.js
import db from "./db.js";

// Idiomas permitidos
export const SUPPORTED_LANGS = ["es", "de", "zh"];

// Validar idioma
export function validarIdioma(code) {
  return SUPPORTED_LANGS.includes(code);
}

// Validar texto
export function validarTexto(text) {
  if (!text || typeof text !== "string") {
    throw new Error("El texto debe ser una cadena válida.");
  }
  if (text.trim().length === 0) {
    throw new Error("El texto no puede estar vacío.");
  }
  if (text.length > 5000) {
    throw new Error("El texto no puede superar los 5000 caracteres.");
  }
}

// Guardar traducción en BD SQLite
function guardarTraduccion(data) {
  const stmt = db.prepare(`
    INSERT INTO traducciones 
      (texto_original, texto_traducido, idioma_origen, idioma_destino, modelo, duration_ms)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    data.texto_original,
    data.texto_traducido,
    data.idioma_origen,
    data.idioma_destino,
    data.modelo,
    data.duration_ms
  );

  return db.prepare(`SELECT * FROM traducciones WHERE id = ?`).get(info.lastInsertRowid);
}

// Traducción usando Ollama
export async function traducir({ text, sourceLang, targetLang }) {
  validarTexto(text);

  if (!validarIdioma(sourceLang) || !validarIdioma(targetLang)) {
    throw new Error("Idioma no soportado.");
  }
  if (sourceLang === targetLang) {
    throw new Error("El idioma origen y destino deben ser diferentes.");
  }

  const API_URL = process.env.AI_API_URL;
  const MODEL = process.env.AI_MODEL || "mistral:7b";

  // --------------------------------------------------
  // PROMPT ULTRA RESTRICTIVO PARA MODELOS PEQUEÑOS
  // --------------------------------------------------
  const prompt = `
Traduce el siguiente texto del idioma ${sourceLang} al idioma ${targetLang}.
Debe cumplirse estrictamente lo siguiente:

- Responde SOLO con la traducción en ${targetLang}.
- NO añadas explicaciones.
- NO traduzcas a ningún otro idioma.
- NO añadas notas, paréntesis, ejemplos, comentarios.
- NO añadas el texto original.
- Devuelve SOLO la frase traducida.

Texto a traducir:
"${text}"
  `;

  const body = {
    model: MODEL,
    prompt,
    stream: false
  };

  const start = Date.now();

  const response = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(45000) // timeout de 45s
  });

  const duration_ms = Date.now() - start;

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(`Error llamando al modelo: ${msg}`);
  }

  const json = await response.json();

  let translated =
    json.response ||
    json.text ||
    json.output ||
    "";

  // --------------------------------------------------
  // LIMPIEZA AUTOMÁTICA DE RESPUESTAS INCÓMODAS
  // --------------------------------------------------
  translated = translated
    .replace(/\(.*?\)/g, "")                 // eliminar "(Alemán)", "(Francés)"...
    .replace(/^[\s\n]+|[\s\n]+$/g, "")       // recortar espacios y saltos
    .replace(/Traducción:/gi, "")            // quitar etiquetas típicas
    .replace(/^\s*[-•]\s*/g, "")             // quitar viñetas
    .trim();

  if (!translated || translated.length < 1) {
    throw new Error("La IA devolvió una traducción vacía.");
  }

  // Guardar traducción limpia en BD
  const saved = guardarTraduccion({
    texto_original: text,
    texto_traducido: translated,
    idioma_origen: sourceLang,
    idioma_destino: targetLang,
    modelo: MODEL,
    duration_ms
  });

  return saved;
}

// Obtener historial
export function obtenerHistorial({ sourceLang, targetLang, limit = 50 }) {
  let query = "SELECT * FROM traducciones";
  const params = [];

  if (sourceLang && targetLang) {
    query += " WHERE idioma_origen = ? AND idioma_destino = ?";
    params.push(sourceLang, targetLang);
  }

  query += " ORDER BY datetime(created_at) DESC LIMIT ?";
  params.push(limit);

  return db.prepare(query).all(...params);
}

// Obtener traducción por ID
export function obtenerTraduccionPorId(id) {
  const row = db.prepare("SELECT * FROM traducciones WHERE id = ?").get(id);

  if (!row) {
    throw new Error("No existe una traducción con ese ID.");
  }

  return row;
}

// Eliminar traducción por ID
export function eliminarTraduccion(id) {
  const info = db.prepare("DELETE FROM traducciones WHERE id = ?").run(id);
  return { deleted: info.changes > 0 };
}

// Vaciar historial
export function limpiarHistorial() {
  const info = db.prepare("DELETE FROM traducciones").run();
  return { deleted: info.changes };
}
