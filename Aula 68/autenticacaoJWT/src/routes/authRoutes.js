const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");

router.post("/login", authControllers.login);
router.post("/refresh", authControllers.refresh);

module.exports = router;