const service = require("./cta.service");

// POST /api/market/callback â€” Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¹
exports.createCallback = async (req, res) => {
  try {
    const data = await service.createCallback(req.body);
    res.status(201).json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// POST /api/market/quote-request â€” Ð·Ð°Ñ‰Ð¸Ñ‰Ñ‘Ð½Ð½Ñ‹Ð¹ (Ð¼Ð°Ñ€ÐºÐµÑ‚-Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒ)
exports.createQuoteRequest = async (req, res) => {
  try {
    const data = await service.createQuoteRequest({
      marketUserId: req.marketUser.marketUserId,
      productId: req.body.productId,
      message: req.body.message,
      payload: req.body.payload,
    });
    res.status(201).json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// GET /api/market/quote-request â€” Ð¼Ð¾Ð¸ Ð·Ð°ÑÐ²ÐºÐ¸
exports.getMyQuoteRequests = async (req, res) => {
  const data = await service.getMyQuoteRequests(req.marketUser.marketUserId);
  res.json(data);
};
// GET /api/market/callback — âñå çàÿâêè (äëÿ CRM)
exports.getAllCallbacks = async (req, res) => {
  const data = await service.getAllCallbacks();
  res.json(data);
};

// PUT /api/market/callback/:id/status — ñìåíà ñòàòóñà (äëÿ CRM)
exports.updateCallbackStatus = async (req, res) => {
  try {
    const data = await service.updateCallbackStatus(req.params.id, req.body.status);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// GET /api/market/quote-request/all — âñå çàïðîñû ÊÏ (äëÿ CRM)
exports.getAllQuoteRequests = async (req, res) => {
  const data = await service.getAllQuoteRequests();
  res.json(data);
};

// PUT /api/market/quote-request/:id/status — ñìåíà ñòàòóñà (äëÿ CRM)
exports.updateQuoteRequestStatus = async (req, res) => {
  try {
    const data = await service.updateQuoteRequestStatus(req.params.id, req.body.status);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// GET /api/market/quote-request/:id — îäèí çàïðîñ ÊÏ (äëÿ CRM)
exports.getQuoteRequestById = async (req, res) => {
  const data = await service.getQuoteRequestById(req.params.id);
  if (!data) return res.status(404).json({ error: "Not found" });
  res.json(data);
};
