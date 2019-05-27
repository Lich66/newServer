"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roomChannelService_1 = require("../../../channelService/roomChannelService/roomChannelService");
const roomManager_1 = require("../../../controller/room/roomManager");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
function default_1(app) {
    return new RoomHandler(app);
}
exports.default = default_1;
class RoomHandler {
    constructor(app) {
        this.app = app;
        this.channelService = app.get('channelService');
    }
    async createRoom(msg, session) {
        console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
        let userid = parseInt(session.uid, 0);
        if (!userid) {
            return {
                code: 10004
            };
        }
        let result = await roomManager_1.RoomManager.createRoom(userid, msg.roomConfig, this.app);
        if (!result.flag) {
            return {
                code: result.code
            };
        }
        let channel = this.channelService.createChannel(result.json.roomId.toString());
        let room = new roomChannelService_1.RoomChannelService(channel, result.json);
        let roomList = this.app.get(nameSpace_1.appKeyPrefix.roomList);
        roomList[result.json.roomId] = room;
        console.log('roomHandler查看房间是否挂上去了:' + JSON.stringify(Object.keys(this.app.get(nameSpace_1.appKeyPrefix.roomList))));
        return { code: 0, roomid: result.roomId };
    }
    async leaveRoom(obj, session) {
        // todo 先判断房间是否已开始游戏
        let userId = parseInt(session.uid, 0);
        let roomId = parseInt(session.get('roomId'), 0);
        console.log('离开房间获取信息: ' + userId + ' : ' + roomId);
        let channel = this.channelService.getChannel(`${roomId}`);
        const user = channel.getMember(`${userId}`);
        if (user) {
            channel.removeMember(`${userId}`);
        }
        channel.pushMessage('onLeaveRoom', { userId });
        let roomList = this.app.get(nameSpace_1.appKeyPrefix.roomList);
        let room = roomList[roomId];
        // todo 删除离开房间玩家 
        for (let i of room.onlookerList) {
            let index = 0;
            if (i.userId === userId) {
                room.onlookerList.splice(index, 1);
                break;
            }
            index++;
        }
        for (let i of room.userList) {
            let index = 0;
            if (i.userId === userId) {
                room.userList.splice(index, 1);
                break;
            }
            index++;
        }
        return { code: 0 };
    }
}
exports.RoomHandler = RoomHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9yb29tL2hhbmRsZXIvcm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxzR0FBbUc7QUFDbkcsc0VBQW1FO0FBQ25FLDZEQUE2RDtBQUc3RCxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRkQsNEJBRUM7QUFDRCxNQUFhLFdBQVc7SUFHcEIsWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUF1QixFQUFFLE9BQXVCO1FBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxHQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztTQUNMO1FBQ0QsSUFBSSxNQUFNLEdBQUcsTUFBTSx5QkFBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDZCxPQUFPO2dCQUNILElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTthQUNwQixDQUFDO1NBQ0w7UUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFD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