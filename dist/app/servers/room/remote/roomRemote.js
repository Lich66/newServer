"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    // public async createRoom(configJson: IRoomConfig) {
    //     console.log('进来了');
    //     let channel = this.channelService.createChannel(configJson.roomId.toString());
    //     let room = new RoomChannelService(channel, configJson);
    //     let roomList = this.app.get(appKeyPrefix.roomList);
    //     roomList[configJson.roomId] = room;
    //     console.log('查看房间是否挂上去了:' + JSON.stringify(Object.keys(this.app.get(appKeyPrefix.roomList))));
    // }
    async joinRoom(userId, roomId, sid) {
        console.log('joinRoom进来了');
        let result = await roomManager_1.RoomManager.joinRoom(userId, roomId, sid, this.app);
        console.log('====返回的加入房间信息' + JSON.stringify(result));
        return result;
        // let roomList = await this.app.get(appKeyPrefix.roomList);
        // console.log('roomRemote查看房间是否挂上去了:' + JSON.stringify(Object.keys(roomList)));
    }
}
exports.RoomRemote = RoomRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbVJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL3Jvb20vcmVtb3RlL3Jvb21SZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxzRUFBbUU7QUFJbkUsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUZELDRCQUVDO0FBVUQsTUFBYSxVQUFVO0lBR25CLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELHFEQUFxRDtJQUNyRCwwQkFBMEI7SUFDMUIscUZBQXFGO0lBQ3JGLDhEQUE4RDtJQUM5RCwwREFBMEQ7SUFDMUQsMENBQTBDO0lBQzFDLHFHQUFxRztJQUNyRyxJQUFJO0lBQ0csS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFjLEVBQUUsTUFBYyxFQUFFLEdBQVc7UUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixJQUFJLE1BQU0sR0FBRyxNQUFNLHlCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdEQsT0FBTyxNQUFNLENBQUM7UUFDZCw0REFBNEQ7UUFDNUQsZ0ZBQWdGO0lBQ3BGLENBQUM7Q0FDSjtBQXhCRCxnQ0F3QkMifQ==