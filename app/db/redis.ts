import { promisifyAll } from 'bluebird';
import * as redis from 'redis';
const port = 6379;
const reidsHost = '192.168.1.21';
interface IBlueRedisClient extends redis.RedisClient {
    setAsync?: any;
    getAsync?: any;
    hsetAsync?: any;
    hgetAsync?: any;
    hgetallAsync?: any;
}

export const redisClient: IBlueRedisClient = redis.createClient(port, reidsHost);
promisifyAll(redis);
