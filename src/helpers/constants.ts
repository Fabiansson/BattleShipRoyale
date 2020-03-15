export const PORT = +process.env.PORT || 4000;
export const HOST = process.env.HOST || '0.0.0.0';

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = +process.env.REDIS_PORT || 6379;
export const REDIS_PASS = process.env.REDIS_PASS || 'password';
export const REDIS_TTL = 1000;