import type { FastifyInstance } from 'fastify';

export async function registerNotFoundHandler(app: FastifyInstance) {
  app.setNotFoundHandler((request, reply) => {
    const requestId = request.id ?? reply.getHeader('x-request-id')?.toString() ?? 'unknown';

    reply.status(404).send({
      status: 'fail',
      message: 'Route not found',
      requestId,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  });
}
