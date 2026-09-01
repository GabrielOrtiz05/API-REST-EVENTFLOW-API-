// src/repositories/category.repository.ts
import { prisma } from "../utils/prisma";
import { CreateCategoryInput } from "../schemas/category.schema";

export const categoryRepository = {
  findAll() {
    return prisma.category.findMany({ orderBy: { name: "asc" } });
  },

  findByName(name: string) {
    return prisma.category.findUnique({ where: { name } });
  },

  findById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  },

  create(data: CreateCategoryInput) {
    return prisma.category.create({ data });
  },
};