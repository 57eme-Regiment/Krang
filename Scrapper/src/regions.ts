import { contract, type CreateRegion } from '@57em-regiment/krang-api-contract';
import { initClient } from '@ts-rest/core';
import { fetchRegions } from '../api/war/warApi.api.js';

export const scrapRegion = async () => {
  const api = initClient(contract, {
    baseUrl: 'http://localhost:3000',
    baseHeaders: {},
  });

  const regions = await fetchRegions();

  const body = regions.map(
    r =>
      ({
        name: r,
      }) satisfies CreateRegion,
  );

  const res = await api.region.createRange({ body });
  if (res.status != 201) throw new Error('CreateRange Regions Failed');

  return res.body;
};
