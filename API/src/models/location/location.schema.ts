import { Faction, LocationType } from '@/generated/enums';
import { z } from 'zod';

export const createLocationSchema = z.object({
  type: z.enum(LocationType),
  faction: z.enum(Faction),
  iconType: z.number().int().default(0),
  flags: z.number().int().default(0),
  viewDirection: z.number().int().default(0),
  longitude: z.number(),
  latitude: z.number(),
  townId: z.uuid(),
});

export const updateLocationSchema = createLocationSchema.partial();

export const locationParamsSchema = z.object({
  id: z.uuid(),
});

export type CreateLocation = z.infer<typeof createLocationSchema>;
export type UpdateLocation = z.infer<typeof updateLocationSchema>;
export type LocationParams = z.infer<typeof locationParamsSchema>;
