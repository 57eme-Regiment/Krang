import {
  Faction,
  FactionSchema,
  MapMarkerTypeSchema,
} from '@57em-regiment/krang-api-contract';
import { z } from 'zod';

export const townSchema = z.object({
  text: z.string(),
  x: z.number(),
  y: z.number(),
  mapMarkerType: z.string().toUpperCase().pipe(MapMarkerTypeSchema),
});
export type town = z.infer<typeof townSchema>;

export const staticResponseSchema = z.object({
  regionId: z.number(),
  scorchedVictoryTowns: z.number(),
  mapItems: z.array(z.any()),
  mapItemsC: z.array(z.any()),
  mapItemsW: z.array(z.any()),
  mapTextItems: townSchema.array(),
  lastUpdated: z.number(),
  version: z.number(),
});

export type staticResponse = z.infer<typeof staticResponseSchema>;

export const locationSchema = z.object({
  teamId: z.preprocess(val => {
    if (val == 'NONE') return Faction.NEUTRAL;
    else if (val == 'WARDENS') return Faction.WARDEN;
    else if (val == 'COLONIALS') return Faction.COLONIAL;
    return Faction.NEUTRAL;
  }, FactionSchema),
  iconType: z.number(),
  x: z.number(),
  y: z.number(),
  flags: z.number(),
  viewDirection: z.number(),
});
export type location = z.infer<typeof locationSchema>;

export const dynamicResponseSchema = z.object({
  regionId: z.number(),
  scorchedVictoryTowns: z.number(),
  mapItems: locationSchema.array(),
  mapItemsC: z.array(z.any()),
  mapItemsW: z.array(z.any()),
  mapTextItems: z.array(z.any()),
  lastUpdated: z.number(),
  version: z.number(),
});

export type dynamicResponse = z.infer<typeof dynamicResponseSchema>;
