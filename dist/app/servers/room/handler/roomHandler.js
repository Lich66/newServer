"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
const roomManager_1 = require("../../../controller/room/roomManager");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const socketRouterConfig_1 = require("../../../gameConfig/socketRouterConfig");
function default_1(app) {
    return new RoomHandler(app);
}
exports.default = default_1;
class RoomHandler {
    constructor(app) {
        this.app = app;
        // this.channelService = app.get('channelService');
        // this.sessionServices = app.get('sessionService');
        this.globalChannelStatus = app.get(pinus_global_channel_status_1.GlobalChannelServiceStatus.PLUGIN_NAME);
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
                roomconfig: result.roomConfig,
                creatorId: result.creatorId
            }
        };
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
            // todo 开始游戏
        }
        return { code: 0 };
    }
}
exports.RoomHandler = RoomHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9yb29tL2hhbmRsZXIvcm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsc0VBQW1FO0FBQ25FLDZEQUFxRTtBQUNyRSwrRUFBa0U7QUFHbEUsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUZELDRCQUVDO0FBQ0QsTUFBYSxXQUFXO0lBS3BCLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsbURBQW1EO1FBQ25ELG9EQUFvRDtRQUNwRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyx3REFBMEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBdUIsRUFBRSxPQUF1QjtRQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwRCxJQUFJLE1BQU0sR0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7U0FDTDtRQUNELElBQUksTUFBTSxHQUFHLE1BQU0seUJBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNkLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2FBQ3BCLENBQUM7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