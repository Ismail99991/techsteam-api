const service = require("./events.service");

exports.track = async (req, res) => {
  const event = await service.trackEvent(req.body);
  res.json(event);
};

exports.getAll = async (req, res) => {
  res.json(await service.getEvents());
};

exports.stats = async (req, res) => {
  res.json(await service.getStats());
};