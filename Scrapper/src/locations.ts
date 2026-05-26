import {
  type CreateLocation,
  type Region,
} from '@57eme-regiment/krang-api-contract';
import { fetchLocationsInRegions } from '../api/war/warApi.api.js';
import type { ApiClient } from './api.js';
import { getNearestTownId, type DynamicResponse } from './helpers.js';

export const scrapLocations = async (
  api: ApiClient,
  regions: Region[],
): Promise<void> => {
  const allTownsRes = await api.town.getAll();
  if (allTownsRes.status !== 200)
    throw new Error('Failed to fetch towns', { cause: allTownsRes });

  for (const region of regions) {
    const dynamicData = (await fetchLocationsInRegions(
      region.name,
    )) as unknown as DynamicResponse;
    const townsInRegion = allTownsRes.body.filter(
      t => t.regionId === region.id,
    );

    const body: CreateLocation[] = [];

    for (const loc of dynamicData.mapItems) {
      body.push({
        type: 'SEAPORT',
        faction: "NEUTRAL",
        iconType: loc.iconType,
        flags: loc.flags,
        viewDirection: loc.viewDirection,
        longitude: loc.x,
        latitude: loc.y,
        regionId: region.id,
        townId: getNearestTownId(townsInRegion, loc.x, loc.y),
      });
    }

    if (body.length > 0) {
      const res = await api.location.upsertRange({ body });
      if (res.status !== 200)
        throw new Error(`Location upsert failed for region ${region.name}`, {
          cause: res,
        });
    }
  }
};
