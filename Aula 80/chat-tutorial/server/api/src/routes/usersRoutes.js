const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const usersControllers = require("../controllers/usersControllers");

// Criar um usuário
router.post("/", usersControllers.createUser);

// Obter todos os usuários
router.get("/", usersControllers.getUsers);

// Obter as informações de um usuário
router.get("/me", authMiddleware, usersControllers.getUser);

module.exports = router;