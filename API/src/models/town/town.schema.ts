import { z } from 'zod';

export const createTownSchema = z.object({
  name: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  regionId: z.uuid(),
});

export const updateTownSchema = createTownSchema.partial();

export const townParamsSchema = z.object({
  id: z.uuid(),
});

export type CreateTown = z.infer<typeof createTownSchema>;
export type UpdateTown = z.infer<typeof updateTownSchema>;
export type TownParams = z.infer<typeof townParamsSchema>;
