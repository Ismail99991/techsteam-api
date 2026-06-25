const router = require("express").Router();
const controller = require("./auth.controller");
const { authMiddleware } = require("./auth.middleware");

router.post("/login", controller.login);
router.get("/me", authMiddleware, controller.getMe);

module.exports = router;