import { container } from '@/infrastructure/container';
import type { FastifyInstance } from 'fastify';
import { LocationController } from './location.controller';

export async function locationRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(LocationController);

  app.get('/', ctrl.getAll.bind(ctrl));
  app.get('/:id', ctrl.getById.bind(ctrl));
  app.post('/', ctrl.create.bind(ctrl));
  app.put('/:id', ctrl.update.bind(ctrl));
  app.delete('/:id', ctrl.delete.bind(ctrl));
}
