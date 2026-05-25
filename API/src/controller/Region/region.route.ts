import { container } from '@/infrastructure/container';
import type { FastifyInstance } from 'fastify';
import { RegionController } from './region.controller';

export async function regionRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(RegionController);

  app.get('/', ctrl.getAll.bind(ctrl));
  app.get('/:id', ctrl.getById.bind(ctrl));
  app.post('/', ctrl.create.bind(ctrl));
  app.post('/upsert', ctrl.upsert.bind(ctrl));
  app.put('/:id', ctrl.update.bind(ctrl));
  app.delete('/:id', ctrl.delete.bind(ctrl));
}
