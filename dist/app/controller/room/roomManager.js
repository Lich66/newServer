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
const redis_1 = require("../../db/redis");
const redisKeyPrefix_1 = require("../../gameConfig/redisKeyPrefix");
const room_1 = require("../../gameConfig/room");
const gameUitl_1 = require("../../util/gameUitl");
const user_1 = require("../user/user");
class RoomManager {
    static createRoom(userId, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield redis_1.redisClient.hgetallAsync(`${redisKeyPrefix_1.redisKeyPrefix.user}${userId}`);
            if (user.roomlist && user.roomlist.length === 10) {
                return { code: 501, msg: "You already have 10 rooms and can't create any more" };
            }
            // todo 之后要改成从数据库生成的房间配置表获取
            let needDaimond = parseInt(room_1.PayType[config[1][3]].substr(4), 0);
            if (Number.parseInt(user.diamond, 0) < needDaimond) {
                return { code: 502, msg: 'You are short of diamonds' };
            }
            let roomId;
            do {
                roomId = gameUitl_1.GameUitl.generateRoomId();
            } while (yield redis_1.redisClient.hgetallAsync(`${redisKeyPrefix_1.redisKeyPrefix.room}${roomId}`));
            let createTime = gameUitl_1.GameUitl.getLocalDateStr();
            console.log('roomid = ' + roomId + ' ; createTime = ' + createTime);
            let nowDiamond = Number.parseInt(user.diamond, 0) - needDaimond;
            let result = yield user_1.User.updateUser({ userid: Number.parseInt(user.userid, 0) }, { diamond: nowDiamond });
            if (result === 0) {
                return { code: 503, msg: 'Buckling failure' };
            }
            return { code: 500 };
            // let channel = this.channelService.createChannel(roomId.toString());
            // console.log('房间管理器中房间通道为：' + channel.name);
            // let roomConfig: IRoomConfig = room_1_1(config);
            // let room = new RoomChannelService(channel);
            // this.roomList[roomId] = room;
            // room.initRoom(roomId, userId, config, roomConfig, createTime);
            // return { code: 200, roomid: room.roomId };
        });
    }
    joinRoom(userId, roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            // let room = this.roomList[roomId];
            // if (!!room) {
            //     let needDaimond: number = parseInt(room.PayType.substr(4, room.PayType.length - 4));
            //     let user = userManager.getUser(userId);
            //     if (user.diamond < needDaimond) {
            //         return {
            //             code: 511,
            //             msg: 'You are short of diamonds'
            //         }
            //     }
            //     let userInfo = {
            //         userid: user.userid,
            //         usernick: user.usernick,
            //         image: user.image
            //     };
            //     let channel = room.getChannel();
            //     channel.pushMessage('onJoinRoom', userInfo);
            //     channel.add(userId);
            //     return {
            //         code: 200,
            //         data: {
            //             userlist: room.userList,
            //             onlookerlist: room.onlookerList,
            //             roomconfig: room.roomConfig
            //         }
            //     }
            // } else {
            //     return {
            //         code: 401,
            //         msg: "The room does't exist!"
            //     };
            // }
            return null;
        });
    }
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSwwQ0FBNkM7QUFDN0Msb0VBQWlFO0FBQ2pFLGdEQUEwRDtBQUMxRCxrREFBK0M7QUFDL0MsdUNBQW9DO0FBSXBDO0lBRVcsTUFBTSxDQUFPLFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBa0I7O1lBQzdELElBQUksSUFBSSxHQUFHLE1BQU0sbUJBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRywrQkFBYyxDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQzdFLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7Z0JBQzlDLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxxREFBcUQsRUFBRSxDQUFDO2FBQ3BGO1lBQ0QsMkJBQTJCO1lBQzNCLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLFdBQVcsRUFBRTtnQkFDaEQsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLDJCQUEyQixFQUFFLENBQUM7YUFDMUQ7WUFFRCxJQUFJLE1BQWMsQ0FBQztZQUNuQixHQUFHO2dCQUNDLE1BQU0sR0FBRyxtQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3RDLFFBQVEsTUFBTSxtQkFBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLCtCQUFjLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDNUUsSUFBSSxVQUFVLEdBQUcsbUJBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLEdBQUcsa0JBQWtCLEdBQUcsVUFBVSxDQUFDLENBQUM7WUFDcEUsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFJLFdBQVcsQ0FBQztZQUNqRSxJQUFJLE1BQU0sR0FBRyxNQUFNLFdBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUMxRyxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ2QsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixFQUFFLENBQUM7YUFDakQ7WUFFRCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLHNFQUFzRTtZQUN0RSw4Q0FBOEM7WUFDOUMsa0RBQWtEO1lBQ2xELDhDQUE4QztZQUM5QyxnQ0FBZ0M7WUFDaEMsaUVBQWlFO1lBQ2pFLDZDQUE2QztRQUNqRCxDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsTUFBYyxFQUFFLE1BQWM7O1lBQ2hELG9DQUFvQztZQUNwQyxnQkFBZ0I7WUFDaEIsMkZBQTJGO1lBQzNGLDhDQUE4QztZQUM5Qyx3Q0FBd0M7WUFDeEMsbUJBQW1CO1lBQ25CLHlCQUF5QjtZQUN6QiwrQ0FBK0M7WUFDL0MsWUFBWTtZQUNaLFFBQVE7WUFDUix1QkFBdUI7WUFDdkIsK0JBQStCO1lBQy9CLG1DQUFtQztZQUNuQyw0QkFBNEI7WUFDNUIsU0FBUztZQUNULHVDQUF1QztZQUN2QyxtREFBbUQ7WUFDbkQsMkJBQTJCO1lBQzNCLGVBQWU7WUFDZixxQkFBcUI7WUFDckIsa0JBQWtCO1lBQ2xCLHVDQUF1QztZQUN2QywrQ0FBK0M7WUFDL0MsMENBQTBDO1lBQzFDLFlBQVk7WUFDWixRQUFRO1lBQ1IsV0FBVztZQUNYLGVBQWU7WUFDZixxQkFBcUI7WUFDckIsd0NBQXdDO1lBQ3hDLFNBQVM7WUFDVCxJQUFJO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0o7QUF0RUQsa0NBc0VDIn0=