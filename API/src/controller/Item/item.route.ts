import { container } from '@/infrastructure/container';
import type { FastifyInstance } from 'fastify';
import { ItemController } from './item.controller';

export async function itemRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(ItemController);

  app.get('/', ctrl.getAll.bind(ctrl));
  app.get('/:id', ctrl.getById.bind(ctrl));
  app.post('/', ctrl.create.bind(ctrl));
  app.put('/:id', ctrl.update.bind(ctrl));
  app.delete('/:id', ctrl.delete.bind(ctrl));
}
