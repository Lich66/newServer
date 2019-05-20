import { redisClient } from '../../../db/redis';

export class ClubRoomState {
    public static async setClubRoomState(json: { redisRoomId: string; chairIndex: string; state: string }): Promise<number> {
        return await redisClient.hsetAsync(json.redisRoomId, `${json.chairIndex}`, `${json.state}`);
    }
    public static async getClubRoomState(json: { redisRoomId: string; chairIndex: string; state: string }): Promise<string> {
        return await redisClient.hgetAsync(json.redisRoomId, `${json.chairIndex}`);
    }

    public static async getAllClubRoomState(json: { redisRoomId: string; chairIndex: string; state: string }): Promise<{ [key: string]: string }> {
        return await redisClient.hgetallAsync(json.redisRoomId);
    }
}
