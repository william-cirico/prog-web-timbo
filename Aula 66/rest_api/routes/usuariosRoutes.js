const express = require("express");
const router = express.Router();

// Importando os controllers
const usuariosController = require("../controllers/usuariosControllers");
const projetosController = require("../controllers/projetosController");

// Importando os validators
const usuariosValidations = require("../validations/usuariosValidations");
const projetosValidations = require("../validations/projetosValidations");

router.get("/", usuariosController.getAll);
router.get("/:id", usuariosController.getOne);
router.post("/", usuariosValidations.post, usuariosController.create);
router.put("/:id", usuariosValidations.put, usuariosController.update);
router.delete("/:id", usuariosController.remove);

router.get("/:id/projetos", projetosController.getAllByUserId);
router.post("/:id/projetos", projetosValidations.post, projetosController.createForUser);
router.delete("/:id/projetos", projetosValidations.delete, projetosController.removeForUser);

module.exports = router;