import { Application, FrontendSession } from 'pinus';
import { RoomManager } from '../../../controller/room/roomManager';
import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/redisKeyPrefix';
import { IClubRequest } from '../../../interface/club/handler/clubInterface';
import { IClubRoomRequest } from '../../../interface/clubRoom/handler/clubRoomInterfaces';
import { ICreateRoomRequest, IJoinRoomRequest } from '../../../interface/hall/handler/hallInterfaces';
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

    public async joinClub(msg: IClubRequest, session: FrontendSession): Promise<tbl_club> {
        session.set('clubid', msg.clubid);
        session.push('clubid', () => {

        });
        let club = await this.app.rpc.club.clubRemote.joinClub.route(session)(session.uid, this.app.getServerId(), msg.clubid.toString(), true);
        return club;
    }

    public async leaveClub(msg: IClubRequest, session: FrontendSession): Promise<tbl_club> {
        session.set('roomid', null);
        session.push('roomid', () => {

        });
        session.set('clubid', null);
        session.push('clubid', () => {

        });
        let club = await this.app.rpc.club.clubRemote.joinClub.route(session)(session.uid, this.app.getServerId(), msg.clubid.toString(), true);
        return club;
    }

    public async joinClubRoom(msg: IClubRoomRequest, session: FrontendSession): Promise<tbl_room> {
        session.set('roomid', msg.roomid);
        session.push('roomid', () => {

        });
        const clubid = session.get('clubid');
        let club = await this.app.rpc.clubRoom.clubRoomRemote.joinClubRoom.route(session)(session.uid, this.app.getServerId(), clubid, msg.roomid.toString(), true);
        return club;
    }

    public async leaveClubRoom(msg: IClubRequest, session: FrontendSession): Promise<tbl_club> {
        session.set('roomid', null);
        session.push('roomid', () => {

        });
        let club = await this.app.rpc.club.clubRemote.joinClub.route(session)(session.uid, this.app.getServerId(), msg.clubid.toString(), true);
        return club;
    }
}
