const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ticketsRoutes = require("./routes/tickets.routes");

const app = express();

const origenesPermitidos = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origenesPermitidos.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "10kb" }));

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