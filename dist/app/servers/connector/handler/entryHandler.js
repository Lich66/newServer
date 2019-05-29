"use strict";
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
    async auth(userinfo, session) {
        if (!userinfo.token && !userinfo.wxopenid && !userinfo.xlopenid) {
            return {
                code: 400
            };
        }
        const user = await this.app.rpc.user.userRemote.auth.route(session)(userinfo);
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
        await session.abind(user.userid.toString());
        session.set('usernick', user.usernick);
        session.push('usernick', () => {
        });
        console.log(JSON.stringify(user));
        for (let key in user) {
            if (user.hasOwnProperty(key)) {
                console.log(`${nameSpace_1.redisKeyPrefix.user}${user.userid}`, key, user[key]);
                await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${user.userid}`, key, `${user[key]}`);
            }
        }
        return {
            code: 0,
            data: user,
            msg: 'game server is ok.'
        };
    }
    async accountLogin(userinfo, session) {
        const user = await this.app.rpc.user.userRemote.accountLogin.route(session)(userinfo);
        const sessionService = this.app.get('sessionService');
        if (!!sessionService.getByUid(user.userid.toString())) {
            return {
                code: 502
            };
        }
        if (user) {
            return {
                code: 0,
                data: user
            };
        }
        else {
            return {
                code: 504
            };
        }
    }
    async tokenLogin(userinfo, session) {
        // console.log(JSON.stringify(userinfo));
        const user = await this.app.rpc.user.userRemote.tokenLogin.route(session)(userinfo);
        const sessionService = this.app.get('sessionService');
        if (!!sessionService.getByUid(user.userid.toString())) {
            return {
                code: 502
            };
        }
        if (user) {
            return {
                code: 0,
                data: user
            };
        }
        else {
            return {
                code: 504
            };
        }
    }
    // ------------------------------ 野生房间 ------------------------------    
    // public async joinRoom(msg: IJoinRoomRequest, session: FrontendSession) {
    //     console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
    //     let userId: number = parseInt(session.uid, 0);
    //     let result = await this.app.rpc.room.roomRemote.joinRoom.route(session)(userId, msg.roomId);
    //     session.set('roomId', msg.roomId);
    //     session.push('roomId', () => {
    //     });
    //     return result;
    // }
    async publish(msg, session) {
        let result = {
            topic: 'publish',
            payload: JSON.stringify({ code: 0, msg: 'publish message is ok.' })
        };
        return result;
    }
    async subscribe(msg, session) {
        let result = {
            topic: 'subscribe',
            payload: JSON.stringify({ code: 0, msg: 'subscribe message is ok.' })
        };
        return result;
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY29ubmVjdG9yL2hhbmRsZXIvZW50cnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkNBQWdEO0FBQ2hELDZEQUErRDtBQUkvRCxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRCxNQUFhLE9BQU87SUFFaEIsWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUNNLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBMEIsRUFBRSxPQUF3QjtRQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzdELE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7YUFDWixDQUFDO1NBQ0w7UUFDRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsT0FBTztnQkFDSCxJQUFJLEVBQUUsR0FBRzthQUNaLENBQUM7U0FDTDtRQUNELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7WUFDbkQsT0FBTztnQkFDSCxJQUFJLEVBQUUsR0FBRzthQUNaLENB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