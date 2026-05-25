import { container } from '@/infrastructure/container';
import type { FastifyInstance } from 'fastify';
import { TownController } from './town.controller';

export async function townRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(TownController);

  app.get('/', ctrl.getAll.bind(ctrl));
  app.get('/:id', ctrl.getById.bind(ctrl));
  app.post('/', ctrl.create.bind(ctrl));
  app.put('/:id', ctrl.update.bind(ctrl));
  app.delete('/:id', ctrl.delete.bind(ctrl));
}
