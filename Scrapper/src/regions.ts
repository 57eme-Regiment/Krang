import { type CreateRegion, type Region } from '@57eme-regiment/krang-api-contract';
import { fetchRegions } from '../api/war/warApi.api.js';
import type { ApiClient } from './api.js';

export const scrapRegions = async (api: ApiClient): Promise<Region[]> => {
  const names = await fetchRegions();
  const body = names.map(name => ({ name }) satisfies CreateRegion);

  const res = await api.region.upsertRange({ body });
  if (res.status !== 200)
    throw new Error('Region upsert failed', { cause: res });

  return res.body;
};
