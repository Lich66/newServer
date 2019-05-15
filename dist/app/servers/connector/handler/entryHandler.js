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
            // await redisClient.set(`'user:'${user.userid}`, JSON.stringify(user));
            for (let key in user) {
                if (user.hasOwnProperty(key)) {
                    yield redis_1.redisClient.hsetAsync(`user:${user.userid}`, key, user[key]);
                }
            }
            let xx = yield redis_1.redisClient.hgetallAsync(`user:${user.userid}`);
            console.log('========' + JSON.stringify(xx));
            console.log('--------' + xx.userid);
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
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY29ubmVjdG9yL2hhbmRsZXIvZW50cnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSw2Q0FBZ0Q7QUFJaEQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELDRCQUVDO0FBRUQ7SUFDSSxZQUEyQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0lBRTNDLENBQUM7SUFDWSxJQUFJLENBQUMsUUFBMEIsRUFBRSxPQUF3Qjs7WUFFbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDN0QsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztpQkFDWixDQUFDO2FBQ0w7WUFDRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7aUJBQ1osQ0FBQzthQUNMO1lBQ0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUV0RCxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtnQkFDbkQsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztpQkFDWixDQUFDO2FBQ0w7WUFDRCxNQUFNLE9BQU8sQ0FBQyxL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