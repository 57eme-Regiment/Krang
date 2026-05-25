import { Town } from '@/generated/client';
import { CreateTown, UpdateTown } from '@/models/town/town.schema';

export interface ITownService {
  getAll(): Promise<Town[]>;
  getById(id: string): Promise<Town>;
  create(data: CreateTown): Promise<Town>;
  update(id: string, data: UpdateTown): Promise<Town>;
  delete(id: string): Promise<void>;
}
