const prisma = require("../../db/prisma");

exports.getCategories = () => {
  return prisma.category.findMany();
};

exports.getProducts = () => {
  return prisma.product.findMany({
    include: {
      category: true,
      images: true,
    },
  });
};

exports.getProductBySlug = (slug) => {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: true,
    },
  });
};