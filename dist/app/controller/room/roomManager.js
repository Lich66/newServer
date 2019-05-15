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
class RoomManager {
    constructor(channelService, app) {
        this.roomList = {};
        this.channelService = channelService;
        this.app = app;
    }
    /**
     * 获取7位的房间ID
     */
    generateRoomId() {
        let roomId = '';
        for (let i = 0; i < 7; ++i) {
            roomId += Math.floor(Math.random() * 10);
        }
        return parseInt(roomId, 0);
    }
    /**
     * 获取本地时间
     * @returns string    xxxx.xx.xx xx:xx:xx
     */
    getLocalDateStr() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let dateStr = year + '.' + month + '.' + day + '  ' + hours + ':' + minutes + ':' + seconds;
        return dateStr;
    }
    createRoom(userId, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield redis_1.redisClient.getAsync(`'user:'${userId}`);
            // console.log('1创建房间时获取到的玩家信息:' + JSON.stringify(user));
            // console.log('2创建房间时获取到的玩家信息:' + JSON.stringify(user.userid));
            // if (user.roomlist.length === 10) {
            //     return { code: 501, msg: "You already have 10 rooms and can't create any more" };
            // }
            // // todo 之后要改成从数据库生成的房间配置表获取
            // let needDaimond = parseInt(PayType[config[1][3]], 0);
            // if (user.diamond < needDaimond) {
            //     return { code: 502, msg: 'You are short of diamonds' };
            // }
            // let roomId: number;
            // {
            //     roomId = this.generateRoomId();
            // } while (this.roomList[roomId]);
            // let createTime = this.getLocalDateStr();
            // let channel = this.channelService.createChannel(roomId.toString());
            // console.log('房间管理器中房间通道为：' + channel.name);
            // let roomConfig: IRoomConfig = room_1_1(config);
            // let room = new MPQZRoom(channel);
            // this.roomList[roomId] = room;
            // room.initRoom(roomId, userId, config, roomConfig, createTime);
            return { code: 200 };
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
            //             code: 503,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSwwQ0FBNkM7QUFLN0M7SUFLSSxZQUFtQixjQUE4QixFQUFFLEdBQWdCO1FBSDVELGFBQVEsR0FBRyxFQUFFLENBQUM7UUFJakIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksY0FBYztRQUNqQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUN4QixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGVBQWU7UUFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUM1RixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRVksVUFBVSxDQUFDLE1BQWMsRUFBRSxNQUFrQjs7WUFDdEQsSUFBSSxJQUFJLEdBQUcsTUFBTSxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDMUQseURBQXlEO1lBQ3pELGdFQUFnRTtZQUNoRSxxQ0FBcUM7WUFDckMsd0ZBQXdGO1lBQ3hGLElBQUk7WUFDSiw4QkFBOEI7WUFDOUIsd0RBQXdEO1lBQ3hELG9DQUFvQztZQUNwQyw4REFBOEQ7WUFDOUQsSUFBSTtZQUNKLHNCQUFzQjtZQUN0QixJQUFJO1lBQ0osc0NBQXNDO1lBQ3RDLG1DQUFtQztZQUNuQywyQ0FBMkM7WUFDM0Msc0VBQXNFO1lBQ3RFLDhDQUE4QztZQUM5QyxrREFBa0Q7WUFDbEQsb0NBQW9DO1lBQ3BDLGdDQUFnQztZQUNoQyxpRUFBaUU7WUFDakUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsTUFBYyxFQUFFLE1BQWM7O1lBQ2hELG9DQUFvQztZQUNwQyxnQkFBZ0I7WUFDaEIsMkZBQTJGO1lBQzNGLDhDQUE4QztZQUM5Qyx3Q0FBd0M7WUFDeEMsbUJBQW1CO1lBQ25CLHlCQUF5QjtZQUN6QiwrQ0FBK0M7WUFDL0MsWUFBWTtZQUNaLFFBQVE7WUFDUix1QkFBdUI7WUFDdkIsK0JBQStCO1lBQy9CLG1DQUFtQztZQUNuQyw0QkFBNEI7WUFDNUIsU0FBUztZQUNULHVDQUF1QztZQUN2QyxtREFBbUQ7WUFDbkQsMkJBQTJCO1lBQzNCLGVBQWU7WUFDZixxQkFBcUI7WUFDckIsa0JBQWtCO1lBQ2xCLHVDQUF1QztZQUN2QywrQ0FBK0M7WUFDL0MsMENBQTBDO1lBQzFDLFlBQVk7WUFDWixRQUFRO1lBQ1IsV0FBVztZQUNYLGVBQWU7WUFDZixxQkFBcUI7WUFDckIsd0NBQXdDO1lBQ3hDLFNBQVM7WUFDVCxJQUFJO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0o7QUFsR0Qsa0NBa0dDIn0=