import Fastify from 'fastify';
import { registerHealthRoutes } from './routes/health.js';

export async function createApp() {
  const app = Fastify({
    logger: false,
  });

  // Register all routes
  await registerHealthRoutes(app);

  return app;
}
