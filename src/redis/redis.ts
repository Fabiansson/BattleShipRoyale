import bluebird from 'bluebird';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { REDIS_TTL, REDIS_URL } from '../helpers/constants';

bluebird.promisifyAll(redis);

const client = redis.createClient(REDIS_URL);

const redisStore = (expressSession) => {
  const redisStore = connectRedis(expressSession);
  const storeOptions = {
    url: REDIS_URL,
    client: client,
    ttl: REDIS_TTL
  }
  return new redisStore(storeOptions);
}

export { client as redis, redisStore };