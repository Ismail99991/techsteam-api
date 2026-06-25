const service = require("./admin.service");

exports.createProduct = async (req, res) => {
  const data = await service.createProduct(req.body);
  res.json(data);
};

exports.updateProduct = async (req, res) => {
  const data = await service.updateProduct(req.params.id, req.body);
  res.json(data);
};

exports.deleteProduct = async (req, res) => {
  const data = await service.deleteProduct(req.params.id);
  res.json(data);
};