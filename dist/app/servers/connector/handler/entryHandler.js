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
const roomManager_1 = require("../../../controller/room/roomManager");
const redis_1 = require("../../../db/redis");
const redisKeyPrefix_1 = require("../../../gameConfig/redisKeyPrefix");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
    }
    auth(userinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userinfo.token && !userinfo.wxopenid && !userinfo.xlopenid) {
                return {
                    code: 400
                };
            }
            const user = yield this.app.rpc.user.userRemote.auth.route(session)(userinfo);
            if (!user) {
                return {
                    code: 500
                };
            }
            const sessionService = this.app.get('sessionService');
            if (!!sessionService.getByUid(user.userid.toString())) {
                return {
                    code: 500
                };
            }
            yield session.abind(user.userid.toString());
            session.set('usernick', user.usernick);
            session.push('usernick', () => {
            });
            for (let key in user) {
                if (user.hasOwnProperty(key)) {
                    yield redis_1.redisClient.hsetAsync(`${redisKeyPrefix_1.redisKeyPrefix.user}${user.userid}`, key, user[key]);
                }
            }
            return {
                code: 200,
                data: user,
                msg: 'game server is ok.'
            };
        });
    }
    accountLogin(userinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.app.rpc.user.userRemote.accountLogin.route(session)(userinfo);
            if (user) {
                return {
                    code: 200,
                    data: user
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
    tokenLogin(userinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(JSON.stringify(userinfo));
            const user = yield this.app.rpc.user.userRemote.tokenLogin.route(session)(userinfo);
            if (user) {
                return {
                    code: 200,
                    data: user
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
    // ---------------------------------------------------------------------
    // ------------------------------ 野生房间 ------------------------------    
    // ---------------------------------------------------------------------
    createRoom(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
            let userid = parseInt(session.uid, 0);
            let result = yield roomManager_1.RoomManager.createRoom(userid, msg.roomConfig);
            if (!result.flag) {
                return {
                    code: result.code,
                    msg: result.msg
                };
            }
            yield this.app.rpc.room.roomRemote.createRoom.route(session)(result.roomId);
            return { code: 200, roomid: result.roomId };
        });
    }
    joinRoom(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
            let userId = parseInt(session.uid, 0);
            let result = yield roomManager_1.RoomManager.joinRoom(userId, msg.roomId);
            if (!result.flag) {
                return {
                    code: result.code,
                    msg: result.msg
                };
            }
            return null;
        });
    }
    publish(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {
                topic: 'publish',
                payload: JSON.stringify({ code: 200, msg: 'publish message is ok.' })
            };
            return result;
        });
    }
    subscribe(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {
                topic: 'subscribe',
                payload: JSON.stringify({ code: 200, msg: 'subscribe message is ok.' })
            };
            return result;
        });
    }
    joinClub(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            session.set('clubid', msg.clubid);
            session.push('clubid', () => {
            });
            let club = yield this.app.rpc.club.clubRemote.joinClub.route(session)(session.uid, this.app.getServerId(), msg.clubid.toString(), true);
            return club;
        });
    }
    leaveClub(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            session.set('roomid', null);
            session.push('roomid', () => {
            });
            session.set('clubid', null);
            session.push('clubid', () => {
            });
            let club = yield this.app.rpc.club.clubRemote.joinClub.route(session)(session.uid, this.app.getServerId(), msg.clubid.toString(), true);
            return club;
        });
    }
    joinClubRoom(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            session.set('roomid', msg.roomid);
            session.push('roomid', () => {
            });
            const clubid = session.get('clubid');
            let club = yield this.app.rpc.clubRoom.clubRoomRemote.joinClubRoom.route(session)(session.uid, this.app.getServerId(), clubid, msg.roomid.toString(), true);
            return club;
        });
    }
    leaveClubRoom(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            session.set('roomid', null);
            session.push('roomid', () => {
            });
            let club = yield this.app.rpc.club.clubRemote.joinClub.route(session)(session.uid, this.app.getServerId(), msg.clubid.toString(), true);
            return club;
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY29ubmVjdG9yL2hhbmRsZXIvZW50cnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxzRUFBbUU7QUFDbkUsNkNBQWdEO0FBQ2hELHVFQUFvRTtBQU9wRSxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRCxNQUFhLE9BQU87SUFDaEIsWUFBMkIsR0FBZ0I7UUFBaEIsUUFBRyxHQUFILEdBQUcsQ0FBYTtJQUUzQyxDQUFDO0lBQ1ksSUFBSSxDQUFDLFFBQTBCLEVBQUUsT0FBd0I7O1lBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdELE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7aUJBQ1osQ0FBQzthQUNMO1lBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUM7YUFDTDtZQUNELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFdEQsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7Z0JBQ25ELE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7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