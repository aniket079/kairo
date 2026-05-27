import 'dotenv/config';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

async function start() {
  try {
    const app = await createApp();

    await app.listen({ port: env.PORT, host: '0.0.0.0' });

    logger.info(`API Gateway listening on port ${env.PORT}`);

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal: string) => {
      logger.info(`Received ${signal}, starting graceful shutdown...`);
      try {
        await app.close();
        logger.info('Server closed successfully');
        process.exit(0);
      } catch (error) {
        logger.error({ err: error }, 'Error during graceful shutdown');
        process.exit(1);
      }
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Unhandled error handlers
    process.on('uncaughtException', (error) => {
      logger.error({ err: error }, 'Uncaught Exception');
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      logger.error({ reason }, 'Unhandled Rejection');
      process.exit(1);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

start();
