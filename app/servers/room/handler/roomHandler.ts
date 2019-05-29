import { Application, BackendSession, SessionService } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { RoomManager } from '../../../controller/room/roomManager';
import { gameChannelKeyPrefix } from '../../../gameConfig/nameSpace';
import socketRouter from '../../../gameConfig/socketRouterConfig';
import { ICreateRoomRequest, IJoinRoomRequest } from '../../../interface/hall/hallInterface';

export default function (app: Application) {
    return new RoomHandler(app);
}
export class RoomHandler {
    private app: Application;
    // private sessionService: SessionService;
    // private channelService: ChannelService;
    private globalChannelStatus: GlobalChannelServiceStatus;
    public constructor(app: Application) {
        this.app = app;
        // this.channelService = app.get('channelService');
        // this.sessionServices = app.get('sessionService');
        this.globalChannelStatus = app.get(GlobalChannelServiceStatus.PLUGIN_NAME);
    }

    /**
     * 创建房间
     * @param msg 房间配置信息
     * @param session  session
     */
    public async createRoom(msg: ICreateRoomRequest, session: BackendSession) {
        console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
        let userid: number = parseInt(session.uid, 0);
        if (!userid) {
            return {
                code: 10004
            };
        }
        let result = await RoomManager.createRoom(userid, msg.roomConfig);
        if (!result.flag) {
            return {
                code: result.code
            };
        }
        let returnData = {
            roomId: result.json.roomId
            // playType: result.json.roomConfig[0],
            // playerNum: result.json.roomConfig[1],
            // basePoint: result.json.roomConfig[2],
            // round: result.json.roomConfig[3],
            // payType: result.json.roomConfig[4]
        };
        return { code: 0, data: returnData };
    }

    /**
     * 获取房间所在服务器id
     * @param msg 房间id
     * @param session  session
     */
    public async getRoomServerId(msg: { roomId: number }, session: BackendSession) {
        let serverId = this.app.getServerId();
        const channel = this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.room}${msg.roomId}`);
        let update = true;
        for (const key in channel) {
            if (channel.hasOwnProperty(key)) {
                const element = channel[key];
                const ishas = element[`${gameChannelKeyPrefix.room}${msg.roomId}`].length > 0;
                if (ishas) {
                    serverId = await RoomManager.getRoomServerId(msg.roomId);
                    console.log('从redis获取的sid=>' + JSON.stringify(serverId));
                    update = false;
                }
            }
        }
        if (update) {
            RoomManager.setRoomServerId(msg.roomId, serverId);
        }
        return {
            code: 0,
            data: { sid: serverId }
        };
    }

    /**
     * 加入房间
     * @param msg roomId+sid
     * @param session session
     */
    public async joinRoom(msg: IJoinRoomRequest, session: BackendSession) {
        console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
        let userId: number = parseInt(session.uid, 0);
        let result = await RoomManager.joinRoom(userId, msg.roomId);
        console.log('====返回的加入房间信息' + JSON.stringify(result));
        if (!result.flag) {
            return { code: result.code };
        }
        let members = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.room}${msg.roomId}`);
        console.log('加入房间== members ==: ' + JSON.stringify(members));
        for (const key in members) {
            if (members.hasOwnProperty(key)) {
                const element = members[key];
                const ishas = element[`${gameChannelKeyPrefix.room}${msg.roomId}`].includes(`${userId}`);
                if (!ishas) {
                    await this.globalChannelStatus.add(`${userId}`, key, `${gameChannelKeyPrefix.room}${msg.roomId}`);
                }
            }
        }
        let userData = result.userData;
        session.set('roomId', msg.roomId);
        session.push('roomId', () => { });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onJoinRoom}`, { userData }, `${gameChannelKeyPrefix.room}${msg.roomId}`);
        return {
            code: 0,
            data: {
                userList: result.userList,
                onlookerList: result.onlookerList,
                roomconfig: result.roomConfig
            }
        };
    }

    /**
     * 离开房间
     * @param obj  xx
     * @param session   session 
     */
    public async leaveRoom(obj: any, session: BackendSession) {
        let userId: number = parseInt(session.uid, 0);
        let roomId: number = parseInt(session.get('roomId'), 0);
        console.log('离开房间获取信息: ' + userId + ' : ' + roomId);
        let result = await RoomManager.leaveRoom(userId, roomId);
        if (!result.flag) {
            return { code: result.code };
        }
        session.set('roomId', null);
        session.push('roomId', () => { });
        let members = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.room}${roomId}`);
        console.log('离开房间== members ==: ' + JSON.stringify(members));
        for (const key in members) {
            if (members.hasOwnProperty(key)) {
                const element = members[key];
                const ishas = element[`${gameChannelKeyPrefix.room}${roomId}`].includes(`${userId}`);
                if (!ishas) {
                    await this.globalChannelStatus.leave(`${userId}`, key, `${gameChannelKeyPrefix.room}${roomId}`);
                }
            }
        }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onLeaveRoom}`, { userId, userType: result.userType }, `${gameChannelKeyPrefix.room}${roomId}`);
        return { code: 0 };
    }

    /**
     * 解散房间
     * @param obj xx
     * @param session session
     */
    public async dissolveRoom(obj: any, session: BackendSession) {
        let userId: number = parseInt(session.uid, 0);
        let roomId: number = parseInt(session.get('roomId'), 0);
        console.log('解散房间获取信息: ' + userId + ' : ' + roomId);
        let result = await RoomManager.dissolveRoom(userId, roomId);
        if (!result.flag) {
            return { code: result.code };
        }
        // todo 清空玩家session中的roomId,暂时不能实现
        // let sessionService = this.app.get('sessionService');
        // for (const iterator of result.players.onlookerList) {
        //     console.log('------------------------' + JSON.stringify(iterator));
        //     let s = sessionService.getByUid(iterator);
        //     console.log('+++++++++++++++++++++++++' + JSON.stringify(s));
        //     s[0].set('roomId', null);
        // }
        // for (const iterator of result.players.userList) {
        //     let s = sessionService.getByUid(iterator);
        //     s[0].set('roomId', null);
        // }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onDestoryRoom}`, { code: result.code }, `${gameChannelKeyPrefix.room}${roomId}`);
        return { code: 0 };
    }

}
