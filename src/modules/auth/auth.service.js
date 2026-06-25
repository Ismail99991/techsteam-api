const prisma = require("../../db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "brox-dev-secret";

exports.login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return { ok: false };

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) return { ok: false };

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    ok: true,
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};

exports.getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, createdAt: true },
  });
  return user;
};