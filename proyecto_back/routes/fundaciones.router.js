const express = require("express");
const router = express.Router();
const fundacionesController = require ("../controllers/fundaciones.controller");

router.post("/", fundacionesController.create)
router.get("/", fundacionesController.find)
router.get("/:id", fundacionesController.findOne)
router.put("/:id", fundacionesController.update)
router.delete("/:id", fundacionesController.remove)
module.exports = router