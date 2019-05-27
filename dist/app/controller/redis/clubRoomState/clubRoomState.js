"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../../db/redis");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
class ClubRoomState {
    /**
     *
     * 设置某房间的椅子状态
     */
    static async setClubRoomChairState(json) {
        return await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoom}${json.roomid}${nameSpace_1.redisKeyPrefix.chair}`, `${json.chairIndex}`, `${json.state}`);
    }
    /**
     *
     * 设置某房间用户状态 主要用于是否在房间内
     */
    static async setClubRoomUserState(json) {
        return await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoom}${json.roomid}${nameSpace_1.redisKeyPrefix.clubRoom_users}`, `${json.uid}`, `${json.state}`);
    }
    /**
     *
     * 通过uid获取某房间的用户状态
     */
    static async getClubRoomUserState(json) {
        return await redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoom}${json.roomid}${nameSpace_1.redisKeyPrefix.clubRoom_users}`, `${json.uid}`);
    }
    /**
     *
     * 通过椅子的index获取椅子状态
     */
    static async getClubRoomChairState(json) {
        return await redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoom}${json.roomid}${nameSpace_1.redisKeyPrefix.chair}`, `${json.chairIndex}`);
    }
    /**
     *
     * 获取某房间的所有用户状态
     */
    static async getClubRoomAllUsersState(json) {
        return await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoom}${json.roomid}${nameSpace_1.redisKeyPrefix.clubRoom_users}`);
    }
    /**
     *
     * 获取某房间的所有椅子状态
     */
    static async getClubRoomAllChairsState(json) {
        return await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoom}${json.roomid}${nameSpace_1.redisKeyPrefix.chair}`);
    }
    /**
     *
     * 删除某房间用户 椅子也一并处理
     */
    static async delClubRoomUser(json) {
        const { clubid, roomid, uid } = json;
        const chairIndex = await this.getClubRoomUserState({ clubid, roomid, uid });
        /**
         * 清空椅子
         */
        if (Number.parseInt(chairIndex, 0) > 0) {
            this.setClubRoomChairState({ chairIndex: Number.parseInt(chairIndex, 0), clubid, roomid, state: -1 });
        }
        redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoom}${json.roomid}${nameSpace_1.redisKeyPrefix.user}`, `${json.uid}`);
    }
}
exports.ClubRoomState = ClubRoomState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21TdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL3JlZGlzL2NsdWJSb29tU3RhdGUvY2x1YlJvb21TdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFnRDtBQUNoRCw2REFBK0Q7QUFFL0QsTUFBYSxhQUFhO0lBQ3RCOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBMkU7UUFDakgsT0FBTyxNQUFNLG1CQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRywwQkFBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLDBCQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNyTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFvRTtRQUN6RyxPQUFPLE1BQU0sbUJBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRywwQkFBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLDBCQUFjLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsMEJBQWMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQXFEO1FBQzFGLE9BQU8sTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLDBCQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsMEJBQWMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRywwQkFBYyxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdEssQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBNEQ7UUFDbEcsT0FBTyxNQUFNLG1CQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRywwQkFBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLDBCQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwSyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxJQUF3QztRQUNqRixPQUFPLE1BQU0sbUJBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRywwQkFBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLDBCQUFjLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsMEJBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQzFKLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLElBQXdDO1FBQ2xGLE9BQU8sTUFBTSxtQkFBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLDBCQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsMEJBQWMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRywwQkFBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDakosQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQXFEO1FBQ3JGLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQyxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM1RTs7V0FFRztRQUNILElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDekc7UUFDRCxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLDBCQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsMEJBQWMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRywwQkFBYyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDL0ksQ0FBQztDQUNKO0FBOURELHNDQThEQyJ9