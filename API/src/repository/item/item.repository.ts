import { Item } from '@/generated/client';
import { Database } from '@/infrastructure/database';
import { CreateItem, UpdateItem } from '@57em-regiment/krang-api-contract';
import { injectable } from 'tsyringe';
import { IItemRepository } from './item.repository.interface';

@injectable()
export class ItemRepository implements IItemRepository {
  constructor(private readonly db: Database) {}
  findAll(): Promise<Item[]> {
    return this.db.context.item.findMany({});
  }
  findById(id: string): Promise<Item | null> {
    return this.db.context.item.findUnique({ where: { id } });
  }
  create(data: CreateItem): Promise<Item> {
    return this.db.context.item.create({ data });
  }
  update(id: string, data: UpdateItem): Promise<Item> {
    return this.db.context.item.update({ where: { id }, data });
  }
  async delete(id: string): Promise<void> {
    await this.db.context.item.delete({ where: { id } });
  }
}
