const express = require("express");
const router = express.Router();

// Importando os controllers
const usuariosController = require("../controllers/usuariosControllers");

// Importando os validators
const usuariosValidator = require("../validations/usuariosValidations");

router.get("/", usuariosController.getAll);
router.get("/:id", usuariosController.getOne);
router.post("/", usuariosValidator.post, usuariosController.create);
router.put("/:id", usuariosValidator.put, usuariosController.update);
router.delete("/:id", usuariosController.remove);

module.exports = router;