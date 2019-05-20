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
const redis_1 = require("../../../db/redis");
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
            redis_1.redisClient.hsetAsync(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, `${user.userid}`, '-1');
            // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 0 });
            roomChannel.pushMessage(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, { user, action: 1 });
            return clubRoom;
        });
    }
}
exports.ClubRoomRemote = ClubRoomRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21SZW1vdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViUm9vbS9yZW1vdGUvY2x1YlJvb21SZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLG9FQUFpRTtBQUNqRSx3REFBcUQ7QUFDckQsNkNBQWdEO0FBQ2hELHVFQUFvRTtBQUlwRSxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRkQsNEJBRUM7QUFVRCxNQUFhLGNBQWM7SUFHdkIsWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRVksVUFBVSxDQUFDLE1BQWMsRUFBRSxVQUFzQjs7WUFDMUQsd0VBQXdFO1lBQ3hFLDBEQUEwRDtRQUM5RCxDQUFDO0tBQUE7SUFFWSxZQUFZLENBQUMsV0FBeUI7O1lBQy9DLE1BQU0sUUFBUSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRywrQkFBYyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hILE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUNsQixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxRDtZQUNELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsK0JBQWMsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwSCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDbEIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDMUQ7WUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLFdBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDN0QsbUJBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRywrQkFBYyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakcsK0ZBQStGO1lBQy9GLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRywrQkFBYyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEcsT0FBTyxRQUFRLENBQUM7UUFFcEIsQ0FBQztLQUFBO0NBQ0o7QUFwQ0Qsd0NBb0NDIn0=