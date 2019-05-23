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
const nameSpace_1 = require("../../../gameConfig/nameSpace");
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
                    code: 501
                };
            }
            const sessionService = this.app.get('sessionService');
            if (!!sessionService.getByUid(user.userid.toString())) {
                return {
                    code: 502
                };
            }
            yield session.abind(user.userid.toString());
            session.set('usernick', user.usernick);
            session.push('usernick', () => {
            });
            console.log(JSON.stringify(user));
            for (let key in user) {
                if (user.hasOwnProperty(key)) {
                    console.log(`${nameSpace_1.redisKeyPrefix.user}${user.userid}`, key, user[key]);
                    yield redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${user.userid}`, key, `${user[key]}`);
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
                    code: result.code
                };
            }
            const sid = this.app.getServerId();
            yield this.app.rpc.room.roomRemote.createRoom.route(session)(result.json, sid);
            return { code: 200, roomid: result.roomId };
        });
    }
    joinRoom(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
            // let userId: number = parseInt(session.uid, 0);
            // let result = await RoomManager.joinRoom(userId, msg.roomId);
            // if (!result.flag) {
            //     return {
            //         code: result.code,
            //         msg: result.msg
            //     };
            // }
            // return {
            //     code: result.code,
            //     roomConfig: result.roomConfig,
            //     userList: result.userList,
            //     onlookerList: result.onlookerList
            // };
            return { code: 500 };
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
            const sid = this.app.getServerId();
            // session.uid, this.app.getServerId(), msg.clubid.toString(), true
            let club = yield this.app.rpc.club.clubRemote.joinClub.route(session)({ uid: Number.parseInt(session.uid, 0), sid, clubid: msg.clubid, flag: true });
            if (club) {
                return {
                    code: 200,
                    data: club
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
    joinClubRoom(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            session.set('roomid', msg.roomid);
            session.push('roomid', () => {
            });
            const clubid = session.get('clubid');
            const sid = this.app.getServerId();
            let clubRoom = yield this.app.rpc.clubRoom.clubRoomRemote.joinClubRoom.route(session)({ uid: Number.parseInt(session.uid, 0), sid, clubid, roomid: msg.roomid, flag: true });
            if (clubRoom) {
                return {
                    code: 200,
                    data: clubRoom
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY29ubmVjdG9yL2hhbmRsZXIvZW50cnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxzRUFBbUU7QUFDbkUsNkNBQWdEO0FBQ2hELDZEQUErRDtBQU0vRCxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRCxNQUFhLE9BQU87SUFDaEIsWUFBMkIsR0FBZ0I7UUFBaEIsUUFBRyxHQUFILEdBQUcsQ0FBYTtJQUUzQyxDQUFDO0lBQ1ksSUFBSSxDQUFDLFFBQTBCLEVBQUUsT0FBd0I7O1lBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdELE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7aUJBQ1osQ0FBQzthQUNMO1lBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUM7YUFDTDtZQUNELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFdEQsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7Z0JBQ25ELE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7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