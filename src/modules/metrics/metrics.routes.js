const router = require("express").Router();
const prisma = require("../../db/prisma");

// track visit
router.post("/track", async (req, res) => {
  const { path, referrer } = req.body;

  await prisma.visit.create({
    data: {
      path,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      referrer: referrer || null,
    },
  });

  res.json({ ok: true });
});

module.exports = router;