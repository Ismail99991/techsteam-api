const service = require("./orders.service");

// CREATE
exports.create = async (req, res) => {
  try {
    const order = await service.createOrder(req.body);
    res.json(order);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  const data = await service.getOrders();
  res.json(data);
};

// GET ONE
exports.getOne = async (req, res) => {
  const data = await service.getOrderById(req.params.id);
  if (!data) return res.status(404).json({ error: "not found" });
  res.json(data);
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const data = await service.updateStatus(
      req.params.id,
      req.body.status
    );
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  const data = await service.deleteOrder(req.params.id);
  res.json(data);
};