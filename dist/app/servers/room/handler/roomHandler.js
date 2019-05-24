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
    async leaveRoom(session) {
        let userId = parseInt(session.uid, 0);
        let roomId = session.get('roomId');
        console.log('离开房间获取信息: ' + userId + ' : ' + roomId);
        let channel = this.channelService.getChannel(`${roomId}`);
        const user = channel.getMember(`${userId}`);
        if (user) {
            channel.removeMember(`${userId}`);
        }
        channel.pushMessage('onLeaveRoom', userId);
        let roomList = this.app.get(nameSpace_1.appKeyPrefix.roomList);
        let room = roomList[roomId];
        // todo 删除离开房间玩家 
        for (let i of room.onlookerList) {
        }
    }
}
exports.RoomHandler = RoomHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9yb29tL2hhbmRsZXIvcm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzR0FBbUc7QUFDbkcsc0VBQW1FO0FBQ25FLDZEQUE2RDtBQUc3RCxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRkQsNEJBRUM7QUFDRCxNQUFhLFdBQVc7SUFHcEIsWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUF1QixFQUFFLE9BQXVCO1FBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxHQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksTUFBTSxHQUFHLE1BQU0seUJBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2QsT0FBTztnQkFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7YUFDcEIsQ0FBQztTQUNMO1FBQ0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRSxJQUFJLElBQUksR0FBRyxJQUFJLHVDQUFrQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsd0JBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsd0JBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFTSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQXVCO1FBQzFDLElBQUksTUFBTSxHQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksTUFBTSxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQztRQUNwRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDMUQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDNUMsSUFBSSxJQUFJLEVBQUU7WUFDTixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNyQztRQUNELE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLHdCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLGlCQUFpQjtRQUNqQixLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7U0FDaEM7SUFDTCxDQUFDO0NBQ0o7QUF6Q0Qsa0NBeUNDIn0=