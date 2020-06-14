import bluebird from 'bluebird';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { REDIS_HOST, REDIS_PORT, REDIS_PASS, REDIS_TTL, REDIS_URL } from '../helpers/constants';

bluebird.promisifyAll(redis);

const client = redis.createClient(REDIS_URL/*{
  host: REDIS_HOST,
  port: REDIS_PORT,
  //url: REDIS_URL
  password: REDIS_PASS
}*/);

const redisStore = (expressSession) => {
  const redisStore = connectRedis(expressSession);
  const storeOptions = {
    //host: REDIS_HOST,
    //port: REDIS_PORT,
    url: REDIS_URL,
    client: client,
    ttl: REDIS_TTL
  }
  return new redisStore(storeOptions);
}

export { client as redis, redisStore };