import { z } from 'zod';
import { FactionSchema, LocationTypeSchema } from '../enums';

export const LocationSchema = z.object({
  id: z.uuid(),
  type: LocationTypeSchema,
  faction: FactionSchema,
  iconType: z.number().int(),
  flags: z.number().int(),
  viewDirection: z.number().int(),
  longitude: z.number(),
  latitude: z.number(),
  townId: z.uuid(),
});

export const createLocationSchema = z.object({
  type: LocationTypeSchema,
  faction: FactionSchema,
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

export type Location = z.infer<typeof LocationSchema>;
export type CreateLocation = z.infer<typeof createLocationSchema>;
export type UpdateLocation = z.infer<typeof updateLocationSchema>;
export type LocationParams = z.infer<typeof locationParamsSchema>;
