// src/controllers/auth.controller.ts
import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const input = registerSchema.parse(req.body);
      const result = await authService.register(input);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const input = loginSchema.parse(req.body);
      const result = await authService.login(input);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};