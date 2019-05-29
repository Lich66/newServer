import { Application, FrontendSession, SessionService } from 'pinus';
import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';
import { IAccountInfoRequest, IAuthReturn, ITokenInfoRequest, IUserinfoRequest, IUserResponse } from '../../../interface/user/userInterface';

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    private app: Application;
    public constructor(app: Application) {
        this.app = app;
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
                code: 501
            };
        }
        const sessionService: SessionService = this.app.get('sessionService');

        if (!!sessionService.getByUid(user.userid.toString())) {

            sessionService.akick(user.userid.toString(), 'Other people login');
        }
        await session.abind(user.userid.toString());
        session.set('usernick', user.usernick);
        session.apush('usernick');
        console.log(JSON.stringify(user));
        session.on('closed', this.onUserLeave);
        for (let key in user) {
            if (user.hasOwnProperty(key)) {
                console.log(`${redisKeyPrefix.user}${user.userid}`, key, user[key]);
                await redisClient.hsetAsync(`${redisKeyPrefix.user}${user.userid}`, key, `${user[key]}`);
            }
        }
        return {
            code: 0,
            data: user,
            msg: 'game server is ok.'
        };
    }
    public async accountLogin(userinfo: IAccountInfoRequest, session: FrontendSession): Promise<IAuthReturn> {
        const user = await this.app.rpc.user.userRemote.accountLogin.route(session)(userinfo);
        const sessionService = this.app.get('sessionService');
        if (!!sessionService.getByUid(user.userid.toString())) {
            console.log('已登录已登录已登录已登录已登录已登录已登录已登录已登录已登录已登录已登录已登录');
            sessionService.akick(user.userid.toString(), 'Other people login');
        }
        await session.abind(user.userid.toString());
        session.on('closed', this.onUserLeave);
        if (user) {
            return {
                code: 0,
                data: user
            };
        } else {
            return {
                code: 504
            };
        }
    }
    public async tokenLogin(userinfo: ITokenInfoRequest, session: FrontendSession): Promise<IAuthReturn> {
        // console.log(JSON.stringify(userinfo));
        const user = await this.app.rpc.user.userRemote.tokenLogin.route(session)(userinfo);
        const sessionService = this.app.get('sessionService');
        if (!!sessionService.getByUid(user.userid.toString())) {
            sessionService.akick(user.userid.toString(), 'Other people login');
        }
        await session.abind(user.userid.toString());
        session.on('closed', this.onUserLeave);
        if (user) {
            return {
                code: 0,
                data: user
            };
        } else {
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

    public async publish(msg: any, session: FrontendSession) {
        let result = {
            topic: 'publish',
            payload: JSON.stringify({ code: 0, msg: 'publish message is ok.' })
        };
        return result;
    }
    public async subscribe(msg: any, session: FrontendSession) {
        let result = {
            topic: 'subscribe',
            payload: JSON.stringify({ code: 0, msg: 'subscribe message is ok.' })
        };
        return result;
    }

    public async onUserLeave(session: FrontendSession) {
        if (!session || !session.uid) {
            return;
        }
        const sessionService = this.app.get('sessionService');
        sessionService.akick(session.uid, 'leave');
    }

}
