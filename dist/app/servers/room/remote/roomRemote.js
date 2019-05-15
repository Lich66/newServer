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
        this.roomManager = new roomManager_1.RoomManager(app.get('channelService'), this.app);
    }
    createRoom(userId, roomConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            // let room = await this.roomManager.createRoom(userId, roomConfig);
            // return { code: 200, data: { roomId: room.roomId } }
        });
    }
    joinRoom(userId, roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            // let session = this.app.get('sessionService').getByUid(userId);
            // console.log('remote中的session = ' + session);
            // let result = await this.roomManager.joinRoom(userId, roomId);
        });
    }
}
exports.RoomRemote = RoomRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbVJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL3Jvb20vcmVtb3RlL3Jvb21SZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHNFQUFtRTtBQUVuRSxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRkQsNEJBRUM7QUFVRDtJQUdJLFlBQVksR0FBZ0I7UUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkseUJBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFWSxVQUFVLENBQUMsTUFBYyxFQUFFLFVBQXNCOztZQUMxRCxvRUFBb0U7WUFDcEUsc0RBQXNEO1FBQzFELENBQUM7S0FBQTtJQUVZLFFBQVEsQ0FBQyxNQUFjLEVBQUUsTUFBYzs7WUFDaEQsaUVBQWlFO1lBQ2pFLCtDQUErQztZQUMvQyxnRUFBZ0U7UUFFcEUsQ0FBQztLQUFBO0NBQ0o7QUFuQkQsZ0NBbUJDIn0=