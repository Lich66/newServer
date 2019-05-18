import { redisClient } from '../../../db/redis';

export class ClubRoomState {
    public static async setClubRoomState(json: { redisRoomId: string; chairIndex: number; state: number }): Promise<number> {
        return await redisClient.hsetAsync(json.redisRoomId, `${json.chairIndex}`, `${json.state}`);
    }
    public static async getClubRoomState(json: { redisRoomId: string; chairIndex: number; state: number }): Promise<string> {
        return await redisClient.hgetAsync(json.redisRoomId, `${json.chairIndex}`);
    }
}
