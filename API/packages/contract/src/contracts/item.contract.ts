import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  ItemSchema,
  createItemSchema,
  itemParamsSchema,
  updateItemSchema,
} from '../schemas/item.schema';

const c = initContract();

export const itemContract = c.router({
  getAll: {
    method: 'GET',
    path: '/api/items',
    responses: { 200: z.array(ItemSchema) },
  },
  getById: {
    method: 'GET',
    path: '/api/items/:id',
    pathParams: itemParamsSchema,
    responses: {
      200: ItemSchema,
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
  create: {
    method: 'POST',
    path: '/api/items',
    body: createItemSchema,
    responses: { 201: ItemSchema },
  },
  update: {
    method: 'PUT',
    path: '/api/items/:id',
    pathParams: itemParamsSchema,
    body: updateItemSchema,
    responses: {
      200: ItemSchema,
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
  delete: {
    method: 'DELETE',
    path: '/api/items/:id',
    pathParams: itemParamsSchema,
    responses: {
      204: z.null(),
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
});
