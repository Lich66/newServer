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
        session.apush('usernick');
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
        await session.abind(user.userid.toString());
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
        await session.abind(user.userid.toString());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY29ubmVjdG9yL2hhbmRsZXIvZW50cnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkNBQWdEO0FBQ2hELDZEQUErRDtBQUcvRCxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRCxNQUFhLE9BQU87SUFFaEIsWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUNNLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBMEIsRUFBRSxPQUF3QjtRQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzdELE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7YUFDWixDQUFDO1NBQ0w7UUFDRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsT0FBTztnQkFDSCxJQUFJLEVBQUUsR0FBRzthQUNaLENBQUM7U0FDTDtRQUNELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7WUFDbkQsT0FBTztnQkFDSCxJQUFJLEVBQUUsR0FBRzthQUNaLENB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