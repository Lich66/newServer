import { Application, FrontendSession } from 'pinus';
import { redisClient } from '../../../db/redis';
import { IClubRequest } from '../../../interface/club/handler/clubInterface';
import { IClubRoomRequest } from '../../../interface/clubRoom/handler/clubRoomInterfaces';
import { IAccountInfoRequest, IAuthReturn, ITokenInfoRequest, IUserinfoRequest } from '../../../interface/user/remote/userInterface';
import { tbl_club } from '../../../models/tbl_club';
import { tbl_room } from '../../../models/tbl_room';
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
        await redisClient.set(`'user:'${user.userid}`, JSON.stringify(user));
        let xx = JSON.parse(await redisClient.getAsync(`'user:'${user.userid}`));
        console.log('=== xx === ' + typeof xx);
        console.log('=== xx === ' + JSON.stringify(xx));
        console.log('=== xx === ' + JSON.stringify(xx.userid));
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
    public async joinClub(msg: IClubRequest, session: FrontendSession): Promise<tbl_club> {
        let club = await this.app.rpc.club.clubRemote.joinClub.route(session)(session.uid, this.app.getServerId(), msg.clubid.toString(), true);
        return club;
    }

    public async joinClubRoom(msg: IClubRoomRequest, session: FrontendSession): Promise<tbl_room> {
        let club = await this.app.rpc.clubRoom.clubRoomRemote.joinClubRoom.route(session)(session.uid, this.app.getServerId(), msg.roomid.toString(), true);
        return club;
    }
}
