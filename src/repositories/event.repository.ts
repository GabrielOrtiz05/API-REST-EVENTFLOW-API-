// src/repositories/event.repository.ts
import { Prisma, EventStatus } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { omitUndefined } from "../utils/object";
import { CreateEventInput, ListEventsQuery, UpdateEventInput } from "../schemas/event.schema";

export const eventRepository = {
  async findPublished(query: ListEventsQuery) {
    const where: Prisma.EventWhereInput = {
      status: "PUBLISHED",
      ...(query.categoryId && { categoryId: query.categoryId }),
      ...(query.city && { city: { contains: query.city, mode: "insensitive" } }),
      ...(query.fromDate || query.toDate
        ? {
            eventDate: {
              ...(query.fromDate && { gte: query.fromDate }),
              ...(query.toDate && { lte: query.toDate }),
            },
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: { category: true, ticketTypes: true },
        orderBy: { eventDate: "asc" },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      prisma.event.count({ where }),
    ]);

    return { items, total, page: query.page, limit: query.limit };
  },

  findByOrganizer(organizerId: string) {
    return prisma.event.findMany({
      where: { organizerId },
      include: { category: true, ticketTypes: true },
      orderBy: { createdAt: "desc" },
    });
  },

  findById(id: string) {
    return prisma.event.findUnique({
      where: { id },
      include: { category: true, ticketTypes: true, organizer: { select: { id: true, name: true } } },
    });
  },

  create(organizerId: string, data: CreateEventInput) {
    return prisma.event.create({
      data: omitUndefined({ ...data, organizerId }),
      include: { category: true },
    });
  },

  update(id: string, data: UpdateEventInput) {
    return prisma.event.update({
      where: { id },
      data: omitUndefined(data),
      include: { category: true },
    });
  },

  updateStatus(id: string, status: EventStatus) {
    return prisma.event.update({
      where: { id },
      data: { status },
    });
  },
};