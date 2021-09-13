const router = require("express").Router();
const authControllers = require("../controllers/authControllers");

router.post("/login", authControllers.login);
router.post("/refreshToken", authControllers.refresh);

module.exports = router;