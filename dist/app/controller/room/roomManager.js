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
const selfUtils_1 = require("../../util/selfUtils");
const user_1 = require("../user/user");
class RoomManager {
    static createRoom(userId, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield redis_1.redisClient.hgetallAsync(`${redisKeyPrefix_1.redisKeyPrefix.user}${userId}`);
            if (user.roomlist && user.roomlist.length === 10) {
                return { flag: false, code: 501, msg: "You already have 10 rooms and can't create any more" };
            }
            // todo 之后要改成从数据库生成的房间配置表获取
            let needDaimond = parseInt(room_1.PayType[config[1][3]].substr(4), 0);
            if (Number.parseInt(user.diamond, 0) < needDaimond) {
                return { flag: false, code: 502, msg: 'You are short of diamonds' };
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
                return { flag: false, code: 503, msg: 'database deduction failed' };
            }
            yield redis_1.redisClient.hsetAsync(`${redisKeyPrefix_1.redisKeyPrefix.user}${userId}`, 'diamond', nowDiamond.toString());
            console.log('改变后redis的钻石数' + JSON.stringify(yield redis_1.redisClient.hgetallAsync(`${redisKeyPrefix_1.redisKeyPrefix.user}${userId}`)));
            let json1 = room_1.room_0_0(config);
            console.log('转义后的房间配置信息: ' + json1);
            let json2 = {
                roomId,
                creatorId: userId,
                createTime,
                roomConfig: config
            };
            let roomConfig = selfUtils_1.SelfUtils.assign(json1, json2);
            console.log('合并后的房间配置: ' + JSON.stringify(roomConfig));
            for (let key in roomConfig) {
                if (roomConfig.hasOwnProperty(key)) {
                    yield redis_1.redisClient.hsetAsync(`${redisKeyPrefix_1.redisKeyPrefix.room}${roomId}`, key, roomConfig[key]);
                }
            }
            console.log('从redis捞出来的roomConfig = ' + JSON.stringify(yield redis_1.redisClient.hgetallAsync(`${redisKeyPrefix_1.redisKeyPrefix.room}${roomId}`)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSwwQ0FBNkM7QUFDN0Msb0VBQWlFO0FBQ2pFLGdEQUEwRDtBQUMxRCxrREFBK0M7QUFDL0Msb0RBQWlEO0FBQ2pELHVDQUFvQztBQUlwQyxNQUFhLFdBQVc7SUFFYixNQUFNLENBQU8sVUFBVSxDQUFDLE1BQWMsRUFBRSxNQUFrQjs7WUFDN0QsSUFBSSxJQUFJLEdBQUcsTUFBTSxtQkFBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLCtCQUFjLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDN0UsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRTtnQkFDOUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUscURBQXFELEVBQUUsQ0FBQzthQUNqRztZQUNELDJCQUEyQjtZQUMzQixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsR0FBRyxXQUFXLEVBQUU7Z0JBQ2hELE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLDJCQUEyQixFQUFFLENBQUM7YUFDdkU7WUFFRCxJQUFJLE1BQWMsQ0FBQztZQUNuQixHQUFHO2dCQUNDLE1BQU0sR0FBRyxtQkFBUSxDQUFDLGNB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