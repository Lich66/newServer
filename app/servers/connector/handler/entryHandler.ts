import { Application, FrontendSession } from 'pinus';
import { RoomManager } from '../../../controller/room/roomManager';
import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/redisKeyPrefix';
import { ICreateRoomRequest, IJoinRoomRequest } from '../../../interface/hall/handler/hallInterfaces';
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

    // ---------------------------------------------------------------------
    // ------------------------------ 野生房间 ------------------------------    
    // ---------------------------------------------------------------------
    public async createRoom(msg: ICreateRoomRequest, session: FrontendSession) {
        console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
        let userid: number = parseInt(session.uid, 0);
        let result = await RoomManager.createRoom(userid, msg.roomConfig);
        return result;
    }

    public async joinRoom(msg: IJoinRoomRequest, session: FrontendSession) {
        // console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
        // let userid: number = parseInt(session.uid);
        // let result = await roomManager.joinRoom(userid, msg.roomid);
        // return result;
        return null;
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
