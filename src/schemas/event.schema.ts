// src/schemas/event.schema.ts
import { z } from "zod";

export const createEventSchema = z.object({
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  name: z.string().min(3, "Nome muito curto"),
  description: z.string().min(10, "Descrição muito curta"),
  imageUrl: z.string().url("URL de imagem inválida").optional(),
  city: z.string().min(2, "Cidade inválida"),
  address: z.string().min(5, "Endereço muito curto"),
  eventDate: z.coerce.date({ message: "Data do evento inválida" }),
});

export const updateEventSchema = createEventSchema.partial();

export const updateEventStatusSchema = z.object({
  status: z.enum(["DRAFT", "PUBLISHED", "FINISHED", "CANCELLED"]),
});

export const listEventsQuerySchema = z.object({
  categoryId: z.string().optional(),
  city: z.string().optional(),
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type UpdateEventStatusInput = z.infer<typeof updateEventStatusSchema>;
export type ListEventsQuery = z.infer<typeof listEventsQuerySchema>;