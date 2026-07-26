const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ticketsRoutes = require("./routes/tickets.routes");

const app = express();

const origenesPermitidos = [
  "http://localhost:5173",
  "https://desarollo-de-sistemas-informaticos.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

const configuracionCors = {
  origin: (origin, callback) => {
    if (!origin || origenesPermitidos.includes(origin)) {
      return callback(null, true);
    }

    console.log("Origen bloqueado por CORS:", origin);
    return callback(new Error("Origen no permitido por CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(configuracionCors));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Help Desk funcionando correctamente",
  });
});

app.use("/tickets", ticketsRoutes);

app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});