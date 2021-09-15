const router = require("express").Router();
const classesControllers = require("../controllers/classesControllers");
const authentication = require("../middlewares/authMiddleware");

router.get("/", authentication(["admin"]), classesControllers.getAllClasses);
router.post("/", authentication(["admin"]), classesControllers.createClass);

module.exports = router;