const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/usersControllers");

const authentication = require("../middlewares/authentication");

router.get("/", authentication(["admin"]), usersControllers.getAll);
router.post("/", usersControllers.create);

module.exports = router;