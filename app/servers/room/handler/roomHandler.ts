import { Application, BackendSession } from 'pinus';
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
    private globalChannelStatus: GlobalChannelServiceStatus;
    public constructor(app: Application) {
        this.app = app;
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
        let game = new RoomGame(result.json, this);
        this.app.set(`${gameChannelKeyPrefix.roomGame}${result.json.roomId}`, game);
        let sid = this.app.getServerId();
        RoomManager.setRoomServerId(parseInt(result.json.roomId, 0), sid);
        return { code: 0, data: returnData };
    }

    /**
     * 获取房间所在服务器id
     * @param msg 房间id
     * @param session  session
     */
    public async getRoomServerId(msg: { roomId: number }, session: BackendSession) {
        // let serverId = this.app.getServerId();
        // const channel = this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.room}${msg.roomId}`);
        // let update = true;
        // for (const key in channel) {
        //     if (channel.hasOwnProperty(key)) {
        //         const element = channel[key];
        //         const ishas = element[`${gameChannelKeyPrefix.room}${msg.roomId}`].length > 0;
        //         if (ishas) {
        //             serverId = await RoomManager.getRoomServerId(msg.roomId);
        //             console.log('从redis获取的sid=>' + JSON.stringify(serverId));
        //             update = false;
        //         }
        //     }
        // }
        // if (update) {
        //     RoomManager.setRoomServerId(msg.roomId, serverId);
        // }
        let serverId = await RoomManager.getRoomServerId(msg.roomId);
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
     * 语音聊天
     * @param msg 语音内容,时长
     * @param session session
     */
    public async voiceChat(msg: { voiceMsg: string; time: number }, session: BackendSession) {
        console.log('大厅服务器收到语音聊天消息:' + JSON.stringify(msg));
        let userId: number = parseInt(session.uid, 0);
        let result = await RoomManager.isSittingUser(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onVoiceChat}`, { userId, time: msg.time, voiceMsg: msg.voiceMsg }, `${gameChannelKeyPrefix.room}${result.roomId}`);
        return { code: 0 };
    }

    /**
     * 表情聊天
     * @param msg 表情索引
     * @param session session
     */
    public async faceChat(msg: { faceNum: number }, session: BackendSession) {
        console.log('大厅服务器收到表情聊天消息:' + JSON.stringify(msg));
        let userId: number = parseInt(session.uid, 0);
        let result = await RoomManager.isSittingUser(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onFaceChat}`, { userId, faceNum: msg.faceNum }, `${gameChannelKeyPrefix.room}${result.roomId}`);
        return { code: 0 };
    }

    /**
     * 快捷语聊天
     * @param msg 快捷语索引
     * @param session session
     */
    public async wordChat(msg: { wordNum: number }, session: BackendSession) {
        console.log('大厅服务器收到快捷语聊天消息:' + JSON.stringify(msg));
        let userId: number = parseInt(session.uid, 0);
        let result = await RoomManager.isSittingUser(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onWordChat}`, { userId, wordNum: msg.wordNum }, `${gameChannelKeyPrefix.room}${result.roomId}`);
        return { code: 0 };
    }

    /**
     * 发送道具
     * @param msg 道具索引,接收者id
     * @param session session
     */
    public async stageProperty(msg: { stagePropertyNum: number; receiverId: number }, session: BackendSession) {
        console.log('大厅服务器收到发送道具消息:' + JSON.stringify(msg));
        let userId: number = parseInt(session.uid, 0);
        let result = await RoomManager.stageProperty(userId, msg.receiverId);
        if (!result.flag) {
            return { code: result.code };
        }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStageProperty}`, { senderId: userId, receiverId: msg.receiverId, stagePropertyNum: msg.stagePropertyNum }, `${gameChannelKeyPrefix.room}${result.roomId}`);
        return { code: 0 };
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
        console.log('离开房间== result ==' + JSON.stringify(result));
        let members = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.room}${result.roomId}`);
        console.log('离开房间== members ==: ' + JSON.stringify(members));
        for (const key in members) {
            if (members.hasOwnProperty(key)) {
                const element = members[key];
                console.log('element = ' + JSON.stringify(element));
                const ishas = element[`${gameChannelKeyPrefix.room}${result.roomId}`].includes(`${userId}`);
                console.log('ishas = ' + ishas);
                if (ishas) {
                    console.log('开始执行leave这个方法');
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
            let game = this.app.get(`${gameChannelKeyPrefix.roomGame}${result.roomId}`);
            game.stopExistenceTimer();
            this.app.set(`${gameChannelKeyPrefix.roomGame}${result.roomId}`, null);
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
        if (result.startFlag) {
            await RoomManager.setRoomState(parseInt(result.roomId, 0), 0);
            let game = this.app.get(`${gameChannelKeyPrefix.roomGame}${result.roomId}`);
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
        let sid = this.app.getServerId();
        console.log('开始游戏是在哪个房间服务器: ' + JSON.stringify(sid));
        console.log('=========>>> ' + JSON.stringify(result));
        let game = this.app.get(`${gameChannelKeyPrefix.roomGame}${result.roomId}`);
        game.start();
    }

}
