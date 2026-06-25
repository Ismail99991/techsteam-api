const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      email: "admin@brox.local",
      passwordHash: hash,
    },
  });

  console.log("admin created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());