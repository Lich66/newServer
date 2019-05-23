"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roomChannelService_1 = require("../../../channelService/roomChannelService/roomChannelService");
const roomManager_1 = require("../../../controller/room/roomManager");
function default_1(app) {
    return new RoomRemote(app);
}
exports.default = default_1;
class RoomRemote {
    constructor(app) {
        this.app = app;
        this.channelService = app.get('channelService');
    }
    async createRoom(configJson, sid) {
        /*{"gameType":1,"playType":1,"deskType":1,"baseScore":1,"roundCount":1,
        "payType":1,"startType":1,"pushWager":1,"maxRobBanker":1,"doubleRule":1,
        "specialCardType":"00001001","advancedOptions":"00001001","lazarilloDeTormes":1,
        "roomId":3235622,"creatorId":502,"createTime":"2019/5/17  13:53:46",
        "roomConfig":[[1,1],[1,1,1,1,1,1,1,1,9,9,1]]}
        */
        console.log('进入roomRemote了');
        let channel = this.channelService.createChannel(configJson.roomId.toString());
        console.log('产生channel了');
        let room = new roomChannelService_1.RoomChannelService(channel);
        console.log('实例化room了');
        roomManager_1.RoomManager.roomList[room.roomId] = room;
        console.log('序列化房间: ' + JSON.stringify(room));
    }
}
exports.RoomRemote = RoomRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbVJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL3Jvb20vcmVtb3RlL3Jvb21SZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzR0FBbUc7QUFDbkcsc0VBQW1FO0FBR25FLG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFGRCw0QkFFQztBQVVELE1BQWEsVUFBVTtJQUduQixZQUFtQixHQUFnQjtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQXVCLEVBQUUsR0FBVztRQUN4RDs7Ozs7VUFLRTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLHlCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRWxELENBQUM7Q0FFSjtBQXpCRCxnQ0F5QkMifQ==