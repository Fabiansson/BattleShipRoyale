export const PORT = +process.env.PORT || 4000;
export const HOST = process.env.HOST || '0.0.0.0';

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379/0';
export const REDIS_PORT = +process.env.REDIS_PORT || 6379;
export const REDIS_PASS = process.env.REIDS_PASSWORD || 'password';
export const REDIS_TTL = 1000;