import { Region } from '@/generated/client';
import { CreateRegion, UpdateRegion } from '@/models/region/region.schema';

export interface IRegionService {
  getAll(): Promise<Region[]>;
  getById(id: string): Promise<Region>;
  create(data: CreateRegion): Promise<Region>;
  update(id: string, data: UpdateRegion): Promise<Region>;
  upsert(data: CreateRegion): Promise<Region>;
  delete(id: string): Promise<void>;
}
