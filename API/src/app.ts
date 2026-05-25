import { env } from '@/config/env';
import { errorHandler } from '@/shared/errors/errorHandler';
import Fastify from 'fastify';
import { itemRoutes } from './controller/Item/item.route';
import { locationRoutes } from './controller/Location/location.route';
import { regionRoutes } from './controller/Region/region.route';
import { townRoutes } from './controller/Town/town.route';

export function buildApp() {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  app.setErrorHandler(errorHandler);

  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));

  app.register(itemRoutes, { prefix: '/api/items' });
  app.register(regionRoutes, { prefix: '/api/regions' });
  app.register(townRoutes, { prefix: '/api/towns' });
  app.register(locationRoutes, { prefix: '/api/locations' });

  return app;
}
