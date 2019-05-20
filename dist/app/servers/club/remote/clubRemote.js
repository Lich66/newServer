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
const redisKeyPrefix_1 = require("../../../gameConfig/redisKeyPrefix");
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
    joinClub(clubrpc) {
        return __awaiter(this, void 0, void 0, function* () {
            const club = yield club_1.Club.getClub({ clubid: clubrpc.clubid, uid: clubrpc.uid });
            if (!club) {
                return null;
            }
            const channel = this.channelService.getChannel(`${redisKeyPrefix_1.redisKeyPrefix.club}${clubrpc.clubid}`, clubrpc.flag);
            const channelUser = channel.getMember(`${clubrpc.uid}`);
            if (!channelUser) {
                channel.add(`${clubrpc.uid}`, clubrpc.sid);
            }
            // redisClient.getAsync
            const user = yield user_1.User.getUser({ userid: clubrpc.uid });
            channel.pushMessage(`${redisKeyPrefix_1.redisKeyPrefix.club}${clubrpc.clubid}`, { user, action: 1 });
            return club;
        });
    }
}
exports.ClubRemote = ClubRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL2NsdWIvcmVtb3RlL2NsdWJSZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHdEQUFxRDtBQUNyRCx3REFBcUQ7QUFDckQsdUVBQW9FO0FBSXBFLG1EQUFtRDtBQUduRCxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRkQsNEJBRUM7QUFVRCxNQUFhLFVBQVU7SUFHbkIsWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRVksVUFBVSxDQUFDLE1BQWMsRUFBRSxVQUFzQjs7WUFDMUQsb0VBQW9FO1lBQ3BFLHNEQUFzRDtRQUMxRCxDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsT0FBaUI7O1lBQ25DLE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLCtCQUFjLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEcsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUM7WUFDRCx1QkFBdUI7WUFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRywrQkFBYyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEYsT0FBTyxJQUFJLENBQUM7UUFFaEIsQ0FBQztLQUFBO0NBQ0o7QUE3QkQsZ0NBNkJDIn0=