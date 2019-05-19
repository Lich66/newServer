"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const clubRoom_1 = require("../../../controller/clubRoom/clubRoom");
const user_1 = require("../../../controller/user/user");
const redisKeyPrefix_1 = require("../../../gameConfig/redisKeyPrefix");
function default_1(app) {
    return new ClubRoomRemote(app);
}
exports.default = default_1;
class ClubRoomRemote {
    constructor(app) {
        this.app = app;
        this.channelService = app.get('channelService');
    }
    createclub(userId, clubConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            // let clubRoom = await this.clubManager.createclub(userId, clubConfig);
            // return { code: 200, data: { clubId: clubRoom.clubId } }
        });
    }
    joinClubRoom(clubroomrpc) {
        return __awaiter(this, void 0, void 0, function* () {
            const clubRoom = yield clubRoom_1.ClubRoom.getClubRoom({ roomid: clubroomrpc.roomid });
            if (!clubRoom) {
                return null;
            }
            const roomChannel = this.channelService.getChannel(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, clubroomrpc.flag);
            const roomChannelUser = roomChannel.getMember(`${clubroomrpc.uid}`);
            if (!roomChannelUser) {
                roomChannel.add(`${clubroomrpc.uid}`, clubroomrpc.sid);
            }
            const clubChannel = this.channelService.getChannel(`${redisKeyPrefix_1.redisKeyPrefix.club}${clubroomrpc.clubid}`, clubroomrpc.flag);
            const clubChannelUser = clubChannel.getMember(`${clubroomrpc.uid}`);
            if (!clubChannelUser) {
                clubChannel.add(`${clubroomrpc.uid}`, clubroomrpc.sid);
            }
            const user = yield user_1.User.getUser({ userid: clubroomrpc.uid });
            // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 0 });
            roomChannel.pushMessage(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, { user, action: 1 });
            return clubRoom;
        });
    }
    leaveClubRoom(clubroomrpc) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomChannel = this.channelService.getChannel(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, clubroomrpc.flag);
            const roomChannelUser = roomChannel.getMember(`${clubroomrpc.uid}`);
            if (roomChannelUser) {
                roomChannel.leave(`${clubroomrpc.uid}`, clubroomrpc.sid);
            }
            const user = yield user_1.User.getUser({ userid: clubroomrpc.uid });
            // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 1 });
            roomChannel.pushMessage(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, { user, action: 0 });
            return user;
        });
    }
}
exports.ClubRoomRemote = ClubRoomRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21SZW1vdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViUm9vbS9yZW1vdGUvY2x1YlJvb21SZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLG9FQUFpRTtBQUNqRSx3REFBcUQ7QUFDckQsdUVBQW9FO0FBS3BFLG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFGRCw0QkFFQztBQVVELE1BQWEsY0FBYztJQUd2QixZQUFtQixHQUFnQjtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFWSxVQUFVLENBQUMsTUFBYyxFQUFFLFVBQXNCOztZQUMxRCx3RUFBd0U7WUFDeEUsMERBQTBEO1FBQzlELENBQUM7S0FBQTtJQUVZLFlBQVksQ0FBQyxXQUF5Qjs7WUFDL0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxtQkFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNYLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLCtCQUFjLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEgsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ2xCLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzFEO1lBQ0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRywrQkFBYyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BILE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUNsQixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxRDtZQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM3RCwrRkFBK0Y7WUFDL0YsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLCtCQUFjLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRyxPQUFPLFFBQVEsQ0FBQztRQUVwQixDQUFDO0tBQUE7SUFFWSxhQUFhLENBQUMsV0FBeUI7O1lBQ2hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsK0JBQWMsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4SCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxlQUFlLEVBQUU7Z0JBQ2pCLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzdELCtGQUErRjtZQUMvRixXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsK0JBQWMsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hHLE9BQU8sSUFBSSxDQUFDO1FBRWhCLENBQUM7S0FBQTtDQUNKO0FBL0NELHdDQStDQyJ9