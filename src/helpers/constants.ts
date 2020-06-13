export const PORT = +process.env.PORT || 4000;
export const HOST = process.env.HOST || '0.0.0.0';

export const REDIS_HOST = '172.17.0.2' || 'localhost';
export const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379/0';
export const REDIS_PORT = +process.env.REDIS_PORT || 6379;
export const REDIS_PASS = '7e4d4c7585a2ec62161be0994eed4d425947d181f7cf066d25e29b97089a2cdf' || 'password';
export const REDIS_TTL = 1000;