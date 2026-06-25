const router = require("express").Router();
const controller = require("./users.controller");
const { authMiddleware } = require("../auth/auth.middleware");

router.use(authMiddleware);

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;