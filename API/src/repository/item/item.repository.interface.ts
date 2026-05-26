import { Item } from '@/generated/client';
import { CreateItem, UpdateItem } from '@57eme-regiment/krang-api-contract';

export interface IItemRepository {
  findAll(): Promise<Item[]>;
  findById(id: string): Promise<Item | null>;
  create(data: CreateItem): Promise<Item>;
  update(id: string, data: UpdateItem): Promise<Item>;
  delete(id: string): Promise<void>;
}
