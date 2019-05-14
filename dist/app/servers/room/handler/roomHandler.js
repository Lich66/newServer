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
const app_1 = require("../../../../app");
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
            let userid = parseInt(session.uid);
            let result = yield app_1.roomManager.createRoom(userid, msg.roomConfig);
            return result;
        });
    }
    joinRoom(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
            let userid = parseInt(session.uid);
            let result = yield app_1.roomManager.joinRoom(userid, msg.roomid);
            return result;
        });
    }
}
exports.RoomHandler = RoomHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9yb29tL2hhbmRsZXIvcm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLHlDQUE4QztBQUU5QyxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRkQsNEJBRUM7QUFDRDtJQUVJLFlBQVksR0FBZ0I7UUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUdLLFVBQVUsQ0FBQyxHQUF1QixFQUFFLE9BQXVCOztZQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0RCxJQUFJLE1BQU0sR0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLElBQUksTUFBTSxHQUFHLE1BQU0saUJBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRSxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFSyxRQUFRLENBQUMsR0FBcUIsRUFBRSxPQUF1Qjs7WUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEQsSUFBSSxNQUFNLEdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxJQUFJLE1BQU0sR0FBRyxNQUFNLGlCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUQsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0NBQ0o7QUFyQkQsa0NBcUJDIn0=