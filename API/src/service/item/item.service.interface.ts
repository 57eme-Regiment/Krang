import { Item } from '@/generated/client';
import { CreateItem, UpdateItem } from '@/models/item/item.schema';

export interface IItemService {
  getAll(): Promise<Item[]>;
  getById(id: string): Promise<Item>;
  create(data: CreateItem): Promise<Item>;
  update(id: string, data: UpdateItem): Promise<Item>;
  delete(id: string): Promise<void>;
}
