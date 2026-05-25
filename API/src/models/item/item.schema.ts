import { Category, Class, Faction, SuperClass } from '@/generated/enums';
import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string(),
  shortName: z.string().optional(),
  category: z.enum(Category),
  superClass: z.enum(SuperClass),
  class: z.enum(Class),
  faction: z.enum(Faction),
  nbByCrate: z.number().default(100),
  maxQuantity: z.number().default(300),
  icon: z.url().nullish(),
  attributes: z.record(z.string(), z.any()).optional(),
});

export const updateItemSchema = createItemSchema.partial();

export const itemParamsSchema = z.object({
  id: z.uuid(),
});

export type CreateItem = z.infer<typeof createItemSchema>;
export type UpdateItem = z.infer<typeof updateItemSchema>;
export type ItemParams = z.infer<typeof itemParamsSchema>;
