const router = require("express").Router();
const studentsControllers = require("../controllers/studentsControllers");
const authentication = require("../middlewares/authMiddleware");

router.get("/", authentication(["admin"]), studentsControllers.getStudents);
router.post("/", authentication(["admin"]), studentsControllers.createStudent);
// router.get("/:id/classes", authentication(["student", "teacher"]), studentsControllers.getClasses);

module.exports = router;