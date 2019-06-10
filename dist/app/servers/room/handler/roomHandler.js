"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
const roomManager_1 = require("../../../controller/room/roomManager");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const socketRouterConfig_1 = require("../../../gameConfig/socketRouterConfig");
const roomGame_1 = require("../../../util/roomGame");
function default_1(app) {
    return new RoomHandler(app);
}
exports.default = default_1;
class RoomHandler {
    constructor(app) {
        this.app = app;
        this.globalChannelStatus = app.get(pinus_global_channel_status_1.GlobalChannelServiceStatus.PLUGIN_NAME);
    }
    getGlobalChannelServiceStatus() {
        return this.globalChannelStatus;
    }
    /**
     * 创建房间
     * @param msg 房间配置信息
     * @param session  session
     */
    async createRoom(msg, session) {
        console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
        let userid = parseInt(session.uid, 0);
        if (!userid) {
            return {
                code: 10004
            };
        }
        let result = await roomManager_1.RoomManager.createRoom(userid, msg.roomConfig);
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
        let game = new roomGame_1.RoomGame(result.json, this);
        this.app.set(`${nameSpace_1.gameChannelKeyPrefix.roomGame}${result.json.roomId}`, game);
        let sid = this.app.getServerId();
        roomManager_1.RoomManager.setRoomServerId(parseInt(result.json.roomId, 0), sid);
        return { code: 0, data: returnData };
    }
    /**
     * 获取房间所在服务器id
     * @param msg 房间id
     * @param session  session
     */
    async getRoomServerId(msg, session) {
        let serverId = this.app.getServerId();
        const channel = this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.room}${msg.roomId}`);
        let update = true;
        for (const key in channel) {
            if (channel.hasOwnProperty(key)) {
                const element = channel[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.room}${msg.roomId}`].length > 0;
                if (ishas) {
                    serverId = await roomManager_1.RoomManager.getRoomServerId(msg.roomId);
                    console.log('从redis获取的sid=>' + JSON.stringify(serverId));
                    update = false;
                }
            }
        }
        if (update) {
            roomManager_1.RoomManager.setRoomServerId(msg.roomId, serverId);
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
    async joinRoom(msg, session) {
        console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
        let userId = parseInt(session.uid, 0);
        let result = await roomManager_1.RoomManager.joinRoom(userId, msg.roomId);
        console.log('====返回的加入房间信息' + JSON.stringify(result));
        if (!result.flag) {
            return { code: result.code };
        }
        let userData = result.userData;
        await this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onJoinRoom}`, { userData }, `${nameSpace_1.gameChannelKeyPrefix.room}${msg.roomId}`);
        let members = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.room}${msg.roomId}`);
        console.log('加入房间== members ==: ' + JSON.stringify(members));
        for (const key in members) {
            if (members.hasOwnProperty(key)) {
                const element = members[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.room}${msg.roomId}`].includes(`${userId}`);
                if (!ishas) {
                    await this.globalChannelStatus.add(`${userId}`, key, `${nameSpace_1.gameChannelKeyPrefix.room}${msg.roomId}`);
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
    async voiceChat(msg, session) {
        console.log('大厅服务器收到语音聊天消息:' + JSON.stringify(msg));
        let userId = parseInt(session.uid, 0);
        let result = await roomManager_1.RoomManager.isSittingUser(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onVoiceChat}`, { userId, time: msg.time, voiceMsg: msg.voiceMsg }, `${nameSpace_1.gameChannelKeyPrefix.room}${result.roomId}`);
        return { code: 0 };
    }
    /**
     * 表情聊天
     * @param msg 表情索引
     * @param session session
     */
    async faceChat(msg, session) {
        console.log('大厅服务器收到表情聊天消息:' + JSON.stringify(msg));
        let userId = parseInt(session.uid, 0);
        let result = await roomManager_1.RoomManager.isSittingUser(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onFaceChat}`, { userId, faceNum: msg.faceNum }, `${nameSpace_1.gameChannelKeyPrefix.room}${result.roomId}`);
        return { code: 0 };
    }
    /**
     * 快捷语聊天
     * @param msg 快捷语索引
     * @param session session
     */
    async wordChat(msg, session) {
        console.log('大厅服务器收到快捷语聊天消息:' + JSON.stringify(msg));
        let userId = parseInt(session.uid, 0);
        let result = await roomManager_1.RoomManager.isSittingUser(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onWordChat}`, { userId, wordNum: msg.wordNum }, `${nameSpace_1.gameChannelKeyPrefix.room}${result.roomId}`);
        return { code: 0 };
    }
    /**
     * 发送道具
     * @param msg 道具索引,接收者id
     * @param session session
     */
    async stageProperty(msg, session) {
        console.log('大厅服务器收到发送道具消息:' + JSON.stringify(msg));
        let userId = parseInt(session.uid, 0);
        let result = await roomManager_1.RoomManager.stageProperty(userId, msg.receiverId);
        if (!result.flag) {
            return { code: result.code };
        }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStageProperty}`, { senderId: userId, receiverId: msg.receiverId, stagePropertyNum: msg.stagePropertyNum }, `${nameSpace_1.gameChannelKeyPrefix.room}${result.roomId}`);
        return { code: 0 };
    }
    /**
     * 离开房间
     * @param obj  xx
     * @param session   session
     */
    async leaveRoom(obj, session) {
        let userId = parseInt(session.uid, 0);
        let result = await roomManager_1.RoomManager.leaveRoom(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        let members = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.room}${result.roomId}`);
        // console.log('离开房间== members ==: ' + JSON.stringify(members));
        for (const key in members) {
            if (members.hasOwnProperty(key)) {
                const element = members[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.room}${result.roomId}`].includes(`${userId}`);
                if (!ishas) {
                    await this.globalChannelStatus.leave(`${userId}`, key, `${nameSpace_1.gameChannelKeyPrefix.room}${result.roomId}`);
                }
            }
        }
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onLeaveRoom}`, { userId, userType: result.userType }, `${nameSpace_1.gameChannelKeyPrefix.room}${result.roomId}`);
        return { code: 0 };
    }
    /**
     * 解散房间
     * @param obj xx
     * @param session session
     */
    async dissolveRoom(obj, session) {
        let userId = parseInt(session.uid, 0);
        let result = await roomManager_1.RoomManager.dissolveRoom(userId);
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
            let game = this.app.get(`${nameSpace_1.gameChannelKeyPrefix.roomGame}${result.roomId}`);
            game.stopTimer();
            await this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onDestoryRoom}`, {}, `${nameSpace_1.gameChannelKeyPrefix.room}${result.roomId}`);
            await this.globalChannelStatus.destroyChannel(`${nameSpace_1.gameChannelKeyPrefix.room}${result.roomId}`);
        }
        else {
            await this.globalChannelStatus.pushMessageByUids(result.userList, `${socketRouterConfig_1.default.onDestoryRoomRequest}`, { userData: result.userData });
        }
        return { code: 0 };
    }
    /**
     * 解散房间的选择
     * @param msg 同意与否
     * @param session session
     */
    async optionOfDestoryRoom(msg, session) {
        let userId = parseInt(session.uid, 0);
        let result = await roomManager_1.RoomManager.optionOfDestoryRoom(userId);
        // todo  打算解散房间的操作放在game中
    }
    /**
     * 玩家准备
     * @param obj xx
     * @param session session
     */
    async ready(obj, session) {
        let userId = parseInt(session.uid, 0);
        let result = await roomManager_1.RoomManager.ready(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        await this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onReady}`, { userData: result.userData }, `${nameSpace_1.gameChannelKeyPrefix.room}${result.roomId}`);
        if (result.startFlag) {
            await roomManager_1.RoomManager.setRoomState(parseInt(result.roomId, 0), 0);
            let game = this.app.get(`${nameSpace_1.gameChannelKeyPrefix.roomGame}${result.roomId}`);
            game.start();
        }
        return { code: 0 };
    }
    /**
     * 开始游戏
     * @param obj xx
     * @param session session
     */
    async start(obj, session) {
        let userId = parseInt(session.uid, 0);
        let result = await roomManager_1.RoomManager.start(userId);
        if (!result.flag) {
            return { code: result.code };
        }
        console.log('=========>>> ' + JSON.stringify(result));
        let game = this.app.get(`${nameSpace_1.gameChannelKeyPrefix.roomGame}${result.roomId}`);
        game.start();
    }
}
exports.RoomHandler = RoomHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9yb29tL2hhbmRsZXIvcm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsc0VBQW1FO0FBQ25FLDZEQUFxRTtBQUNyRSwrRUFBa0U7QUFFbEUscURBQWtEO0FBRWxELG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFGRCw0QkFFQztBQUNELE1BQWEsV0FBVztJQUdwQixZQUFtQixHQUFnQjtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLHdEQUEwQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFTSw2QkFBNkI7UUFDaEMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQXVCLEVBQUUsT0FBdUI7UUFDcEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxNQUFNLEdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7UUFDRCxJQUFJLE1BQU0sR0FBRyxNQUFNLHlCQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDZCxPQUFP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