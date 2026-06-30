const router = require("express").Router();
const controller = require("./cta.controller");
const { marketAuthMiddleware } = require("../middleware/marketAuth.middleware");

// Публичные
router.post("/callback", controller.createCallback);

// Защищённые (требуется JWT маркет-пользователя)
router.post("/quote-request", marketAuthMiddleware, controller.createQuoteRequest);
router.get("/quote-request", marketAuthMiddleware, controller.getMyQuoteRequests);

module.exports = router;