import { Application, FrontendSession } from 'pinus';
import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/redisKeyPrefix';
import { IAccountInfoRequest, IAuthReturn, ITokenInfoRequest, IUserinfoRequest } from '../../../interface/user/remote/userInterface';


export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    public constructor(private app: Application) {

    }
    public async auth(userinfo: IUserinfoRequest, session: FrontendSession): Promise<IAuthReturn> {

        if (!userinfo.token && !userinfo.wxopenid && !userinfo.xlopenid) {
            return {
                code: 400
            };
        }
        const user = await this.app.rpc.user.userRemote.auth.route(session)(userinfo);
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
        await session.abind(user.userid.toString());
        session.set('usernick', user.usernick);
        session.push('usernick', () => {

        });
        for (let key in user) {
            if (user.hasOwnProperty(key)) {
                await redisClient.hsetAsync(`${redisKeyPrefix.user}${user.userid}`, key, user[key]);
            }
        }

        return {
            code: 200,
            data: user,
            msg: 'game server is ok.'
        };
    }
    public async accountLogin(userinfo: IAccountInfoRequest, session: FrontendSession): Promise<IAuthReturn> {
        const user = await this.app.rpc.user.userRemote.accountLogin.route(session)(userinfo);
        if (user) {
            return {
                code: 200,
                data: user
            };
        } else {
            return {
                code: 500
            };
        }
    }
    public async tokenLogin(userinfo: ITokenInfoRequest, session: FrontendSession): Promise<IAuthReturn> {
        // console.log(JSON.stringify(userinfo));
        const user = await this.app.rpc.user.userRemote.tokenLogin.route(session)(userinfo);
        if (user) {
            return {
                code: 200,
                data: user
            };
        } else {
            return {
                code: 500
            };
        }

    }

    public async publish(msg: any, session: FrontendSession) {
        let result = {
            topic: 'publish',
            payload: JSON.stringify({ code: 200, msg: 'publish message is ok.' })
        };
        return result;
    }

    public async subscribe(msg: any, session: FrontendSession) {
        let result = {
            topic: 'subscribe',
            payload: JSON.stringify({ code: 200, msg: 'subscribe message is ok.' })
        };
        return result;
    }

}
