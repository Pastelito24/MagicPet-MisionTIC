const express = require("express");
const router = express.Router();
const mascotasController = require("../controllers/mascotas.controller");

router.post("/", mascotasController.create)
router.get("/", mascotasController.find)
router.get("/:id", mascotasController.findOne)
router.put("/:id", mascotasController.update)
router.delete("/:id", mascotasController.remove)
module.exports = router