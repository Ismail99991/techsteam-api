const prisma = require("../../db/prisma");

// CREATE EVENT
exports.trackEvent = (data) => {
  return prisma.event.create({
    data: {
      type: data.type,
      path: data.path,
      productId: data.productId || null,
      userId: data.userId || null,
      metadata: data.metadata || {},
    },
  });
};

// GET EVENTS (ADMIN)
exports.getEvents = () => {
  return prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
};

// STATS (простая аналитика)
exports.getStats = async () => {
  const total = await prisma.event.count();

  const byType = await prisma.event.groupBy({
    by: ["type"],
    _count: true,
  });

  return { total, byType };
};