import { Application, FrontendSession } from 'pinus';
import { RoomManager } from '../../../controller/room/roomManager';
import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/redisKeyPrefix';
import { IClubRequest, IClubReturn } from '../../../interface/club/handler/clubInterface';
import { IClubRoomRequest, IClubRoomReturn } from '../../../interface/clubRoom/handler/clubRoomInterfaces';
import { IUserReturn } from '../../../interface/connector/handler/connectorInterface';
import { ICreateRoomRequest, IJoinRoomRequest } from '../../../interface/hall/handler/hallInterfaces';
import { IAccountInfoRequest, IAuthReturn, ITokenInfoRequest, IUserinfoRequest, IUserResponse } from '../../../interface/user/remote/userInterface';

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
                console.log(`${redisKeyPrefix.user}${user.userid}`, key, user[key]);
                await redisClient.hsetAsync(`${redisKeyPrefix.user}${user.userid}`, key, `${user[key]}`);
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
        if (!result.flag) {
            return {
                code: result.code,
                msg: result.msg
            };
        }
        await this.app.rpc.room.roomRemote.createRoom.route(session)(result.roomId);
        return { code: 200, roomid: result.roomId };
    }

    public async joinRoom(msg: IJoinRoomRequest, session: FrontendSession) {
        console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
        let userId: number = parseInt(session.uid, 0);
        let result = await RoomManager.joinRoom(userId, msg.roomId);
        if (!result.flag) {
            return {
                code: result.code,
                msg: result.msg
            };
        }
        return {
            code: result.code,
            roomConfig: result.roomConfig,
            userList: result.userList,
            onlookerList: result.onlookerList
        };
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

    public async joinClub(msg: IClubRequest, session: FrontendSession): Promise<IClubReturn> {
        session.set('clubid', msg.clubid);
        session.push('clubid', () => {

        });
        const sid = this.app.getServerId();
        // session.uid, this.app.getServerId(), msg.clubid.toString(), true
        let club = await this.app.rpc.club.clubRemote.joinClub.route(session)({ uid: Number.parseInt(session.uid, 0), sid, clubid: msg.clubid, flag: true });
        if (club) {
            return {
                code: 200,
                data: club
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async leaveClub(msg: IClubRequest, session: FrontendSession): Promise<IUserReturn> {

        const sid = this.app.getServerId();
        const clubid = session.get('clubid');
        let club = await this.app.rpc.club.clubRemote.leaveClub.route(session)({ uid: Number.parseInt(session.uid, 0), sid, clubid, flag: false });
        if (club) {
            session.set('roomid', null);
            session.push('roomid', () => {

            });
            session.set('clubid', null);
            session.push('clubid', () => {

            });
            return {
                code: 200,
                data: club
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async joinClubRoom(msg: IClubRoomRequest, session: FrontendSession): Promise<IClubRoomReturn> {
        session.set('roomid', msg.roomid);
        session.push('roomid', () => {

        });
        const clubid = session.get('clubid');
        const sid = this.app.getServerId();
        let clubRoom = await this.app.rpc.clubRoom.clubRoomRemote.joinClubRoom.route(session)({ uid: Number.parseInt(session.uid, 0), sid, clubid, roomid: msg.roomid, flag: true });
        if (clubRoom) {
            return {
                code: 200,
                data: clubRoom
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async leaveClubRoom(msg: IClubRoomRequest, session: FrontendSession): Promise<IUserReturn> {
        const clubid = session.get('clubid');
        const roomid = session.get('roomid');
        const sid = this.app.getServerId();
        let clubRoom = await this.app.rpc.clubRoom.clubRoomRemote.leaveClubRoom.route(session)({ uid: Number.parseInt(session.uid, 0), sid, clubid, roomid, flag: false });
        if (clubRoom) {
            session.set('roomid', null);
            session.push('roomid', () => {

            });
            return {
                code: 200,
                data: { ...clubRoom, clubid }
            };
        } else {
            return {
                code: 500
            };
        }
    }
}
