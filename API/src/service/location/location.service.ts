import { Location } from '@/generated/client';
import { ILocationRepository } from '@/repository/location/location.repository.interface';
import { AppError } from '@/shared/errors/appError';
import {
  CreateLocation,
  UpdateLocation,
} from '@57eme-regiment/krang-api-contract';
import { inject, injectable } from 'tsyringe';
import type { ILocationService } from './location.service.interface';

@injectable()
export class LocationService implements ILocationService {
  constructor(
    @inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository,
  ) {}

  async getAll(): Promise<Location[]> {
    return this.locationRepository.findAll();
  }

  async getById(id: string): Promise<Location> {
    const location = await this.locationRepository.findById(id);
    if (!location)
      throw new AppError('Location not found', 404, 'LOCATION_NOT_FOUND');
    return location;
  }

  async create(data: CreateLocation): Promise<Location> {
    return this.locationRepository.create(data);
  }

  async createRange(data: CreateLocation[]): Promise<Location[]> {
    return this.locationRepository.createRange(data);
  }

  async update(id: string, data: UpdateLocation): Promise<Location> {
    await this.getById(id);
    return this.locationRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    return this.locationRepository.delete(id);
  }
}
