import pino from 'pino';
import { env } from '../config/env.js';

const pinoConfig: any = {
  level: env.LOG_LEVEL,
};

if (env.NODE_ENV === 'development') {
  pinoConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  };
}

export const logger = pino(pinoConfig);
