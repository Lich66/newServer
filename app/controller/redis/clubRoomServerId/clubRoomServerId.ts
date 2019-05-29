import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';

export class ClubRoomServerId {
    /**
     * 
     * 设置某房间的椅子状态
     */
    public static async setClubRoomServerId(json: { clubid: number; roomid: number; sid: string }): Promise<number> {
        return await redisClient.hsetAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoom}${json.roomid}${redisKeyPrefix.clubRoom_sid}`, 'sid', json.sid);
    }

    /**
     * 
     * 设置某房间用户状态 主要用于是否在房间内 
     */
    public static async getClubRoomServerId(json: { clubid: number; roomid: number }): Promise<string> {
        return await redisClient.hgetAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoom}${json.roomid}${redisKeyPrefix.clubRoom_sid}`, 'sid');
    }
}
