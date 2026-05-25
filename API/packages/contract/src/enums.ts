import { z } from 'zod';

export const Category = {
  SMALL_ARMS: 'SMALL_ARMS',
  HEAVY_ARMS: 'HEAVY_ARMS',
  HEAVY_AMMUNITION: 'HEAVY_AMMUNITION',
  UTILITY: 'UTILITY',
  MEDICAL: 'MEDICAL',
  RESSOURCE: 'RESSOURCE',
  UNIFORM: 'UNIFORM',
  VEHICLE: 'VEHICLE',
  SHIPPABLE: 'SHIPPABLE',
} as const;
export type Category = (typeof Category)[keyof typeof Category];
export const CategorySchema = z.enum(Category);

export const SuperClass = {
  MATERIAL: 'MATERIAL',
  MAGAZINE: 'MAGAZINE',
} as const;
export type SuperClass = (typeof SuperClass)[keyof typeof SuperClass];
export const SuperClassSchema = z.enum(SuperClass);

export const Class = {
  REFINED_MATERIAL: 'REFINED_MATERIAL',
  RIFLE_AMMO: 'RIFLE_AMMO',
} as const;
export type Class = (typeof Class)[keyof typeof Class];
export const ClassSchema = z.enum(Class);

export const Faction = {
  WARDEN: 'WARDEN',
  COLONIAL: 'COLONIAL',
  NEUTRAL: 'NEUTRAL',
} as const;
export type Faction = (typeof Faction)[keyof typeof Faction];
export const FactionSchema = z.enum(Faction);

export const LocationType = {
  STORAGE_DEPOT: 'STORAGE_DEPOT',
  SEAPORT: 'SEAPORT',
} as const;
export type LocationType = (typeof LocationType)[keyof typeof LocationType];
export const LocationTypeSchema = z.enum(LocationType);
export const MapMarkerType = {
  MAJOR: 'MAJOR',
  MINOR: 'MINOR',
} as const;
export type MapMarkerType = (typeof MapMarkerType)[keyof typeof MapMarkerType];
export const MapMarkerTypeSchema = z.enum(MapMarkerType);
