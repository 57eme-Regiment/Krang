import { container } from '@/infrastructure/container';
import {
  ItemSchema,
  createItemSchema,
  itemParamsSchema,
  updateItemSchema,
} from '@57eme-regiment/krang-api-contract';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ItemController } from './item.controller';

const errorSchema = z.object({ message: z.string(), code: z.string() });

export async function itemRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(ItemController);
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.get('/', {
    schema: { response: { 200: z.array(ItemSchema) } },
  }, ctrl.getAll.bind(ctrl));

  server.get('/:id', {
    schema: {
      params: itemParamsSchema,
      response: { 200: ItemSchema, 404: errorSchema },
    },
  }, ctrl.getById.bind(ctrl));

  server.post('/', {
    schema: {
      body: createItemSchema,
      response: { 201: ItemSchema },
    },
  }, ctrl.create.bind(ctrl));

  server.put('/:id', {
    schema: {
      params: itemParamsSchema,
      body: updateItemSchema,
      response: { 200: ItemSchema, 404: errorSchema },
    },
  }, ctrl.update.bind(ctrl));

  server.delete('/:id', {
    schema: {
      params: itemParamsSchema,
      response: { 204: z.null(), 404: errorSchema },
    },
  }, ctrl.delete.bind(ctrl));
}
