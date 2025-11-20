// backend/routes.js

const express = require('express');
const router = express.Router();

// Rutas vacías por ahora

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;