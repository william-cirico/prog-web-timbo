const router = require("express").Router();
const usersControllers = require("../controllers/usersControllers");
const authentication = require("../middlewares/authMiddleware");

router.get("/", authentication(["student", "teacher", "admin"], usersControllers.getUser))

module.exports = router;