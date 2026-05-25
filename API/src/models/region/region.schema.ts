import { z } from 'zod';

export const createRegionSchema = z.object({
  name: z.string(),
  gameRegionId: z.number().int().optional(),
});

export const updateRegionSchema = createRegionSchema.partial();

export const regionParamsSchema = z.object({
  id: z.uuid(),
});

export type CreateRegion = z.infer<typeof createRegionSchema>;
export type UpdateRegion = z.infer<typeof updateRegionSchema>;
export type RegionParams = z.infer<typeof regionParamsSchema>;
