import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// 🔹 Cargar variables de entorno
dotenv.config();

// 🔹 Importar DB (inicializa automáticamente)
import "./db.js";

// 🔹 Importar rutas
import router from "./routes.js";

// 🔹 Servidor
const app = express();

const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || "0.0.0.0";

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Registrar rutas
app.use("/api", router);

// 🔹 Ruta base opcional
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Servidor funcionando",
    host: HOST,
    port: PORT,
  });
});

// 🔹 Iniciar servidor
app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor escuchando en http://${HOST}:${PORT}`);
});

export default app;


