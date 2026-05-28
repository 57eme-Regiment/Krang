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
    summary: 'Get all items',
    description: 'Returns the list of all items.',
    responses: { 200: z.array(ItemSchema) },
  },
  getById: {
    method: 'GET',
    path: '/api/items/:id',
    summary: 'Get an item by ID',
    description: 'Returns a single item by its UUID. Returns 404 if not found.',
    pathParams: itemParamsSchema,
    responses: {
      200: ItemSchema,
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
  create: {
    method: 'POST',
    path: '/api/items',
    summary: 'Create an item',
    description: 'Creates a new item and returns it.',
    body: createItemSchema,
    responses: { 201: ItemSchema },
  },
  upsert: {
    method: 'POST',
    path: '/api/items/upsert',
    summary: 'Upsert an item',
    description:
      'Creates the item if it does not exist (matched by name), otherwise updates it. Returns the resulting item.',
    body: createItemSchema,
    responses: { 200: ItemSchema },
  },
  upsertRange: {
    method: 'POST',
    path: '/api/items/upsertRange',
    summary: 'Upsert a range of items',
    description:
      'Creates or updates multiple items in a single transaction, matched by name. Returns the resulting items.',
    body: createItemSchema.array(),
    responses: { 200: ItemSchema.array() },
  },
  update: {
    method: 'PUT',
    path: '/api/items/:id',
    summary: 'Update an item',
    description: 'Partially updates an item by its UUID. Returns 404 if not found.',
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
    summary: 'Delete an item',
    description: 'Deletes an item by its UUID. Returns 404 if not found.',
    pathParams: itemParamsSchema,
    responses: {
      204: z.null(),
      404: z.object({ message: z.string(), code: z.string() }),
    },
  },
});
