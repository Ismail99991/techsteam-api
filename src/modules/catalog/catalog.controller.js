const service = require("./catalog.service");

exports.getCategories = async (req, res) => {
  const data = await service.getCategories();
  res.json(data);
};

exports.getProducts = async (req, res) => {
  const data = await service.getProducts();
  res.json(data);
};

exports.getProductBySlug = async (req, res) => {
  const data = await service.getProductBySlug(req.params.slug);

  if (!data) {
    return res.status(404).json({ error: "not found" });
  }

  res.json(data);
};