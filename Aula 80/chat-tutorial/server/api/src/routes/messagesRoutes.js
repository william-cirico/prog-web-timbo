const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const messagesControllers = require("../controllers/messagesControllers");

// Criar uma mensagem
router.post("/", authMiddleware, messagesControllers.createMessage);

// Obter as mensagens de um chat
router.get("/:id", authMiddleware, messagesControllers.getMessagesFromChat);

module.exports = router;