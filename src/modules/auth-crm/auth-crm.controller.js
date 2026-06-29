const service = require("./auth-crm.service");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const result = await service.login(email, password);
  if (!result.ok) {
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  }
  res.json(result);
};

exports.getMe = async (req, res) => {
  const user = await service.getCrmUserById(req.crmUser.crmUserId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.getAll = async (req, res) => {
  const data = await service.getCrmUsers();
  res.json(data);
};

exports.getOne = async (req, res) => {
  const data = await service.getCrmUserById(req.params.id);
  if (!data) return res.status(404).json({ error: "not found" });
  res.json(data);
};

exports.create = async (req, res) => {
  try {
    const data = await service.createCrmUser(req.body);
    res.status(201).json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await service.updateCrmUser(req.params.id, req.body);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await service.deleteCrmUser(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
// Смена пароля
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current password and new password are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters" });
    }
    const result = await service.changePassword(req.crmUser.crmUserId, currentPassword, newPassword);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
