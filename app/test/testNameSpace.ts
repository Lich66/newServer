import { redisClient } from '../db/redis';
import { redisKeyPrefix } from '../gameConfig/nameSpace';

async function hello() {
    let result = await redisClient.get(`${redisKeyPrefix.userRoomList}${'501'}`);
    console.log(result);
}


