// src/services/event.service.ts
import { eventRepository } from "../repositories/event.repository";
import { categoryRepository } from "../repositories/category.repositories";
import { AppError } from "../middlewares/error.middleware";
import {
  CreateEventInput,
  ListEventsQuery,
  UpdateEventInput,
  UpdateEventStatusInput,
} from "../schemas/event.schema";

async function findEventOrThrow(id: string) {
  const event = await eventRepository.findById(id);
  if (!event) {
    throw new AppError("Evento não encontrado", 404);
  }
  return event;
}

function assertIsOwner(event: { organizerId: string }, userId: string) {
  if (event.organizerId !== userId) {
    throw new AppError("Você não tem permissão para alterar este evento", 403);
  }
}

export const eventService = {
  listPublished(query: ListEventsQuery) {
    return eventRepository.findPublished(query);
  },

  listMine(organizerId: string) {
    return eventRepository.findByOrganizer(organizerId);
  },

  async getById(id: string) {
    return findEventOrThrow(id);
  },

  async create(organizerId: string, input: CreateEventInput) {
    const category = await categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new AppError("Categoria informada não existe", 404);
    }
    return eventRepository.create(organizerId, input);
  },

  async update(id: string, organizerId: string, input: UpdateEventInput) {
    const event = await findEventOrThrow(id);
    assertIsOwner(event, organizerId);
    return eventRepository.update(id, input);
  },

  async updateStatus(id: string, organizerId: string, input: UpdateEventStatusInput) {
    const event = await findEventOrThrow(id);
    assertIsOwner(event, organizerId);
    return eventRepository.updateStatus(id, input.status);
  },

  async cancel(id: string, organizerId: string) {
    const event = await findEventOrThrow(id);
    assertIsOwner(event, organizerId);
    return eventRepository.updateStatus(id, "CANCELLED");
  },
};