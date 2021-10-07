const router = require("express").Router();

const usersControllers = require("../controllers/usersControllers");

router.post("/", usersControllers.createUser);

module.exports = router;