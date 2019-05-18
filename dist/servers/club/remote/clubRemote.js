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
const club_1 = require("../../../controller/club/club");
const user_1 = require("../../../controller/user/user");
// import { redisClient } from '../../../db/redis';
function default_1(app) {
    return new ClubRemote(app);
}
exports.default = default_1;
class ClubRemote {
    constructor(app) {
        this.app = app;
        this.channelService = app.get('channelService');
    }
    createclub(userId, clubConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            // let club = await this.clubManager.createclub(userId, clubConfig);
            // return { code: 200, data: { clubId: club.clubId } }
        });
    }
    joinClub(uid, sid, clubid, flag) {
        return __awaiter(this, void 0, void 0, function* () {
            const club = yield club_1.Club.getClub({ clubid: Number.parseInt(clubid, 0) });
            if (!club) {
                return null;
            }
            const channel = this.channelService.getChannel(clubid, flag);
            const channelUser = channel.getMember(uid);
            if (!channelUser) {
                channel.add(uid, sid);
            }
            // redisClient.getAsync
            const user = yield user_1.User.getUser({ userid: Number.parseInt(uid, 0) });
            channel.pushMessage(`onEntryClub:${clubid}`, { user });
            return club;
        });
    }
    leaveClub(uid, sid, clubid, flag) {
        return __awaiter(this, void 0, void 0, function* () {
            const club = yield club_1.Club.getClub({ clubid: Number.parseInt(clubid, 0) });
            if (!club) {
                return null;
            }
            const channel = this.channelService.getChannel(clubid, flag);
            const channelUser = channel.getMember(uid);
            if (channelUser) {
                channel.leave(uid, sid);
            }
            else {
                return null;
            }
            const user = yield user_1.User.getUser({ userid: Number.parseInt(uid, 0) });
            channel.pushMessage(`onEntryClub:${clubid}`, { user });
            return club;
        });
    }
}
exports.ClubRemote = ClubRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL2NsdWIvcmVtb3RlL2NsdWJSZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHdEQUFxRDtBQUNyRCx3REFBcUQ7QUFFckQsbURBQW1EO0FBR25ELG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFGRCw0QkFFQztBQVVELE1BQWEsVUFBVTtJQUduQixZQUFtQixHQUFnQjtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFWSxVQUFVLENBQUMsTUFBYyxFQUFFLFVBQXNCOztZQUMxRCxvRUFBb0U7WUFDcEUsc0RBQXNEO1FBQzFELENBQUM7S0FBQTtJQUVZLFFBQVEsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLE1BQWMsRUFBRSxJQUFhOztZQUN6RSxNQUFNLElBQUksR0FBRyxNQUFNLFdBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDekI7WUFDRCx1QkFBdUI7WUFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRSxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQWUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxDQUFDO1FBRWhCLENBQUM7S0FBQTtJQUdZLFNBQVMsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLE1BQWMsRUFBRSxJQUFhOztZQUMxRSxNQUFNLElBQUksR0FBRyxNQUFNLFdBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLElBQUksV0FBVyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxNQUFNLElBQUksR0FBRyxNQUFNLFdBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sQ0FBQyxXQUFXLENBQUMsZUFBZSxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdkQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBRUo7QUFoREQsZ0NBZ0RDIn0=