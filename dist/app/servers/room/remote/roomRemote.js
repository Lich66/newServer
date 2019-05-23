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
    createRoom(configJson, sid) {
        return __awaiter(this, void 0, void 0, function* () {
            /*{"gameType":1,"playType":1,"deskType":1,"baseScore":1,"roundCount":1,
            "payType":1,"startType":1,"pushWager":1,"maxRobBanker":1,"doubleRule":1,
            "specialCardType":"00001001","advancedOptions":"00001001","lazarilloDeTormes":1,
            "roomId":3235622,"creatorId":502,"createTime":"2019/5/17  13:53:46",
            "roomConfig":[[1,1],[1,1,1,1,1,1,1,1,9,9,1]]}
            */
            console.log('进入roomRemote了');
            let channel = this.channelService.createChannel(configJson.roomId.toString());
            console.log('产生channel了');
            ;
            let room = new roomChannelService_1.RoomChannelService(channel);
            console.log('实例化room了');
            roomManager_1.RoomManager.roomList[room.roomId] = room;
            console.log('序列化房间: ' + JSON.stringify(room));
        });
    }
}
exports.RoomRemote = RoomRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbVJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL3Jvb20vcmVtb3RlL3Jvb21SZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHNHQUFtRztBQUVuRyxzRUFBbUU7QUFFbkUsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUZELDRCQUVDO0FBVUQsTUFBYSxVQUFVO0lBR25CLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVZLFVBQVUsQ0FBQyxVQUF1QixFQUFFLEdBQVc7O1lBQ3hEOzs7OztjQUtFO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDOUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUFBLENBQUM7WUFDM0IsSUFBSSxJQUFJLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hCLHlCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWxELENBQUM7S0FBQTtDQUVKO0FBekJELGdDQXlCQyJ9