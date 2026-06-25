const prisma = require("../../db/prisma");

// CREATE
exports.createProduct = (data) => {
  return prisma.product.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
    },
  });
};

// UPDATE
exports.updateProduct = (id, data) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

// DELETE
exports.deleteProduct = (id) => {
  return prisma.product.delete({
    where: { id },
  });
};