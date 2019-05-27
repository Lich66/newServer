"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../../db/redis");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const roomConfig_1 = require("../../../gameConfig/roomConfig");
class ClubRoomList {
    static async setClubRoomList(json) {
        return await redis_1.redisClient.rpushAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoomId_List}`, ...json.List);
    }
    static async getClubRoomList(json) {
        return await redis_1.redisClient.lrangeAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoomId_List}`, 0, roomConfig_1.MAXUSERSNUMBER);
    }
}
exports.ClubRoomList = ClubRoomList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21MaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL2NvbnRyb2xsZXIvcmVkaXMvY2x1YlJvb21MaXN0L2NsdWJSb29tTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFnRDtBQUNoRCw2REFBK0Q7QUFDL0QsK0RBQWdFO0FBRWhFLE1BQWEsWUFBWTtJQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQXdDO1FBQ3hFLE9BQU8sTUFBTSxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLDBCQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsMEJBQWMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvSCxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBd0I7UUFDeEQsT0FBTyxNQUFNLG1CQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRywwQkFBYyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsRUFBRSwyQkFBYyxDQUFDLENBQUM7SUFDckksQ0FBQztDQUNKO0FBUkQsb0NBUUMifQ==