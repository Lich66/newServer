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
const app_1 = require("../../../app");
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
            console.log('创建房间时获取到的所有玩家信息' + JSON.stringify(this.app.get('redisClient').get(userId)));
            let user = app_1.userManager.getUser(userId);
            console.log('创建房间时获取到的玩家信息:' + JSON.stringify(user));
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
            let room = this.roomList[roomId];
            if (!!room) {
                let needDaimond = parseInt(room.PayType.substr(4, room.PayType.length - 4));
                let user = app_1.userManager.getUser(userId);
                if (user.diamond < needDaimond) {
                    return {
                        code: 503,
                        msg: 'You are short of diamonds'
                    };
                }
                let userInfo = {
                    userid: user.userid,
                    usernick: user.usernick,
                    image: user.image
                };
                let channel = room.getChannel();
                channel.pushMessage('onJoinRoom', userInfo);
                channel.add(userId);
                return {
                    code: 200,
                    data: {
                        userlist: room.userList,
                        onlookerlist: room.onlookerList,
                        roomconfig: room.roomConfig
                    }
                };
            }
            else {
                return {
                    code: 401,
                    msg: "The room does't exist!"
                };
            }
        });
    }
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSx3REFBcUQ7QUFDckQsZ0RBQTBEO0FBRTFELHNDQUEyQztBQUUzQztJQUtJLFlBQVksY0FBOEIsRUFBRSxHQUFnQjtRQUg1RCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBSVYsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUNWLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlO1FBQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxJQUFJLE9BQU8sR0FBRyxJ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