// src/services/category.service.ts
import { categoryRepository } from "../repositories/category.repositories";
import { CreateCategoryInput } from "../schemas/category.schema";
import { AppError } from "../middlewares/error.middleware";

export const categoryService = {
  async list() {
    return categoryRepository.findAll();
  },

  async create(input: CreateCategoryInput) {
    const existing = await categoryRepository.findByName(input.name);
    if (existing) {
      throw new AppError("Categoria já existe", 409);
    }
    return categoryRepository.create(input);
  },
};