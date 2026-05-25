import { z } from 'zod';
import { MapMarkerTypeSchema } from '../enums';

export const TownSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  regionId: z.uuid(),
  mapMarkerType: MapMarkerTypeSchema,
});

export const createTownSchema = z.object({
  name: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  regionId: z.uuid(),
  mapMarkerType: MapMarkerTypeSchema,
});

export const updateTownSchema = createTownSchema.partial();

export const townParamsSchema = z.object({
  id: z.uuid(),
});

export type Town = z.infer<typeof TownSchema>;
export type CreateTown = z.infer<typeof createTownSchema>;
export type UpdateTown = z.infer<typeof updateTownSchema>;
export type TownParams = z.infer<typeof townParamsSchema>;
