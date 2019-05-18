import { redisClient } from '../../../db/redis';

export class ClubRoomList {
    public static async setClubRoomList(json: { redisClubId: string; List: string[] }): Promise<number> {
        return await redisClient.rpushAsync(json.redisClubId, ...json.List);
    }

    public static async getClubRoomList(json: { redisClubId: string }): Promise<string[]> {
        const MAXLENGTH = 20;
        return await redisClient.lrangeAsync(json.redisClubId, 0, MAXLENGTH);
    }
}
