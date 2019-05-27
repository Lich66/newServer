import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';
import { MAXUSERSNUMBER } from '../../../gameConfig/roomConfig';

export class ClubRoomList {
    public static async setClubRoomList(json: { clubid: number; List: string[] }): Promise<number> {
        return await redisClient.rpushAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoomId_List}`, ...json.List);
    }

    public static async getClubRoomList(json: { clubid: number }): Promise<string[]> {
        return await redisClient.lrangeAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoomId_List}`, 0, MAXUSERSNUMBER);
    }
}
