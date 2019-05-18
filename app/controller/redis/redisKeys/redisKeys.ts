import { redisClient } from '../../../db/redis';

export class RedisKeys {
    public static delAsync(key: string): Promise<number> {
        return redisClient.delAsync(key);
    }
}
