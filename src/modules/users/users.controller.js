const service = require("./users.service");

exports.getAll = async (req, res) => {
  const data = await service.getUsers();
  res.json(data);
};

exports.getOne = async (req, res) => {
  const data = await service.getUserById(req.params.id);
  if (!data) return res.status(404).json({ error: "not found" });
  res.json(data);
};

exports.create = async (req, res) => {
  try {
    const data = await service.createUser(req.body);
    res.status(201).json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await service.updateUser(req.params.id, req.body);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await service.deleteUser(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};