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
    // public async createRoom(msg: ICreateRoomRequest, session: FrontendSession) {
    //     console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
    //     let userid: number = parseInt(session.uid, 0);
    //     let result = await RoomManager.createRoom(userid, msg.roomConfig, this.app);
    //     if (!result.flag) {
    //         return {
    //             code: result.code
    //         };
    //     }
    //     const sid = this.app.getServerId();
    //     await this.app.rpc.room.roomRemote.createRoom.route(session)(result.json);
    //     return { code: 0, roomid: result.roomId };
    // }
    joinRoom(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
            let userId = parseInt(session.uid, 0);
            let sid = this.app.getServerId();
            let result = yield this.app.rpc.room.roomRemote.joinRoom.route(session)(userId, msg.roomId, sid);
            // let roomList = this.app.get('roomList');
            // console.log('在connector获取roomList:' + JSON.stringify(Object.keys(roomList)));
            // let result = await RoomManager.joinRoom(userId, msg.roomId, this.app);
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
            return result;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY29ubmVjdG9yL2hhbmRsZXIvZW50cnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSw2Q0FBZ0Q7QUFDaEQsNkRBQStEO0FBTS9ELG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFGRCw0QkFFQztBQUVELE1BQWEsT0FBTztJQUVoQixZQUFtQixHQUFnQjtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBQ1ksSUFBSSxDQUFDLFFBQTBCLEVBQUUsT0FBd0I7O1lBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdELE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7aUJBQ1osQ0FBQzthQUNMO1lBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUM7YUFDTDtZQUNELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFdEQsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7Z0JBQ25ELE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7aUJB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