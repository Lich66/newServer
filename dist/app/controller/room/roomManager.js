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
            return { flag: true, roomConfig: num, userList: [], onlookerList: [] };
        });
    }
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSwwQ0FBNkM7QUFDN0Msb0VBQWlFO0FBQ2pFLGdEQUEwRDtBQUMxRCxrREFBK0M7QUFDL0Msb0RBQWlEO0FBQ2pELHVDQUFvQztBQUlwQztJQUVXLE1BQU0sQ0FBTyxVQUFVLENBQUMsTUFBYyxFQUFFLE1BQWtCOztZQUM3RCxJQUFJLElBQUksR0FBRyxNQUFNLG1CQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsK0JBQWMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM3RSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFO2dCQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxxREFBcUQsRUFBRSxDQUFDO2FBQ2pHO1lBQ0QsMkJBQTJCO1lBQzNCLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLFdBQVcsRUFBRTtnQkFDaEQsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQzthQUN2RTtZQUVELElBQUksTUFBYyxDQUFDO1lBQ25CLEdBQUc7Z0JBQ0MsTUFBTSxHQUFHLG1CQUFRLENBQUMsY0FBYyxFQUFFLENB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