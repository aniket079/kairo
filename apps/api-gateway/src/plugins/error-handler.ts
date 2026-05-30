import type { FastifyError, FastifyInstance } from 'fastify';

export async function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, request, reply) => {
    const requestId = request.id ?? reply.getHeader('x-request-id')?.toString() ?? 'unknown';
    const statusCode = typeof error.statusCode === 'number' ? error.statusCode : 500;

    app.log.error(
      {
        err: error,
        requestId,
        method: request.method,
        path: request.url,
        statusCode,
      },
      'Request error'
    );

    const message = statusCode >= 500
      ? 'Internal Server Error'
      : error.message || 'Bad Request';

    reply.status(statusCode).send({
      status: 'error',
      message,
      requestId,
      path: request.url,
      statusCode,
      timestamp: new Date().toISOString(),
    });
  });
}
