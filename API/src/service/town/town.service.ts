import { Town } from '@/generated/client';
import { CreateTown, UpdateTown } from '@57em-regiment/krang-api-contract';
import { ITownRepository } from '@/repository/town/town.repository.interface';
import { AppError } from '@/shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import type { ITownService } from './town.service.interface';

@injectable()
export class TownService implements ITownService {
  constructor(
    @inject('ITownRepository')
    private readonly townRepository: ITownRepository,
  ) {}

  async getAll(): Promise<Town[]> {
    return this.townRepository.findAll();
  }

  async getById(id: string): Promise<Town> {
    const town = await this.townRepository.findById(id);
    if (!town) throw new AppError('Town not found', 404, 'TOWN_NOT_FOUND');
    return town;
  }

  async create(data: CreateTown): Promise<Town> {
    return this.townRepository.create(data);
  }

  async update(id: string, data: UpdateTown): Promise<Town> {
    await this.getById(id);
    return this.townRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    return this.townRepository.delete(id);
  }
}
