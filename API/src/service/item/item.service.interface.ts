import { Item } from '@/generated/client';
import { CreateItem, UpdateItem } from '@57eme-regiment/krang-api-contract';

export interface IItemService {
  getAll(): Promise<Item[]>;
  getById(id: string): Promise<Item>;
  create(data: CreateItem): Promise<Item>;
  upsert(data: CreateItem): Promise<Item>;
  upsertRange(data: CreateItem[]): Promise<Item[]>;
  update(id: string, data: UpdateItem): Promise<Item>;
  delete(id: string): Promise<void>;
}
