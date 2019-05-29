"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../../db/redis");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const roomConfig_1 = require("../../../gameConfig/roomConfig");
class ClubRoomList {
    static async pushClubRoomList(json) {
        return await redis_1.redisClient.rpushAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoomId_List}`, ...json.List);
    }
    static async getClubRoomList(json) {
        return await redis_1.redisClient.lrangeAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoomId_List}`, 0, roomConfig_1.MAXUSERSNUMBER);
    }
    static async lremClubRoomList(json) {
        return await redis_1.redisClient.lremAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}${nameSpace_1.redisKeyPrefix.clubRoomId_List}`, 1, `${json.clubid}`);
    }
}
exports.ClubRoomList = ClubRoomList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21MaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL2NvbnRyb2xsZXIvcmVkaXMvY2x1YlJvb21MaXN0L2NsdWJSb29tTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFnRDtBQUNoRCw2REFBK0Q7QUFDL0QsK0RBQWdFO0FBRWhFLE1BQWEsWUFBWTtJQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBd0M7UUFDekUsT0FBTyxNQUFNLG1CQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRywwQkFBYyxDQUFDLGVBQWUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ILENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUF3QjtRQUN4RCxPQUFPLE1BQU0sbUJBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRywwQkFBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLDBCQUFjLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxFQUFFLDJCQUFjLENBQUMsQ0FBQztJQUNySSxDQUFDO0lBQ00sTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUF3QjtRQUN6RCxPQUFPLE1BQU0sbUJBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRywwQkFBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLDBCQUFjLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDckksQ0FBQztDQUNKO0FBWEQsb0NBV0MifQ==