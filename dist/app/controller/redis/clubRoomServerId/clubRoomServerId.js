"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../../db/redis");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
class ClubRoomServerId {
    /**
     *
     * 设置某房间的椅子状态
     */
    static async setClubRoomServerId(json) {
        return await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoom}${json.roomid}${nameSpace_1.redisKeyPrefix.clubRoom_sid}`, 'sid', json.sid);
    }
    /**
     *
     * 设置某房间用户状态 主要用于是否在房间内
     */
    static async getClubRoomServerId(json) {
        return await redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoom}${json.roomid}${nameSpace_1.redisKeyPrefix.clubRoom_sid}`, 'sid');
    }
}
exports.ClubRoomServerId = ClubRoomServerId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21TZXJ2ZXJJZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL3JlZGlzL2NsdWJSb29tU2VydmVySWQvY2x1YlJvb21TZXJ2ZXJJZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFnRDtBQUNoRCw2REFBK0Q7QUFFL0QsTUFBYSxnQkFBZ0I7SUFDekI7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFxRDtRQUN6RixPQUFPLE1BQU0sbUJBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRywwQkFBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLDBCQUFjLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsMEJBQWMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RLLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQXdDO1FBQzVFLE9BQU8sTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLDBCQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsMEJBQWMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRywwQkFBYyxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVKLENBQUM7Q0FDSjtBQWhCRCw0Q0FnQkMifQ==