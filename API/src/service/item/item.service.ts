import { Item } from '@/generated/client';
import { CreateItem, UpdateItem } from '@57eme-regiment/krang-api-contract';
import { IItemRepository } from '@/repository/item/item.repository.interface';
import { AppError } from '@/shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import type { IItemService } from './item.service.interface';

@injectable()
export class ItemService implements IItemService {
  constructor(
    @inject('IItemRepository')
    private readonly itemRepository: IItemRepository,
  ) {}

  async getAll(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  async getById(id: string): Promise<Item> {
    const item = await this.itemRepository.findById(id);
    if (!item) throw new AppError('Item not found', 404, 'ITEM_NOT_FOUND');
    return item;
  }

  async create(data: CreateItem): Promise<Item> {
    return this.itemRepository.create(data);
  }

  async update(id: string, data: UpdateItem): Promise<Item> {
    await this.getById(id);
    return this.itemRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    return this.itemRepository.delete(id);
  }
}
