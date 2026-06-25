const router = require("express").Router();
const controller = require("./admin.controller");

router.post("/products", controller.createProduct);
router.put("/products/:id", controller.updateProduct);
router.delete("/products/:id", controller.deleteProduct);

module.exports = router;