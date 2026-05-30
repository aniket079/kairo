import crypto from 'crypto';
import Fastify from 'fastify';
import { env } from './config/env.js';
import { registerErrorHandler } from './plugins/error-handler.js';
import { registerNotFoundHandler } from './plugins/not-found-handler.js';
import { registerHealthRoutes } from './routes/health.routes.js';

export async function createApp() {
  const app = Fastify({
    logger: {
      level: env.LOG_LEVEL,
    },
    genReqId: () => crypto.randomUUID(),
    requestIdHeader: 'x-request-id',
  });

  await registerHealthRoutes(app);
  await registerNotFoundHandler(app);
  await registerErrorHandler(app);

  return app;
}
