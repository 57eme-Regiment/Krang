import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  LocationSchema,
  createLocationSchema,
  locationParamsSchema,
  updateLocationSchema,
} from '../schemas/location.schema';

const c = initContract();

export const locationContract = c.router({
  getAll: {
    method: 'GET',
    path: '/api/locations',
    responses: { 200: z.array(LocationSchema) },
  },
  getById: {
    method: 'GET',
    path: '/api/locations/:id',
    pathParams: locationParamsSchema,
    responses: {
      200: LocationSchema,
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
  create: {
    method: 'POST',
    path: '/api/locations',
    body: createLocationSchema,
    responses: { 201: LocationSchema },
  },
  createRange: {
    method: 'POST',
    path: '/api/locations/Range',
    body: createLocationSchema.array(),
    responses: { 201: LocationSchema.array() },
  },
  upsertRange: {
    method: 'POST',
    path: '/api/locations/upsertRange',
    body: createLocationSchema.array(),
    responses: { 200: LocationSchema.array() },
  },
  update: {
    method: 'PUT',
    path: '/api/locations/:id',
    pathParams: locationParamsSchema,
    body: updateLocationSchema,
    responses: {
      200: LocationSchema,
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
  delete: {
    method: 'DELETE',
    path: '/api/locations/:id',
    pathParams: locationParamsSchema,
    responses: {
      204: z.null(),
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
});
