"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../../db/redis");
class ClubRoomState {
    static async setClubRoomState(json) {
        return await redis_1.redisClient.hsetAsync(json.redisRoomId, `${json.chairIndex}`, `${json.state}`);
    }
    static async getClubRoomState(json) {
        return await redis_1.redisClient.hgetAsync(json.redisRoomId, `${json.chairIndex}`);
    }
    static async getAllClubRoomState(json) {
        return await redis_1.redisClient.hgetallAsync(json.redisRoomId);
    }
}
exports.ClubRoomState = ClubRoomState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21TdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL3JlZGlzL2NsdWJSb29tU3RhdGUvY2x1YlJvb21TdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFnRDtBQUVoRCxNQUFhLGFBQWE7SUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQWdFO1FBQ2pHLE9BQU8sTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBZ0U7UUFDakcsT0FBTyxNQUFNLG1CQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFnRTtRQUNwRyxPQUFPLE1BQU0sbUJBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDSjtBQVhELHNDQVdDIn0=