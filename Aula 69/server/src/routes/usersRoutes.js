const router = require("express").Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
const usersControllers = require("../controllers/usersControllers");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, usersControllers.get);
router.post("/", multer(multerConfig).single("avatar"), usersControllers.create);

module.exports = router;