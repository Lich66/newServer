import { promisifyAll } from 'bluebird';
import * as redis from 'redis';


const port = 6379;
const reidsHost = '192.168.1.21';


type ISetAsync1 = (key: string, value: string) => Promise<'OK'>;
type ISetAsync2 = (key: string, value: string, flag: string) => Promise<'OK'>;
type ISetAsync3 = (key: string, value: string, mode: string, duration: number) => Promise<'OK' | undefined>;
type ISetAsync4 = (key: string, value: string, mode: string, duration: number, flag: string) => Promise<'OK' | undefined>;

type IGetAsync = (key: string) => Promise<string>;

type IHsetAsync = (key: string, field: string, value: string) => Promise<number>;

type IHgetAsync = (key: string, field: string) => Promise<string>;

type IHgetallAsync = (key: string) => Promise<{ [key: string]: string }>;

interface IBlueRedisClient extends redis.RedisClient {
    setAsync?: ISetAsync1 | ISetAsync2 | ISetAsync3 | ISetAsync4;
    getAsync?: IGetAsync;
    hsetAsync?: IHsetAsync;
    hgetAsync?: IHgetAsync;
    hgetallAsync?: IHgetallAsync;
}

export const redisClient: IBlueRedisClient = redis.createClient(port, reidsHost);
promisifyAll(redis);
