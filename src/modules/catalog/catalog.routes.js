const router = require("express").Router();
const controller = require("./catalog.controller");

router.get("/categories", controller.getCategories);
router.get("/products", controller.getProducts);
router.get("/products/:slug", controller.getProductBySlug);

module.exports = router;