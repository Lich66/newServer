import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';

export class ClubRoomState {
    /**
     * 
     * 设置某房间的椅子状态
     */
    public static async setClubRoomChairState(json: { clubid: number; roomid: number; chairIndex: number; state: number }): Promise<number> {
        return await redisClient.hsetAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoom}${json.roomid}${redisKeyPrefix.chair}`, `${json.chairIndex}`, `${json.state}`);
    }

    /**
     * 
     * 设置某房间用户状态 主要用于是否在房间内 
     */
    public static async setClubRoomUserState(json: { clubid: number; roomid: number; uid: number; state: number }): Promise<number> {
        return await redisClient.hsetAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoom}${json.roomid}${redisKeyPrefix.clubRoom_users}`, `${json.uid}`, `${json.state}`);
    }

    /**
     * 
     * 通过uid获取某房间的用户状态
     */
    public static async getClubRoomUserState(json: { clubid: number; roomid: number; uid: number }): Promise<string> {
        return await redisClient.hgetAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoom}${json.roomid}${redisKeyPrefix.clubRoom_users}`, `${json.uid}`);
    }

    /**
     * 
     * 通过椅子的index获取椅子状态
     */
    public static async getClubRoomChairState(json: { clubid: number; roomid: number; chairIndex: number }): Promise<string> {
        return await redisClient.hgetAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoom}${json.roomid}${redisKeyPrefix.chair}`, `${json.chairIndex}`);
    }

    /**
     * 
     * 获取某房间的所有用户状态
     */
    public static async getClubRoomAllUsersState(json: { clubid: number; roomid: number }): Promise<{ [key: string]: string }> {
        return await redisClient.hgetallAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoom}${json.roomid}${redisKeyPrefix.clubRoom_users}`);
    }
    /**
     * 
     * 获取某房间的所有椅子状态
     */
    public static async getClubRoomAllChairsState(json: { clubid: number; roomid: number }): Promise<{ [key: string]: string }> {
        return await redisClient.hgetallAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoom}${json.roomid}${redisKeyPrefix.chair}`);
    }
    /**
     * 
     * 删除某房间用户 椅子也一并处理
     */
    public static async delClubRoomUser(json: { clubid: number; roomid: number; uid: number }) {
        const { clubid, roomid, uid } = json;
        const chairIndex = await this.getClubRoomUserState({ clubid, roomid, uid });
        /**
         * 清空椅子
         */
        if (Number.parseInt(chairIndex, 0) > 0) {
            this.setClubRoomChairState({ chairIndex: Number.parseInt(chairIndex, 0), clubid, roomid, state: -1 });
        }
        redisClient.hdelAsync(`${redisKeyPrefix.club}${json.clubid}${redisKeyPrefix.clubRoom}${json.roomid}${redisKeyPrefix.user}`, `${json.uid}`);
    }
}
