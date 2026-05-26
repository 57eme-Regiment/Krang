import {
  contract,
  type CreateTown,
  type Region,
} from '@57eme-regiment/krang-api-contract';
import { initClient } from '@ts-rest/core';
import { fetchTownsInRegions } from '../api/war/warApi.api.js';

export const scrapTown = async (regions: Region[]) => {
  const api = initClient(contract, {
    baseUrl: 'http://localhost:3000',
    baseHeaders: {},
  });

  regions.forEach(async region => {
    const response = await fetchTownsInRegions(region.name);
    await api.region.upsert({
      body: {
        name: region.name,
        gameRegionId: response.regionId,
      },
    });

    const body = response.mapTextItems.map(
      t =>
        ({
          name: t.text,
          longitude: t.x,
          latitude: t.y,
          mapMarkerType: t.mapMarkerType,
          regionId: region.id,
        }) satisfies CreateTown,
    );

    const res = await api.town.createRange({ body });
    if (res.status != 201)
      throw new Error('Town insertion Failed', { cause: res });
  });
};
