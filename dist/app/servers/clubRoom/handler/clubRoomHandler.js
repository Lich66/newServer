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
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
        this.channelService = app.get('channelService');
    }
    createClubRoom(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    // 假的 删除的时候解散茶楼 就都删了
    deleteClubRoom(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    updateClubRoom(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let njson = Object.assign({}, ClubRoominfo);
            delete njson.roomid;
            delete njson.create_time;
            delete njson.clubid;
            delete njson.owner;
            let result = yield clubRoom_1.ClubRoom.updateClubRoom({ roomid: ClubRoominfo.roomid, clubid: ClubRoominfo.roomid, uid: session.uid }, njson);
            if (result) {
                return {
                    code: 200,
                    data: result
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
    getClubRoom(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield clubRoom_1.ClubRoom.getClubRoom({ clubid: ClubRoominfo.clubid });
            if (result) {
                return {
                    code: 200,
                    data: result
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
    getAllClubRoom(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield clubRoom_1.ClubRoom.getAllClubRoom({ clubid: ClubRoominfo.clubid });
            if (result.length > 0) {
                return {
                    code: 200,
                    data: result
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
    leaveClubRoom(clubroomrpc, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomChannel = this.channelService.getChannel(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, false);
            const roomChannelUser = roomChannel.getMember(`${session.uid}`);
            if (roomChannelUser) {
                roomChannel.removeMember(`${session.uid}`);
            }
            const chairIndex = yield redis_1.redisClient.hgetAsync(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);
            yield redis_1.redisClient.hdelAsync(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);
            yield redis_1.redisClient.hsetAsync(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${redisKeyPrefix_1.redisKeyPrefix.chair}${chairIndex}`, '-1');
            const user = yield user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
            // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 1 });
            roomChannel.pushMessage(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, { user, action: 0 });
            session.set('roomid', null);
            session.push('roomid', () => {
            });
            return {
                code: 200,
                data: session.get('clubid')
            };
        });
    }
    sitDown(obj, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const MAXLENGTH = 20;
            const roomChannel = this.channelService.getChannel(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, false);
            const roomChannelUser = roomChannel.getMember(`${session.uid}`);
            if (!roomChannelUser) {
                return {
                    code: 500
                };
            }
            const roomInfo = yield redis_1.redisClient.hgetallAsync(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`);
            let chairIndex = -1;
            let index = 0;
            do {
                if (Number.parseInt(roomInfo[`${redisKeyPrefix_1.redisKeyPrefix.chair}${index}`], 0) < 0) {
                    chairIndex = index;
                }
                index++;
            } while (chairIndex < 0 && chairIndex > MAXLENGTH);
            if (chairIndex < 0) {
                return {
                    code: 500
                };
            }
            yield redis_1.redisClient.hsetAsync(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`, `${chairIndex}`);
            yield redis_1.redisClient.hsetAsync(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${redisKeyPrefix_1.redisKeyPrefix.chair}${chairIndex}`, `${session.uid}`);
            const user = yield user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
            // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 1 });
            roomChannel.pushMessage(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, { user, action: 2, chairIndex });
            return {
                code: 200
            };
        });
    }
    standUp(obj, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomChannel = this.channelService.getChannel(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, false);
            const roomChannelUser = roomChannel.getMember(`${session.uid}`);
            if (!roomChannelUser) {
                return {
                    code: 500
                };
            }
            const chairIndex = yield redis_1.redisClient.hgetAsync(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);
            if (Number.parseInt(chairIndex, 0) < 0) {
                return {
                    code: 500
                };
            }
            yield redis_1.redisClient.hsetAsync(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`, '-1');
            yield redis_1.redisClient.hsetAsync(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${redisKeyPrefix_1.redisKeyPrefix.chair}${chairIndex}`, '-1');
            const user = yield user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
            // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 1 });
            roomChannel.pushMessage(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, { user, action: 3 });
            return {
                code: 200
            };
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY2x1YlJvb20vaGFuZGxlci9jbHViUm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLG9FQUFpRTtBQUNqRSx3REFBcUQ7QUFDckQsNkNBQWdEO0FBQ2hELHVFQUFvRTtBQUlwRSxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRCxNQUFhLE9BQU87SUFFaEIsWUFBMkIsR0FBZ0I7UUFBaEIsUUFBRyxHQUFILEdBQUcsQ0FBYTtRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRVksY0FBYyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7O1lBQy9FLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVELG9CQUFvQjtJQUNQLGNBQWMsQ0FBQyxZQUE4QixFQUFFLE9BQXVCOztZQUUvRSxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFWSxjQUFjLENBQUMsWUFBOEIsRUFBRSxPQUF1Qjs7WUFFL0UsSUFBSSxLQUFLLHFCQUFRLFlBQVksQ0FBRSxDQUFDO1lBQ2hDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNwQixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDekIsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ3BCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztZQUVuQixJQUFJLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFF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