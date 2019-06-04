import { Application, BackendSession, SessionService } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { RoomManager } from '../../../controller/room/roomManager';
import { gameChannelKeyPrefix } from '../../../gameConfig/nameSpace';
import socketRouter from '../../../gameConfig/socketRouterConfig';
import { ICreateRoomRequest, IJoinRoomRequest } from '../../../interface/hall/hallInterface';
import { RoomGame } from '../../../util/roomGame';

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

    public getGlobalChannelServiceStatus(): GlobalChannelServiceStatus {
        return this.globalChannelStatus;
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
        let userData = result.userData;
        await this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onJoinRoom}`, { userData }, `${gameChannelKeyPrefix.room}${msg.roomId}`);
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
        return {
            code: 0,
            data: {
                userList: result.userList,
                onlookerList: result.onlookerList,
                roomConfig: result.roomConfig,
                creatorId: result.creatorId
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
        let result = await RoomManager.leaveRoom(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        let members = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.room}${result.roomId}`);
        // console.log('离开房间== members ==: ' + JSON.stringify(members));
        for (const key in members) {
            if (members.hasOwnProperty(key)) {
                const element = members[key];
                const ishas = element[`${gameChannelKeyPrefix.room}${result.roomId}`].includes(`${userId}`);
                if (!ishas) {
                    await this.globalChannelStatus.leave(`${userId}`, key, `${gameChannelKeyPrefix.room}${result.roomId}`);
                }
            }
        }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onLeaveRoom}`, { userId, userType: result.userType }, `${gameChannelKeyPrefix.room}${result.roomId}`);
        return { code: 0 };
    }

    /**
     * 解散房间
     * @param obj xx
     * @param session session
     */
    public async dissolveRoom(obj: any, session: BackendSession) {
        let userId: number = parseInt(session.uid, 0);
        let result = await RoomManager.dissolveRoom(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        // console.log('==================\n' + JSON.stringify(result));
        if (result.code === 0) {
            // todo ----- 解散房间成功不通知房主,但是没有作用,原因未知
            //     let members = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.room}${result.roomId}`);
            //     console.log('解散房间== members ==: ' + JSON.stringify(members));
            //     for (const key in members) {
            //         if (members.hasOwnProperty(key)) {
            //             const element = members[key];
            //             const ishas = element[`${gameChannelKeyPrefix.room}${result.roomId}`].includes(`${userId}`);
            //             if (!ishas) {
            //                 await this.globalChannelStatus.leave(`${userId}`, key, `${gameChannelKeyPrefix.room}${result.roomId}`);
            //             }
            //         }
            //     }
            //    let members1 = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.room}${result.roomId}`);
            //     console.log('解散房间== members1 ==: ' + JSON.stringify(members1));
            await this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onDestoryRoom}`, {}, `${gameChannelKeyPrefix.room}${result.roomId}`);
            await this.globalChannelStatus.destroyChannel(`${gameChannelKeyPrefix.room}${result.roomId}`);
        } else {
            await this.globalChannelStatus.pushMessageByUids(result.userList, `${socketRouter.onDestoryRoomRequest}`, { userData: result.userData });
        }
        return { code: 0 };
    }

    /**
     * 解散房间的选择
     * @param msg 同意与否
     * @param session session 
     */
    public async optionOfDestoryRoom(msg: { option: number }, session: BackendSession) {
        let userId: number = parseInt(session.uid, 0);
        let result = await RoomManager.optionOfDestoryRoom(userId);
        // todo  打算解散房间的操作放在game中
    }

    /**
     * 玩家准备
     * @param obj xx
     * @param session session
     */
    public async ready(obj: any, session: BackendSession) {
        let userId: number = parseInt(session.uid, 0);
        let result = await RoomManager.ready(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        await this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onReady}`, { userData: result.userData }, `${gameChannelKeyPrefix.room}${result.roomId}`);
        if (result.room) {
            // todo 开始游戏
            let game = new RoomGame(result.room, this);
            this.app.set(`${gameChannelKeyPrefix.roomGame}${result.roomId}`, game);
            game.start();
        }
        return { code: 0 };
    }

    /**
     * 开始游戏
     * @param obj xx
     * @param session session
     */
    public async start(obj: any, session: BackendSession) {
        let userId: number = parseInt(session.uid, 0);
        let result = await RoomManager.start(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        // todo 开始游戏
        let game = new RoomGame(result.room, this);
        this.app.set(`${gameChannelKeyPrefix.roomGame}${result.room.roomId}`, game);
        game.start();
    }

}
