import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const HealthResponseSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.string(),
  version: z.string(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

export async function registerHealthRoutes(app: FastifyInstance) {
  // Health check endpoint
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
          },
        },
      },
    },
    async (_request, _reply) => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      };
    }
  );

  // Ready endpoint
  app.get<{ Reply: { ready: boolean } }>(
    '/ready',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              ready: { type: 'boolean' },
            },
          },
        },
      },
    },
    async (_request, _reply) => {
      return {
        ready: true,
      };
    }
  );
}
