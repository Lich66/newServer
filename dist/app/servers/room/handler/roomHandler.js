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
            console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
            console.log('=======================:' + session.uid);
            let userid = parseInt(session.uid, 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9yb29tL2hhbmRsZXIvcm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFGRCw0QkFFQztBQUNEO0lBRUksWUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUdZLFVBQVUsQ0FBQyxHQUF1QixFQUFFLE9BQXVCOztZQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0RCxJQUFJLE1BQU0sR0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QyxxRUFBcUU7WUFDckUsaUJBQWlCO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVZLFFBQVEsQ0FBQyxHQUFxQixFQUFFLE9BQXVCOztZQUNoRSx1REFBdUQ7WUFDdkQsOENBQThDO1lBQzlDLCtEQUErRDtZQUMvRCxpQkFBaUI7WUFDakIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0o7QUF2QkQsa0NBdUJDIn0=