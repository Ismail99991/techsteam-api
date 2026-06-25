const service = require("./auth.service");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const result = await service.login(email, password);

  if (!result.ok) {
    return res.status(401).json({ ok: false });
  }

  res.json(result);
};

exports.getMe = async (req, res) => {
  const user = await service.getMe(req.user.userId);

  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  res.json(user);
};