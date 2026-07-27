// src/controllers/category.controller.ts
import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/category.service";
import { createCategorySchema } from "../schemas/category.schema";

export const categoryController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.list();
      return res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = createCategorySchema.parse(req.body);
      const category = await categoryService.create(input);
      return res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  },
};