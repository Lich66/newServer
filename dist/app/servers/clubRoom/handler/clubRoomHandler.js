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
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const game_1 = require("../../../util/game");
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
    getAllClubRoomState(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const MAXLENGTH = 20;
            const clubid = session.get('clubid');
            if (!clubid) {
                return {
                    code: 500
                };
            }
            const roomIdList = yield redis_1.redisClient.lrangeAsync(`${nameSpace_1.redisKeyPrefix.club}${clubid}`, 0, MAXLENGTH);
            console.log(roomIdList);
            const roomarr = [];
            for (const iterator of roomIdList) {
                const json = {};
                json.roomid = iterator;
                const state = yield redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${iterator}`);
                for (const key in state) {
                    if (state.hasOwnProperty(key)) {
                        // const element = state[key];
                        if (!key.startsWith(nameSpace_1.redisKeyPrefix.chair)) {
                            const userinfo = yield user_1.User.getUser({ userid: Number.parseInt(key, 0) });
                            json[key] = userinfo;
                        }
                        else {
                            json[key] = state[key];
                        }
                    }
                }
                roomarr.push(json);
            }
            console.log(roomarr);
            if (roomarr.length > 0) {
                return {
                    code: 200,
                    data: roomarr
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
    getClubRoomState(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const clubid = session.get('clubid');
            if (!clubid) {
                return {
                    code: 500
                };
            }
            const roomid = session.get('roomid');
            if (!roomid) {
                return {
                    code: 500
                };
            }
            const json = {};
            json.roomid = roomid;
            const state = yield redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
            for (const key in state) {
                if (state.hasOwnProperty(key)) {
                    // const element = state[key];
                    if (!key.startsWith(nameSpace_1.redisKeyPrefix.chair)) {
                        const userinfo = yield user_1.User.getUser({ userid: Number.parseInt(key, 0) });
                        json[key] = userinfo;
                    }
                    else {
                        json[key] = state[key];
                    }
                }
            }
            return {
                code: 200,
                data: json
            };
        });
    }
    leaveClubRoom(clubroomrpc, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomChannel = this.channelService.getChannel(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, false);
            const roomChannelUser = roomChannel.getMember(`${session.uid}`);
            if (roomChannelUser) {
                roomChannel.removeMember(`${session.uid}`);
            }
            const chairIndex = yield redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);
            yield redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${session.uid}`);
            yield redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, `${nameSpace_1.redisKeyPrefix.chair}${chairIndex}`, '-1');
            const user = yield user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
            // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 1 });
            roomChannel.pushMessage(`${nameSpace_1.redisKeyPrefix.clubRoom}${session.get('roomid')}`, { user, action: 0 });
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
            const roomid = session.get('roomid');
            const clubid = session.get('clubid');
            const roomChannel = this.channelService.getChannel(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, false);
            const roomChannelUser = roomChannel.getMember(`${session.uid}`);
            if (!roomChannelUser) {
                return {
                    code: 500
                };
            }
            const clubChannel = this.channelService.getChannel(`${nameSpace_1.redisKeyPrefix.club}${clubid}`, false);
            const clubChannelUser = clubChannel.getMember(`${session.uid}`);
            if (!clubChannelUser) {
                return {
                    code: 500
                };
            }
            const roomInfo = yield redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
            let chairIndex = -1;
            let index = 0;
            do {
                if (Number.parseInt(roomInfo[`${nameSpace_1.redisKeyPrefix.chair}${index}`], 0) < 0) {
                    chairIndex = index;
                }
                index++;
            } while (chairIndex < 0 && chairIndex > MAXLENGTH);
            if (chairIndex < 0) {
                return {
                    code: 500
                };
            }
            yield redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, `${session.uid}`, `${chairIndex}`);
            yield redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, `${nameSpace_1.redisKeyPrefix.chair}${chairIndex}`, `${session.uid}`);
            const user = yield user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
            clubChannel.pushMessage(`${nameSpace_1.redisKeyPrefix.club}${clubid}`, { user, action: 2, chairIndex, roomid });
            roomChannel.pushMessage(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, { user, action: 2, chairIndex });
            return {
                code: 200
            };
        });
    }
    standUp(obj, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomid = session.get('roomid');
            const clubid = session.get('clubid');
            const roomChannel = this.channelService.getChannel(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, false);
            const roomChannelUser = roomChannel.getMember(`${session.uid}`);
            if (!roomChannelUser) {
                return {
                    code: 500
                };
            }
            const clubChannel = this.channelService.getChannel(`${nameSpace_1.redisKeyPrefix.club}${clubid}`, false);
            const clubChannelUser = clubChannel.getMember(`${session.uid}`);
            if (!clubChannelUser) {
                return {
                    code: 500
                };
            }
            const chairIndex = yield redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, `${session.uid}`);
            if (Number.parseInt(chairIndex, 0) < 0) {
                return {
                    code: 500
                };
            }
            yield redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, `${session.uid}`, '-1');
            yield redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, `${nameSpace_1.redisKeyPrefix.chair}${chairIndex}`, '-1');
            const user = yield user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
            clubChannel.pushMessage(`${nameSpace_1.redisKeyPrefix.club}${clubid}`, { user, action: 3, chairIndex, roomid });
            roomChannel.pushMessage(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`, { user, action: 3 });
            return {
                code: 200
            };
        });
    }
    startGame(roomid, roomInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const MAXTime = 50000;
            let clubRoom;
            if (!roomInfo) {
                clubRoom = yield clubRoom_1.ClubRoom.getClubRoom({ roomid });
            }
            else {
                clubRoom = roomInfo;
            }
            // const channel = this.channelService.getChannel(`${redisKeyPrefix.clubRoom}${roomid}`);
            let game = new game_1.Game(clubRoom, this.channelService);
            this.app.set(`${nameSpace_1.gameKeyPrefix.club_room_game}${roomid}`, game);
            const state = yield redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${roomid}`);
            for (const key in state) {
                if (state.hasOwnProperty(key)) {
                    // const element = state[key];
                    if (key.startsWith(nameSpace_1.redisKeyPrefix.chair)) {
                        game.pushUser(Number.parseInt(state[key], 0));
                    }
                }
            }
            const round = clubRoom.round;
            let roundIndex = 1;
            const timmer = setInterval(() => {
                game.sendPoker();
                setTimeout(() => {
                    game.settlement();
                }, 10000);
                roundIndex++;
                if (roundIndex == round) {
                    clearInterval(timmer);
                    game = null;
                }
            }, MAXTime);
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY2x1YlJvb20vaGFuZGxlci9jbHViUm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLG9FQUFpRTtBQUNqRSx3REFBcUQ7QUFDckQsNkNBQWdEO0FBQ2hELDZEQUE4RTtBQUc5RSw2Q0FBMEM7QUFHMUMsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELDRCQUVDO0FBRUQsTUFBYSxPQUFPO0lBR2hCLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVZLGNBQWMsQ0FBQyxZQUE4QixFQUFFLE9BQXVCOztZQUMvRSxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFRCxvQkFBb0I7SUFDUCxjQUFjLENBQUMsWUFBOEIsRUFBRSxPQUF1Qjs7WUFFL0UsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBRVksY0FBYyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7O1lBRS9FLElBQUksS0FBSyxxQkFBUSxZQUFZLENBQUUsQ0FBQztZQUNoQyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDcEIsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQ3pCLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUVwQixJQUFJLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FB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