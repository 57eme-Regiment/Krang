import { contract } from '@57eme-regiment/krang-api-contract';
import { initClient } from '@ts-rest/core';

export const createApiClient = (baseUrl: string) =>
  initClient(contract, { baseUrl, baseHeaders: {} });

export type ApiClient = ReturnType<typeof createApiClient>;
