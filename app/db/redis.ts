import { promisifyAll } from 'bluebird';
import * as redis from 'redis';
interface IBlueRedisClient extends redis.RedisClient {
    setAsync?:any,
    getAsync?:any
};

export const redisClient:IBlueRedisClient = redis.createClient(6379, '192.168.1.21');
promisifyAll(redis);
