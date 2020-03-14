import bluebird from 'bluebird';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { REDIS_HOST, REDIS_PORT, REDIS_PASS, REDIS_TTL } from '../helpers/constants';

bluebird.promisifyAll(redis);

const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  //password: REDIS_PASS
});

const redisStore = (expressSession) => {
  const redisStore = connectRedis(expressSession);
  const storeOptions = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    client: client,
    ttl: REDIS_TTL
  }
  return new redisStore(storeOptions);
}

export { client as redis, redisStore };