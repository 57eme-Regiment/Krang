import { type CreateTown, type Region } from '@57eme-regiment/krang-api-contract';
import { fetchTownsInRegions } from '../api/war/warApi.api.js';
import type { ApiClient } from './api.js';

export const scrapTowns = async (api: ApiClient, regions: Region[]): Promise<void> => {
  console.log(`[Towns] Processing ${regions.length} regions...`);

  for (const region of regions) {
    process.stdout.write(`[Towns] ${region.name} — fetching...`);
    const response = await fetchTownsInRegions(region.name);

    await api.region.upsert({
      body: { name: region.name, gameRegionId: response.regionId },
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

    const res = await api.town.upsertRange({ body });
    if (res.status !== 200)
      throw new Error(`Town upsert failed for region ${region.name}`, { cause: res });

    process.stdout.write(` ${res.body.length} towns\n`);
  }

  console.log('[Towns] Done\n');
};
