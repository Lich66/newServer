"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    joinRoom(userId, roomId, sid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('joinRoom进来了');
            let result = yield roomManager_1.RoomManager.joinRoom(userId, roomId, sid, this.app);
            console.log('====返回的加入房间信息' + JSON.stringify(result));
            return result;
            // let roomList = await this.app.get(appKeyPrefix.roomList);
            // console.log('roomRemote查看房间是否挂上去了:' + JSON.stringify(Object.keys(roomList)));
        });
    }
}
exports.RoomRemote = RoomRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbVJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL3Jvb20vcmVtb3RlL3Jvb21SZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLHNFQUFtRTtBQUluRSxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRkQsNEJBRUM7QUFVRCxNQUFhLFVBQVU7SUFHbkIsWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQscURBQXFEO0lBQ3JELDBCQUEwQjtJQUMxQixxRkFBcUY7SUFDckYsOERBQThEO0lBQzlELDBEQUEwRDtJQUMxRCwwQ0FBMEM7SUFDMUMscUdBQXFHO0lBQ3JHLElBQUk7SUFDUyxRQUFRLENBQUMsTUFBYyxFQUFFLE1BQWMsRUFBRSxHQUFXOztZQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNCLElBQUksTUFBTSxHQUFHLE1BQU0seUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0RCxPQUFPLE1BQU0sQ0FBQztZQUNkLDREQUE0RDtZQUM1RCxnRkFBZ0Y7UUFDcEYsQ0FBQztLQUFBO0NBQ0o7QUF4QkQsZ0NBd0JDIn0=