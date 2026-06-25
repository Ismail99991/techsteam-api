const router = require("express").Router();
const controller = require("./orders.controller");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id/status", controller.updateStatus);
router.delete("/:id", controller.remove);

module.exports = router;