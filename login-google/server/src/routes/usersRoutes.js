const multer = require("multer");
const multerConfig = require("../config/multer");
const usersControllers = require("../controllers/usersControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/", multer(multerConfig).single("avatar"), usersControllers.createUser);
router.get("/", authMiddleware, usersControllers.getUser);

module.exports = router;