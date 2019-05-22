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
const roomConfig_1 = require("../../gameConfig/roomConfig");
const gameUitl_1 = require("../../util/gameUitl");
const user_1 = require("../user/user");
class RoomManager {
    constructor() {
        this.roomList = {};
    }
    static createRoom(userId, config) {
        return __awaiter(this, void 0, void 0, function* () {
            // 先判断玩家的房间数是否超过10个
            let roomListLen = yield redis_1.redisClient.llenAsync(`${redisKeyPrefix_1.redisKeyPrefix.userRoomList}${userId}`);
            if (roomListLen && roomListLen === 10) {
                return { flag: false, code: 12002 };
            }
            let userData = yield user_1.User.getUser({ userid: userId });
            console.log('获取数据库的信息为:' + JSON.stringify(userData));
            // 再判断玩家的钻石是否足够; config[4]代表房费, >2表示支付方式为房主支付
            let needDaimond;
            if (config[4] > 2) {
                needDaimond = parseInt(roomConfig_1.RoomConfig.payType[config[4]], 0);
                if (userData.diamond < needDaimond) {
                    return { flag: false, code: 12001 };
                }
            }
            // 生成房间号
            let roomId;
            do {
                roomId = gameUitl_1.GameUitl.generateRoomId();
            } while (yield redis_1.redisClient.hgetallAsync(`${redisKeyPrefix_1.redisKeyPrefix.room}${roomId}`));
            let createTime = gameUitl_1.GameUitl.getLocalDateStr();
            console.log('roomid = ' + roomId + ' ; createTime = ' + createTime);
            // 更改数据库及redis玩家钻石数
            let nowDiamond = userData.diamond - needDaimond;
            let result = yield user_1.User.updateUser({ userid: userId }, { diamond: nowDiamond });
            if (result === 0) {
                return { flag: false, code: 12003 };
            }
            yield redis_1.redisClient.hsetAsync(`${redisKeyPrefix_1.redisKeyPrefix.user}${userId}`, 'diamond', nowDiamond.toString());
            console.log('改变后redis的钻石数' + JSON.stringify(yield redis_1.redisClient.hgetallAsync(`${redisKeyPrefix_1.redisKeyPrefix.user}${userId}`)));
            // let json1 = room_0_0(config);
            // console.log('转义后的房间配置信息: ' + json1);
            // let json2 = {
            //     roomId,
            //     creatorId: userId,
            //     createTime,
            //     roomConfig: config
            // };
            // let roomConfig = SelfUtils.assign(json1, json2);
            // console.log('合并后的房间配置: ' + JSON.stringify(roomConfig));
            // for (let key in roomConfig) {
            //     if (roomConfig.hasOwnProperty(key)) {
            //         await redisClient.hsetAsync(`${redisKeyPrefix.room}${roomId}`, key, roomConfig[key]);
            //     }
            // }
            // console.log('从redis捞出来的roomConfig = ' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`)));
            return { flag: true, roomId };
        });
    }
    static joinRoom(userId, roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            let roomConfig = yield redis_1.redisClient.hgetallAsync(`${redisKeyPrefix_1.redisKeyPrefix.room}${roomId}`);
            let user = yield redis_1.redisClient.hgetallAsync(`${redisKeyPrefix_1.redisKeyPrefix.user}${userId}`);
            // 如果是房间是AA类型,则需要判断玩家的房卡是否足够
            if (room_1.PayType[parseInt(roomConfig.playType, 0)].substr(0, 2) === 'AA') {
                let needDaimond = parseInt(room_1.PayType[parseInt(roomConfig.playType, 0)].substr(4), 0);
                if (parseInt(user.diamond, 0) < needDaimond) {
                    return { flag: false, code: 511, msg: 'You are short of diamonds' };
                }
            }
            let num = [[], []];
            let numstr = roomConfig.roomConfig.split(',');
            console.log('..................拆分出来的' + JSON.stringify(numstr));
            numstr.forEach((value, i) => {
                if (i < 2) {
                    num[0][i] = parseInt(value, 0);
                }
                else {
                    num[1][i - 2] = parseInt(value, 0);
                }
            });
            console.log('..................解析出来的' + JSON.stringify(num));
            // todo 从redis上拉取房间里的玩家列表和观战玩家列表 
            const userList = [];
            const onlookerList = [];
            return { flag: true, roomConfig: num, userList, onlookerList };
        });
    }
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwwQ0FBNkM7QUFDN0Msb0VBQWlFO0FBQ2pFLGdEQUEwRDtBQUMxRCw0REFBeUQ7QUFDekQsa0RBQStDO0FBQy9DLHVDQUFvQztBQUlwQyxNQUFhLFdBQVc7SUFBeEI7UUFFVyxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBK0V6QixDQUFDO0lBN0VVLE1BQU0sQ0FBTyxVQUFVLENBQUMsTUFBYyxFQUFFLE1BQThCOztZQUN6RSxtQkFBbUI7WUFDbkIsSUFBSSxXQUFXLEdBQUcsTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLCtCQUFjLENBQUMsWUFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDekYsSUFBSSxXQUFXLElBQUksV0FBVyxLQUFLLEVBQUUsRUFBRTtnQkFDbkMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ3ZDO1lBQ0QsSUFBSSxRQUFRLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JELDZDQUE2QztZQUM3QyxJQUFJLFdBQW1CLENBQUM7WUFDeEIsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNmLFdBQVcsR0FBRyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELElBQUksUUFBUSxDQUFDLE9BQU8sR0FB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