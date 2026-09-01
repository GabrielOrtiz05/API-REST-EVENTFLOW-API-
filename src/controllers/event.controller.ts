// src/controllers/event.controller.ts
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { eventService } from "../services/event.service";
import {
  createEventSchema,
  listEventsQuerySchema,
  updateEventSchema,
  updateEventStatusSchema,
} from "../schemas/event.schema";
import { AppError } from "../middlewares/error.middleware";
import { requireParam } from "../utils/params";

export const eventController = {
  async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const query = listEventsQuerySchema.parse(req.query);
      const result = await eventService.listPublished(query);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async mine(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AppError("Não autenticado", 401);
      const events = await eventService.listMine(req.user.id);
      return res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = requireParam(req.params.id, "id");
      const event = await eventService.getById(id);
      return res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  },

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AppError("Não autenticado", 401);
      const input = createEventSchema.parse(req.body);
      const event = await eventService.create(req.user.id, input);
      return res.status(201).json(event);
    } catch (err) {
      next(err);
    }
  },

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AppError("Não autenticado", 401);
      const id = requireParam(req.params.id, "id");
      const input = updateEventSchema.parse(req.body);
      const event = await eventService.update(id, req.user.id, input);
      return res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  },

  async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AppError("Não autenticado", 401);
      const id = requireParam(req.params.id, "id");
      const input = updateEventStatusSchema.parse(req.body);
      const event = await eventService.updateStatus(id, req.user.id, input);
      return res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  },

  async cancel(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AppError("Não autenticado", 401);
      const id = requireParam(req.params.id, "id");
      const event = await eventService.cancel(id, req.user.id);
      return res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  },
};