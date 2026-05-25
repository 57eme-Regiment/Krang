import { Region } from '@/generated/client';
import { CreateRegion, UpdateRegion } from '@/models/region/region.schema';

export interface IRegionRepository {
  findAll(): Promise<Region[]>;
  findById(id: string): Promise<Region | null>;
  create(data: CreateRegion): Promise<Region>;
  update(id: string, data: UpdateRegion): Promise<Region>;
  upsert(data: CreateRegion): Promise<Region>;
  delete(id: string): Promise<void>;
}
