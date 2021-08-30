// const express = require("express");
// const router = express.Router();

const router = require("express").Router();

const authControllers = require("../controllers/authControllers");

router.post("/login-google", authControllers.loginGoogle);
router.post("/refresh", authControllers.refresh);

module.exports = router;

