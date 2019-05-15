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
const mpqzRoom_1 = require("../../gameModels/mpqzRoom");
const room_1 = require("../../gameConfig/room");
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
        var roomId = "";
        for (var i = 0; i < 7; ++i) {
            roomId += Math.floor(Math.random() * 10);
        }
        return parseInt(roomId);
    }
    /**
     * 获取本地时间
     * @returns {string}    xxxx.xx.xx xx:xx:xx
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
    ;
    getRoomsByCreatorId(creatorId) {
        for (let i in this.roomList) {
            if (this.roomList[i].creatorId === creatorId) {
            }
        }
    }
    createRoom(userId, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield redis_1.redisClient.getAsync(`'user:'${userId}`);
            // let user = userManager.getUser(userId);
            console.log('1创建房间时获取到的玩家信息:' + JSON.stringify(user));
            console.log('2创建房间时获取到的玩家信息:' + JSON.stringify(user.userid));
            if (user.roomlist.length === 10) {
                return { code: 501, msg: "You already have 10 rooms and can't create any more" };
            }
            //todo 之后要改成从数据库生成的房间配置表获取
            let needDaimond = parseInt(room_1.PayType[config[1][3]]);
            if (user.diamond < needDaimond) {
                return { code: 502, msg: "You are short of diamonds" };
            }
            let roomId = undefined;
            {
                roomId = this.generateRoomId();
            }
            while (this.roomList[roomId])
                ;
            let createTime = this.getLocalDateStr();
            let channel = this.channelService.createChannel(roomId.toString());
            console.log('房间管理器中房间通道为：' + channel.name);
            let roomConfig = room_1.room_1_1(config);
            let room = new mpqzRoom_1.MPQZRoom(channel);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSx3REFBcUQ7QUFDckQsZ0RBQTBEO0FBRzFELDBDQUE2QztBQUU3QztJQUtJLFlBQVksY0FBOEIsRUFBRSxHQUFnQjtRQUg1RCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBSVYsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUNWLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlO1FBQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxJQUFJLE9BQU8sR0FBRyxJ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