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
// import { roomManager } from '../../../../app';
function default_1(app) {
    return new RoomHandler(app);
}
exports.default = default_1;
class RoomHandler {
    constructor(app) {
        this.app = app;
    }
    createRoom(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
            // console.log('=======================:' + session.uid);
            // let userid: number = parseInt(session.uid);
            // let result = await roomManager.createRoom(userid, msg.roomConfig);
            // return result;
            return null;
        });
    }
    joinRoom(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
            // let userid: number = parseInt(session.uid);
            // let result = await roomManager.joinRoom(userid, msg.roomid);
            // return result;
            return null;
        });
    }
}
exports.RoomHandler = RoomHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9yb29tL2hhbmRsZXIvcm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLGlEQUFpRDtBQUVqRCxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRkQsNEJBRUM7QUFDRDtJQUVJLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFHWSxVQUFVLENBQUMsR0FBdUIsRUFBRSxPQUF1Qjs7WUFDcEUsdURBQXVEO1lBQ3ZELHlEQUF5RDtZQUN6RCw4Q0FBOEM7WUFDOUMscUVBQXFFO1lBQ3JFLGlCQUFpQjtZQUNqQixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsR0FBcUIsRUFBRSxPQUF1Qjs7WUFDaEUsdURBQXVEO1lBQ3ZELDhDQUE4QztZQUM5QywrREFBK0Q7WUFDL0QsaUJBQWlCO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUVKO0FBeEJELGtDQXdCQyJ9