import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const HealthResponseSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.string(),
  version: z.string(),
});

const ReadinessResponseSchema = z.object({
  ready: z.boolean(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export type ReadinessResponse = z.infer<typeof ReadinessResponseSchema>;

const SERVICE_VERSION = '1.0.0';

export async function registerHealthRoutes(app: FastifyInstance) {
  app.get<{ Reply: HealthResponse }>(
    '/health',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              timestamp: { type: 'string' },
              version: { type: 'string' },
            },
            required: ['status', 'timestamp', 'version'],
          },
        },
      },
    },
    async () => ({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: SERVICE_VERSION,
    })
  );

  app.get<{ Reply: ReadinessResponse }>(
    '/ready',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              ready: { type: 'boolean' },
            },
            required: ['ready'],
          },
        },
      },
    },
    async () => ({
      ready: true,
    })
  );
}
