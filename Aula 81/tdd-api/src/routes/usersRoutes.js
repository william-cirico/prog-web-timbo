const router = require("express").Router();

const usersControllers = require("../controllers/usersControllers");

router.get("/", usersControllers.getUsers);
router.post("/", usersControllers.createUser);
router.put("/:id", usersControllers.updateUser);
router.delete("/:id", usersControllers.removeUser);

module.exports = router;