const router = require("express").Router();
const controller = require("./events.controller");

// frontend tracking
router.post("/track", controller.track);

// admin
router.get("/", controller.getAll);
router.get("/stats", controller.stats);

module.exports = router;