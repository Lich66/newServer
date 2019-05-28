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
        this.globalChannelStatus = app.get(pinus_global_channel_status_1.GlobalChannelServiceStatus.PLUGIN_NAME);
    }
    /**
     * 创建房间
     * @param msg 房间配置信息
     * @param session  xx
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
    async joinRoom(msg, session) {
        console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
        let userId = parseInt(session.uid, 0);
        let result = await roomManager_1.RoomManager.joinRoom(userId, msg.roomId);
        console.log('====返回的加入房间信息' + JSON.stringify(result));
        if (!result.flag) {
            return { code: result.code };
        }
        let members = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.room}${msg.roomId}`);
        console.log('加入房间== members ==: ' + JSON.stringify(members));
        for (const key in members) {
            if (members.hasOwnProperty(key)) {
                const element = members[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.room}${msg.roomId}`].includes(`${userId}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${userId}`, key, `${nameSpace_1.gameChannelKeyPrefix.room}${msg.roomId}`);
                }
            }
        }
        let userData = result.userData;
        session.set('roomId', msg.roomId);
        session.push('roomId', () => {
        });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onJoinRoom}`, { userData }, `${nameSpace_1.gameChannelKeyPrefix.room}${msg.roomId}`);
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
     * @param session   xx
     */
    async leaveRoom(obj, session) {
        // todo 先判断房间是否已开始游戏
        // let userId: number = parseInt(session.uid, 0);
        // let roomId: number = parseInt(session.get('roomId'), 0);
        // console.log('离开房间获取信息: ' + userId + ' : ' + roomId);
        // let channel = this.channelService.getChannel(`${roomId}`);
        // const user = channel.getMember(`${userId}`);
        // if (user) {
        //     channel.removeMember(`${userId}`);
        // }
        // channel.pushMessage('onLeaveRoom', { userId });
        // let roomList = this.app.get(appKeyPrefix.roomList);
        // let room = roomList[roomId];
        // // todo 删除离开房间玩家 
        // for (let i of room.onlookerList) {
        //     let index = 0;
        //     if (i.userId === userId) {
        //         room.onlookerList.splice(index, 1);
        //         break;
        //     }
        //     index++;
        // }
        // for (let i of room.userList) {
        //     let index = 0;
        //     if (i.userId === userId) {
        //         room.userList.splice(index, 1);
        //         break;
        //     }
        //     index++;
        // }
        // return { code: 0 };
    }
}
exports.RoomHandler = RoomHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9yb29tL2hhbmRsZXIvcm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsc0VBQW1FO0FBQ25FLDZEQUFxRTtBQUNyRSwrRUFBa0U7QUFHbEUsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUZELDRCQUVDO0FBQ0QsTUFBYSxXQUFXO0lBSXBCLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLHdEQUEwQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUF1QixFQUFFLE9BQXVCO1FBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxHQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztTQUNMO1FBQ0QsSUFBSSxNQUFNLEdBQUcsTUFBTSx5QkFBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2QsT0FBTztnQkFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7YUFDcEIsQ0FBQztTQUNMO1FBQ0QsSUFBSSxVQUFVLEdBQUc7WUFDYixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQzFCLHVDQUF1QztZQUN2Qyx3Q0FBd0M7WUFDeEMsd0NBQXdDO1lBQ3hDLG9DQUFvQztZQUNwQyxxQ0FBcUM7U0FDeEMsQ0FBQztRQUNGLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFxQixFQUFFLE9BQXVCO1FBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxHQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksTUFBTSxHQUFHLE1BQU0seUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDZCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNoQztRQUNELElBQUksT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxHQUFHLGdDQUFvQixDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvSCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM3RCxLQUFLLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRTtZQUN2QixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQ3pGLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLGdDQUFvQixDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDL0Y7YUFDSjtTQUNKO1FBQ0QsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxHQUFHLDRCQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLGdDQUFvQixDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN4SixPQUFPO1lBQ0gsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUU7Z0JBQ0YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO2dCQUN6QixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7Z0JBQ2pDLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTthQUNoQztTQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBUSxFQUFFLE9BQXVCO1FBQ3BELG9CQUFvQjtRQUNwQixpREFBaUQ7UUFDakQsMkRBQTJEO1FBQzNELHVEQUF1RDtRQUN2RCw2REFBNkQ7UUFDN0QsK0NBQStDO1FBQy9DLGNBQWM7UUFDZCx5Q0FBeUM7UUFDekMsSUFBSTtRQUNKLGtEQUFrRDtRQUNsRCxzREFBc0Q7UUFDdEQsK0JBQStCO1FBQy9CLG9CQUFvQjtRQUNwQixxQ0FBcUM7UUFDckMscUJBQXFCO1FBQ3JCLGlDQUFpQztRQUNqQyw4Q0FBOEM7UUFDOUMsaUJBQWlCO1FBQ2pCLFFBQVE7UUFDUixlQUFlO1FBQ2YsSUFBSTtRQUNKLGlDQUFpQztRQUNqQyxxQkFBcUI7UUFDckIsaUNBQWlDO1FBQ2pDLDBDQUEwQztRQUMxQyxpQkFBaUI7UUFDakIsUUFBUTtRQUNSLGVBQWU7UUFDZixJQUFJO1FBQ0osc0JBQXNCO0lBQzFCLENBQUM7Q0FHSjtBQWpIRCxrQ0FpSEMifQ==