const router = require("express").Router();
const teachersControllers = require("../controllers/teachersControllers");
const authentication = require("../middlewares/authMiddleware");

router.get("/", authentication(["admin"]), teachersControllers.getTeachers);
router.post("/", authentication(["admin"]), teachersControllers.createTeacher);
router.get("/classes", authentication(["teacher"]), teachersControllers.getClasses);

module.exports = router;