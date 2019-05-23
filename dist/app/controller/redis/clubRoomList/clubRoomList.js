"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../../db/redis");
class ClubRoomList {
    static async setClubRoomList(json) {
        return await redis_1.redisClient.rpushAsync(json.redisClubId, ...json.List);
    }
    static async getClubRoomList(json) {
        const MAXLENGTH = 20;
        return await redis_1.redisClient.lrangeAsync(json.redisClubId, 0, MAXLENGTH);
    }
}
exports.ClubRoomList = ClubRoomList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21MaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL2NvbnRyb2xsZXIvcmVkaXMvY2x1YlJvb21MaXN0L2NsdWJSb29tTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFnRDtBQUVoRCxNQUFhLFlBQVk7SUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUE2QztRQUM3RSxPQUFPLE1BQU0sbUJBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBNkI7UUFDN0QsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLE9BQU8sTUFBTSxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RSxDQUFDO0NBQ0o7QUFURCxvQ0FTQyJ9