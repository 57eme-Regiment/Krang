import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  RegionSchema,
  createRegionSchema,
  regionParamsSchema,
  updateRegionSchema,
} from '../schemas/region.schema';

const c = initContract();

export const regionContract = c.router({
  getAll: {
    method: 'GET',
    path: '/api/regions',
    responses: { 200: z.array(RegionSchema) },
  },
  getById: {
    method: 'GET',
    path: '/api/regions/:id',
    pathParams: regionParamsSchema,
    responses: {
      200: RegionSchema,
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
  create: {
    method: 'POST',
    path: '/api/regions',
    body: createRegionSchema,
    responses: { 201: RegionSchema },
  },
  upsert: {
    method: 'POST',
    path: '/api/regions/upsert',
    body: createRegionSchema,
    responses: { 200: RegionSchema },
  },
  update: {
    method: 'PUT',
    path: '/api/regions/:id',
    pathParams: regionParamsSchema,
    body: updateRegionSchema,
    responses: {
      200: RegionSchema,
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
  delete: {
    method: 'DELETE',
    path: '/api/regions/:id',
    pathParams: regionParamsSchema,
    responses: {
      204: z.null(),
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
});
