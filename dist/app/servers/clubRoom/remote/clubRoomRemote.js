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
    joinClubRoom(uid, sid, roomid, clubid, flag) {
        return __awaiter(this, void 0, void 0, function* () {
            const clubRoom = yield clubRoom_1.ClubRoom.getClubRoom({ roomid: Number.parseInt(roomid, 0), uid });
            if (!clubRoom) {
                return null;
            }
            const channel = this.channelService.getChannel(roomid, flag);
            const channelUser = channel.getMember(uid);
            if (!channelUser) {
                channel.add(uid, sid);
            }
            const user = yield user_1.User.getUser({ userid: Number.parseInt(uid, 0) });
            channel.pushMessage(`onEntryClubRoom:${roomid}`, { user });
            channel.pushMessage(`onEntryClub${clubid}Room`, { user });
            return clubRoom;
        });
    }
    leaveClubRoom(uid, sid, roomid, clubid, flag) {
        return __awaiter(this, void 0, void 0, function* () {
            const clubRoom = yield clubRoom_1.ClubRoom.getClubRoom({ roomid: Number.parseInt(roomid, 0), uid });
            if (!clubRoom) {
                return null;
            }
            const channel = this.channelService.getChannel(roomid, flag);
            const channelUser = channel.getMember(uid);
            if (channelUser) {
                channel.leave(uid, sid);
            }
            else {
                return null;
            }
            const user = yield user_1.User.getUser({ userid: Number.parseInt(uid, 0) });
            channel.pushMessage(`onEntryClubRoom:${roomid}`, { user });
            channel.pushMessage(`onEntryClub${clubid}Room`, { user });
            return clubRoom;
        });
    }
}
exports.ClubRoomRemote = ClubRoomRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21SZW1vdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViUm9vbS9yZW1vdGUvY2x1YlJvb21SZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLG9FQUFpRTtBQUNqRSx3REFBcUQ7QUFLckQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUZELDRCQUVDO0FBVUQsTUFBYSxjQUFjO0lBR3ZCLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVZLFVBQVUsQ0FBQyxNQUFjLEVBQUUsVUFBc0I7O1lBQzFELHdFQUF3RTtZQUN4RSwwREFBMEQ7UUFDOUQsQ0FBQztLQUFBO0lBRVksWUFBWSxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxJQUFhOztZQUM3RixNQUFNLFFBQVEsR0FBRyxNQUFNLG1CQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN6QjtZQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxNQUFNLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDMUQsT0FBTyxRQUFRLENBQUM7UUFFcEIsQ0FBQztLQUFBO0lBRVksYUFBYSxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxJQUFhOztZQUM5RixNQUFNLFFBQVEsR0FBRyxNQUFNLG1CQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxNQUFNLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDMUQsT0FBTyxRQUFRLENBQUM7UUFFcEIsQ0FBQztLQUFBO0NBQ0o7QUFoREQsd0NBZ0RDIn0=