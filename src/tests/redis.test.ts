import { redis } from '../redis/redis';

describe('Redis Test', () => {
  it('can write data to redis', async () => {
    expect.assertions(1);
    const data = await redis.setAsync('test1', 1234);
    const result = await redis.getAsync('test1');
    return expect(result).toEqual("1234");
  });

  
})


