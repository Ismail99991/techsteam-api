const prisma = require("../../db/prisma");

// POST /api/market/callback â€” Ð·Ð°ÐºÐ°Ð· Ð¾Ð±Ñ€Ð°Ñ‚Ð½Ð¾Ð³Ð¾ Ð·Ð²Ð¾Ð½ÐºÐ° (Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¹)
exports.createCallback = (data) => {
  return prisma.callbackRequest.create({
    data: {
      name: data.name,
      phone: data.phone,
      comment: data.comment || null,
    },
  });
};

// POST /api/market/quote-request â€” Ð·Ð°Ð¿Ñ€Ð¾Ñ ÐšÐŸ (Ð°Ð²Ñ‚Ð¾Ñ€Ð¸Ð·Ð¾Ð²Ð°Ð½Ð½Ñ‹Ð¹ Ð¼Ð°Ñ€ÐºÐµÑ‚-Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒ)
exports.createQuoteRequest = async ({ marketUserId, productId, message, payload }) => {
  return prisma.quoteRequest.create({
    data: {
      marketUserId,
      productId: productId || null,
      message: message || null,
      payload: payload || null,
      status: "NEW",
    },
    include: {
      product: true,
      marketUser: {
        select: { id: true, email: true, name: true, phone: true },
      },
    },
  });
};

// GET /api/market/quote-request â€” ÑÐ²Ð¾Ð¸ Ð·Ð°ÑÐ²ÐºÐ¸
exports.getMyQuoteRequests = (marketUserId) => {
  return prisma.quoteRequest.findMany({
    where: { marketUserId },
    include: {
      product: true,
      attachments: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
// GET /api/market/callback — âñå çàÿâêè (äëÿ CRM)
exports.getAllCallbacks = () => {
  return prisma.callbackRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
};

// PUT /api/market/callback/:id/status — ñìåíà ñòàòóñà (äëÿ CRM)
exports.updateCallbackStatus = (id, status) => {
  return prisma.callbackRequest.update({
    where: { id },
    data: { status },
  });
};

// GET /api/market/quote-request/all — âñå çàïðîñû ÊÏ (äëÿ CRM)
exports.getAllQuoteRequests = () => {
  return prisma.quoteRequest.findMany({
    include: {
      product: true,
      marketUser: {
        select: { id: true, email: true, name: true, phone: true },
      },
      attachments: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// PUT /api/market/quote-request/:id/status — ñìåíà ñòàòóñà (äëÿ CRM)
exports.updateQuoteRequestStatus = (id, status) => {
  return prisma.quoteRequest.update({
    where: { id },
    data: { status },
    include: {
      product: true,
      marketUser: {
        select: { id: true, email: true, name: true, phone: true },
      },
    },
  });
};

// GET /api/market/quote-request/:id — îäèí çàïðîñ ÊÏ ïî ID (äëÿ CRM)
exports.getQuoteRequestById = (id) => {
  return prisma.quoteRequest.findUnique({
    where: { id },
    include: {
      product: true,
      marketUser: {
        select: { id: true, email: true, name: true, phone: true },
      },
      attachments: true,
    },
  });
};
