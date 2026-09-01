// src/routes/event.routes.ts
import { Router } from "express";
import { eventController } from "../controllers/event.controller";
import { authMiddleware, requireRole } from "../middlewares/auth.middleware";

export const eventRoutes = Router();

// Públicas
eventRoutes.get("/", eventController.list);

// Precisa vir ANTES de "/:id" — senão o Express interpreta "mine" como um id
eventRoutes.get("/mine", authMiddleware, requireRole("ORGANIZER"), eventController.mine);

eventRoutes.get("/:id", eventController.getById);

// Protegidas — apenas ORGANIZER
eventRoutes.post("/", authMiddleware, requireRole("ORGANIZER"), eventController.create);
eventRoutes.put("/:id", authMiddleware, requireRole("ORGANIZER"), eventController.update);
eventRoutes.patch(
  "/:id/status",
  authMiddleware,
  requireRole("ORGANIZER"),
  eventController.updateStatus
);
eventRoutes.delete("/:id", authMiddleware, requireRole("ORGANIZER"), eventController.cancel);