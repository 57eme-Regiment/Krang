import { ItemController } from '@/controller/Item/item.controller';
import { LocationController } from '@/controller/Location/location.controller';
import { RegionController } from '@/controller/Region/region.controller';
import { TownController } from '@/controller/Town/town.controller';
import { ItemRepository } from '@/repository/item/item.repository';
import { IItemRepository } from '@/repository/item/item.repository.interface';
import { LocationRepository } from '@/repository/location/location.repository';
import { ILocationRepository } from '@/repository/location/location.repository.interface';
import { RegionRepository } from '@/repository/region/region.repository';
import { IRegionRepository } from '@/repository/region/region.repository.interface';
import { TownRepository } from '@/repository/town/town.repository';
import { ITownRepository } from '@/repository/town/town.repository.interface';
import { ItemService } from '@/service/item/item.service';
import { IItemService } from '@/service/item/item.service.interface';
import { LocationService } from '@/service/location/location.service';
import { ILocationService } from '@/service/location/location.service.interface';
import { RegionService } from '@/service/region/region.service';
import { IRegionService } from '@/service/region/region.service.interface';
import { TownService } from '@/service/town/town.service';
import { ITownService } from '@/service/town/town.service.interface';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { Database } from './database';

container.registerSingleton(Database);

container.registerSingleton<IItemRepository>('IItemRepository', ItemRepository);
container.registerSingleton<IItemService>('IItemService', ItemService);
container.registerSingleton(ItemController);

container.registerSingleton<IRegionRepository>('IRegionRepository', RegionRepository);
container.registerSingleton<IRegionService>('IRegionService', RegionService);
container.registerSingleton(RegionController);

container.registerSingleton<ITownRepository>('ITownRepository', TownRepository);
container.registerSingleton<ITownService>('ITownService', TownService);
container.registerSingleton(TownController);

container.registerSingleton<ILocationRepository>('ILocationRepository', LocationRepository);
container.registerSingleton<ILocationService>('ILocationService', LocationService);
container.registerSingleton(LocationController);

export { container };
