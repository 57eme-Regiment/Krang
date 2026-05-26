import {
  contract,
  type CreateLocation,
  type Region,
} from '@57eme-regiment/krang-api-contract';
import { initClient } from '@ts-rest/core';
import { fetchLocationsInRegions } from '../api/war/warApi.api.js';

export const scrapLocation = async (regions: Region[]) => {
  const api = initClient(contract, {
    baseUrl: 'http://localhost:3000',
    baseHeaders: {},
  });

  regions.forEach(async region => {
    const response = await fetchLocationsInRegions(region.name);

    const body = response.mapItems.map(
      t =>
        ({
          type: 'SEAPORT',
          faction: t.teamId,
          iconType: t.iconType,
          longitude: t.x,
          latitude: t.y,
          flags: t.flags,
          viewDirection: t.viewDirection,
          regionId: region.id,
        }) satisfies CreateLocation,
    );

    const res = await api.location.createRange({ body });
    if (res.status != 201)
      throw new Error('Town insertion Failed', { cause: res });
  });
};
