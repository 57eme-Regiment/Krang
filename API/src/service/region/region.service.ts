import { Region } from '@/generated/client';
import { CreateRegion, UpdateRegion } from '@57em-regiment/krang-api-contract';
import { IRegionRepository } from '@/repository/region/region.repository.interface';
import { AppError } from '@/shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import type { IRegionService } from './region.service.interface';

@injectable()
export class RegionService implements IRegionService {
  constructor(
    @inject('IRegionRepository')
    private readonly regionRepository: IRegionRepository,
  ) {}

  async getAll(): Promise<Region[]> {
    return this.regionRepository.findAll();
  }

  async getById(id: string): Promise<Region> {
    const region = await this.regionRepository.findById(id);
    if (!region) throw new AppError('Region not found', 404, 'REGION_NOT_FOUND');
    return region;
  }

  async create(data: CreateRegion): Promise<Region> {
    return this.regionRepository.create(data);
  }

  async update(id: string, data: UpdateRegion): Promise<Region> {
    await this.getById(id);
    return this.regionRepository.update(id, data);
  }

  async upsert(data: CreateRegion): Promise<Region> {
    return this.regionRepository.upsert(data);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    return this.regionRepository.delete(id);
  }
}
