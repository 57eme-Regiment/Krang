import { Region } from '@/generated/client';
import { Database } from '@/infrastructure/database';
import { CreateRegion, UpdateRegion } from '@/models/region/region.schema';
import { injectable } from 'tsyringe';
import { IRegionRepository } from './region.repository.interface';

@injectable()
export class RegionRepository implements IRegionRepository {
  constructor(private readonly db: Database) {}

  findAll(): Promise<Region[]> {
    return this.db.context.region.findMany({});
  }

  findById(id: string): Promise<Region | null> {
    return this.db.context.region.findUnique({ where: { id } });
  }

  create(data: CreateRegion): Promise<Region> {
    return this.db.context.region.create({ data });
  }

  update(id: string, data: UpdateRegion): Promise<Region> {
    return this.db.context.region.update({ where: { id }, data });
  }

  upsert(data: CreateRegion): Promise<Region> {
    const { name, ...rest } = data;
    return this.db.context.region.upsert({
      where: { name },
      create: data,
      update: rest,
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.context.region.delete({ where: { id } });
  }
}
