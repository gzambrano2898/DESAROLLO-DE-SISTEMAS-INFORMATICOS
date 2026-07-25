const express = require("express");

const router = express.Router();

const controller = require("../controllers/tickets.controller");

router.get("/", controller.obtenerTickets);

router.get("/:id", controller.obtenerTicket);

router.post("/", controller.crearTicket);

router.put("/:id", controller.actualizarTicket);

router.delete("/:id", controller.eliminarTicket);

module.exports = router;