import { Town } from '@/generated/client';
import { CreateTown, UpdateTown } from '@/models/town/town.schema';

export interface ITownRepository {
  findAll(): Promise<Town[]>;
  findById(id: string): Promise<Town | null>;
  create(data: CreateTown): Promise<Town>;
  update(id: string, data: UpdateTown): Promise<Town>;
  delete(id: string): Promise<void>;
}
