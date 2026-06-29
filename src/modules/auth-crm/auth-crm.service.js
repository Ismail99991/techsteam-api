const prisma = require("../../db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.CRM_JWT_SECRET || "crm-dev-secret-change-in-production";

// Логин сотрудника CRM
exports.login = async (email, password) => {
  const user = await prisma.crmUser.findUnique({ where: { email } });
  if (!user) return { ok: false };

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return { ok: false };

  const token = jwt.sign(
    { crmUserId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "8h" } // короткий срок для CRM
  );

  return {
    ok: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

// Создание сотрудника (только админом)
exports.createCrmUser = async ({ email, password, name, role }) => {
  const existing = await prisma.crmUser.findUnique({ where: { email } });
  if (existing) throw new Error("Email already in use");

  const passwordHash = await bcrypt.hash(password, 10);

  return prisma.crmUser.create({
    data: { email, passwordHash, name, role: role || "MANAGER" },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
};

// Получить всех сотрудников
exports.getCrmUsers = () => {
  return prisma.crmUser.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
};

// Получить сотрудника по ID
exports.getCrmUserById = (id) => {
  return prisma.crmUser.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
};

// Обновить сотрудника
exports.updateCrmUser = async (id, data) => {
  const updateData = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.role !== undefined) updateData.role = data.role;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.password) updateData.passwordHash = await bcrypt.hash(data.password, 10);

  return prisma.crmUser.update({
    where: { id },
    data: updateData,
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
};

// Удалить сотрудника
exports.deleteCrmUser = (id) => {
  return prisma.crmUser.delete({ where: { id } });
};

// ����� ������ ����������� (��������������)
exports.changePassword = async (userId, currentPassword, newPassword) => {
  const user = await prisma.crmUser.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!match) throw new Error("Current password is incorrect");

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.crmUser.update({
    where: { id: userId },
    data: { passwordHash },
  });

  return { ok: true };
};
