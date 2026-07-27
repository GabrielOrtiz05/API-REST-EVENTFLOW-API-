// src/schemas/category.schema.ts
import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, "Nome da categoria muito curto"),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;