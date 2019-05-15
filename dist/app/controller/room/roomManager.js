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
const roomChannelService_1 = require("../../channelService/roomChannelService/roomChannelService");
const redis_1 = require("../../db/redis");
const room_1 = require("../../gameConfig/room");
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
            console.log('1创建房间时获取到的玩家信息:' + JSON.stringify(user));
            console.log('2创建房间时获取到的玩家信息:' + JSON.stringify(user.userid));
            if (user.roomlist.length === 10) {
                return { code: 501, msg: "You already have 10 rooms and can't create any more" };
            }
            // todo 之后要改成从数据库生成的房间配置表获取
            let needDaimond = parseInt(room_1.PayType[config[1][3]], 0);
            if (user.diamond < needDaimond) {
                return { code: 502, msg: 'You are short of diamonds' };
            }
            let roomId;
            {
                roomId = this.generateRoomId();
            }
            while (this.roomList[roomId])
                ;
            let createTime = this.getLocalDateStr();
            let channel = this.channelService.createChannel(roomId.toString());
            console.log('房间管理器中房间通道为：' + channel.name);
            let roomConfig = room_1.room_1_1(config);
            let room = new roomChannelService_1.RoomChannelService(channel);
            this.roomList[roomId] = room;
            room.initRoom(roomId, userId, config, roomConfig, createTime);
            return { code: 200, roomid: room.roomId };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxtR0FBZ0c7QUFDaEcsMENBQTZDO0FBQzdDLGdEQUEwRDtBQUkxRDtJQUtJLFlBQW1CLGNBQThCLEVBQUUsR0FBZ0I7UUFINUQsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUlqQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxjQUFjO1FBQ2pCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZUFBZTtRQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLElB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