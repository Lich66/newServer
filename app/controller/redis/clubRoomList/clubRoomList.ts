import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';
import { MAXUSERSNUMBER } from '../../../gameConfig/roomConfig';

export class ClubRoomList {
    public static async pushClubRoomList(json: { clubid: number; List: string[] }): Promise<number> {
        return await redisClient.rpushAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoomId_List}`, ...json.List);
    }

    public static async getClubRoomList(json: { clubid: number }): Promise<string[]> {
        return await redisClient.lrangeAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoomId_List}`, 0, MAXUSERSNUMBER);
    }
    public static async lremClubRoomList(json: { clubid: number }) {
        return await redisClient.lremAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoomId_List}`, 1, `${json.clubid}`);
    }
}
