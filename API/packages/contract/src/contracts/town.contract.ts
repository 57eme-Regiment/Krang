import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  TownSchema,
  createTownSchema,
  townParamsSchema,
  updateTownSchema,
} from '../schemas/town.schema';

const c = initContract();

export const townContract = c.router({
  getAll: {
    method: 'GET',
    path: '/api/towns',
    responses: { 200: z.array(TownSchema) },
  },
  getById: {
    method: 'GET',
    path: '/api/towns/:id',
    pathParams: townParamsSchema,
    responses: {
      200: TownSchema,
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
  create: {
    method: 'POST',
    path: '/api/towns',
    body: createTownSchema,
    responses: { 201: TownSchema },
  },
  createRange: {
    method: 'POST',
    path: '/api/towns/Range',
    body: createTownSchema.array(),
    responses: { 201: TownSchema.array() },
  },
  update: {
    method: 'PUT',
    path: '/api/towns/:id',
    pathParams: townParamsSchema,
    body: updateTownSchema,
    responses: {
      200: TownSchema,
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
  delete: {
    method: 'DELETE',
    path: '/api/towns/:id',
    pathParams: townParamsSchema,
    responses: {
      204: z.null(),
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
});
