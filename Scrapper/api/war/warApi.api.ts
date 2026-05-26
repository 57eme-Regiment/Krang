import 'dotenv/config';
import { createApiClient } from '../baseApi.js';
import {
  dynamicResponseSchema,
  staticResponseSchema,
  type dynamicResponse,
  type staticResponse,
} from './warApi.schema.js';

const warApiClient = createApiClient(process.env.WAR_API_BASE);

export const fetchRegions = async (): Promise<string[]> => {
  const path = `/maps`;
  try {
    const res = await warApiClient.get<string[]>(path);

    return res;
  } catch (error) {
    throw new Error(`fetchRegion failed`, { cause: error });
  }
};

export const fetchTownsInRegions = async (
  regionName: string,
): Promise<staticResponse> => {
  const path = `/maps/${regionName}/static`;
  try {
    const raw = await warApiClient.get<unknown>(path);
    return staticResponseSchema.parse(raw);
  } catch (error) {
    throw new Error(`fetch Towns failed`, { cause: error });
  }
};
export const fetchLocationsInRegions = async (
  regionName: string,
): Promise<dynamicResponse> => {
  const path = `/maps/${regionName}/dynamic/public`;
  try {
    const raw = await warApiClient.get<unknown>(path);
    return dynamicResponseSchema.parse(raw);
  } catch (error) {
    throw new Error(`fetch Locaiton failed`, { cause: error });
  }
};
