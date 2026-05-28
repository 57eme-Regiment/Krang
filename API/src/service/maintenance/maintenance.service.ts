import { env } from '@/config/env';
import { IItemRepository } from '@/repository/item/item.repository.interface';
import { ILocationRepository } from '@/repository/location/location.repository.interface';
import { contract } from '@57eme-regiment/renenutet-api-contract';
import { initClient } from '@ts-rest/core';
import { inject, injectable } from 'tsyringe';
import type { IMaintenanceService } from './maintenance.service.interface';

@injectable()
export class MaintenanceService implements IMaintenanceService {
  private renenutetClient = initClient(contract, {
    baseUrl: env.RENENUTET_BASE_API,
  });

  constructor(
    @inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository,
    @inject('IItemRepository')
    private readonly itemRepository: IItemRepository,
  ) {}
  async renenutet(): Promise<void> {
    const locations = await this.locationRepository.findAll();
    const locationsBody = locations.map(l => ({ id: l.id }));
    console.log(
      '🚀 ~ MaintenanceService ~ renenutet ~ locationsBody:',
      locationsBody.length,
    );
    this.renenutetClient.locationRef.drop();
    this.renenutetClient.locationRef.createRange({ body: locationsBody });

    const items = await this.itemRepository.findAll();
    const itemsBody = items.map(i => ({ id: i.id }));
    console.log(
      '🚀 ~ MaintenanceService ~ renenutet ~ itemsBody:',
      itemsBody.length,
    );
    this.renenutetClient.itemRef.drop();
    this.renenutetClient.itemRef.createRange({ body: itemsBody });
  }
}
