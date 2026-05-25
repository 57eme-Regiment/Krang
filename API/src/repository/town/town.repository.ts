import { Town } from '@/generated/client';
import { Database } from '@/infrastructure/database';
import { CreateTown, UpdateTown } from '@/models/town/town.schema';
import { injectable } from 'tsyringe';
import { ITownRepository } from './town.repository.interface';

@injectable()
export class TownRepository implements ITownRepository {
  constructor(private readonly db: Database) {}

  findAll(): Promise<Town[]> {
    return this.db.context.town.findMany({});
  }

  findById(id: string): Promise<Town | null> {
    return this.db.context.town.findUnique({ where: { id } });
  }

  create(data: CreateTown): Promise<Town> {
    return this.db.context.town.create({ data });
  }

  update(id: string, data: UpdateTown): Promise<Town> {
    return this.db.context.town.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.db.context.town.delete({ where: { id } });
  }
}
