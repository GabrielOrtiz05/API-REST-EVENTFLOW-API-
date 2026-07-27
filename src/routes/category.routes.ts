// src/routes/category.routes.ts
import { Router } from "express";
import { categoryController } from "../controllers/category.controller";
import { authMiddleware, requireRole } from "../middlewares/auth.middleware";

export const categoryRoutes = Router();

// Pública: qualquer um pode ver as categorias existentes
categoryRoutes.get("/", categoryController.list);

// Protegida: só organizador pode criar categoria
categoryRoutes.post("/", authMiddleware, requireRole("ORGANIZER"), categoryController.create);