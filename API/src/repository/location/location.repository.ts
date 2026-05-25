import { Location } from '@/generated/client';
import { Database } from '@/infrastructure/database';
import { CreateLocation, UpdateLocation } from '@/models/location/location.schema';
import { injectable } from 'tsyringe';
import { ILocationRepository } from './location.repository.interface';

@injectable()
export class LocationRepository implements ILocationRepository {
  constructor(private readonly db: Database) {}

  findAll(): Promise<Location[]> {
    return this.db.context.location.findMany({});
  }

  findById(id: string): Promise<Location | null> {
    return this.db.context.location.findUnique({ where: { id } });
  }

  create(data: CreateLocation): Promise<Location> {
    return this.db.context.location.create({ data });
  }

  update(id: string, data: UpdateLocation): Promise<Location> {
    return this.db.context.location.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.db.context.location.delete({ where: { id } });
  }
}
