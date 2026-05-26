import { Town } from '@/generated/client';
import { CreateTown, UpdateTown } from '@57eme-regiment/krang-api-contract';

export interface ITownService {
  getAll(): Promise<Town[]>;
  getById(id: string): Promise<Town>;
  create(data: CreateTown): Promise<Town>;
  createRange(data: CreateTown[]): Promise<Town[]>;
  update(id: string, data: UpdateTown): Promise<Town>;
  delete(id: string): Promise<void>;
}
