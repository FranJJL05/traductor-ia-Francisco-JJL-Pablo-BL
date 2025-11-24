// backend/routes.js
import express from "express";
import {
  traducir,
  SUPPORTED_LANGS,
  validarIdioma,
  obtenerHistorial,
  obtenerTraduccionPorId,
  eliminarTraduccion,
  limpiarHistorial
} from "./services.js";

const router = express.Router();

// ------------------------------------------------------
// GET /api/health → comprobar que el backend funciona
// ------------------------------------------------------
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ------------------------------------------------------
// GET /api/languages → idiomas soportados
// ------------------------------------------------------
router.get("/languages", (req, res) => {
  const names = {
    es: "Español",
    de: "Alemán",
    zh: "Chino"
  };

  const list = SUPPORTED_LANGS.map(code => ({
    code,
    name: names[code] || code
  }));

  res.json(list);
});

// ------------------------------------------------------
// POST /api/translate → traducir texto
// ------------------------------------------------------
router.post("/translate", async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body;

    if (!text || !sourceLang || !targetLang) {
      return res.status(400).json({
        error: "Campos requeridos",
        message: "Debe incluir 'text', 'sourceLang' y 'targetLang'"
      });
    }

    if (!validarIdioma(sourceLang) || !validarIdioma(targetLang)) {
      return res.status(400).json({
        error: "Idioma no soportado",
        message: "Idiomas válidos: es, de, zh"
      });
    }

    const result = await traducir({ text, sourceLang, targetLang });
    res.json(result);

  } catch (error) {
    console.error("❌ Error en /translate:", error);
    res.status(500).json({
      error: "Fallo en la traducción",
      message: error.message
    });
  }
});

// ------------------------------------------------------
// GET /api/translations → historial de traducciones
// ------------------------------------------------------
router.get("/translations", (req, res) => {
  try {
    const { sourceLang, targetLang, limit } = req.query;

    const data = obtenerHistorial({
      sourceLang,
      targetLang,
      limit: limit ? Number(limit) : 50
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Fallo al obtener historial",
      message: error.message
    });
  }
});

// ------------------------------------------------------
// GET /api/translations/:id → obtener una traducción
// ------------------------------------------------------
router.get("/translations/:id", (req, res) => {
  try {
    const row = obtenerTraduccionPorId(req.params.id);
    res.json(row);

  } catch (error) {
    res.status(404).json({
      error: "No encontrado",
      message: error.message
    });
  }
});

// ------------------------------------------------------
// DELETE /api/translations/:id → borrar una traducción
// ------------------------------------------------------
router.delete("/translations/:id", (req, res) => {
  try {
    const result = eliminarTraduccion(req.params.id);
    res.json(result);

  } catch (error) {
    res.status(500).json({
      error: "Fallo al borrar",
      message: error.message
    });
  }
});

// ------------------------------------------------------
// DELETE /api/translations → borrar todo el historial
// ------------------------------------------------------
router.delete("/translations", (req, res) => {
  try {
    const result = limpiarHistorial();
    res.json(result);

  } catch (error) {
    res.status(500).json({
      error: "Fallo al borrar historial",
      message: error.message
    });
  }
});

export default router;
