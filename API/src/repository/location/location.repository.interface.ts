import { Location } from '@/generated/client';
import {
  CreateLocation,
  UpdateLocation,
} from '@57em-regiment/krang-api-contract';

export interface ILocationRepository {
  findAll(): Promise<Location[]>;
  findById(id: string): Promise<Location | null>;
  create(data: CreateLocation): Promise<Location>;
  createRange(data: CreateLocation[]): Promise<Location[]>;
  update(id: string, data: UpdateLocation): Promise<Location>;
  delete(id: string): Promise<void>;
}
