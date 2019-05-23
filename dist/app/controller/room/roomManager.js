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
const nameSpace_1 = require("../../gameConfig/nameSpace");
const gameUitl_1 = require("../../util/gameUitl");
const selfUtils_1 = require("../../util/selfUtils");
const user_1 = require("../user/user");
class RoomManager {
    static createRoom(userId, config, app) {
        return __awaiter(this, void 0, void 0, function* () {
            // 先判断玩家的房间数是否超过10个
            let roomListLen = yield redis_1.redisClient.llenAsync(`${nameSpace_1.redisKeyPrefix.userRoomList}${userId}`);
            if (roomListLen && roomListLen === 10) {
                return { flag: false, code: 12002 };
            }
            let userData = yield user_1.User.getUser({ userid: userId });
            console.log('获取数据库的信息为:' + JSON.stringify(userData));
            // 再判断玩家的钻石是否足够; 
            let roomRate = gameUitl_1.GameUitl.getRoomRate1(config[1], config[3], config[4]);
            if (userData.diamond < roomRate) {
                return { flag: false, code: 12001 };
            }
            // 生成房间号
            let roomList = app.get(nameSpace_1.appKeyPrefix.roomList);
            let roomId;
            do {
                roomId = gameUitl_1.GameUitl.generateRoomId();
            } while (roomList.roomId);
            // 更改数据库及redis玩家钻石数
            let nowDiamond = userData.diamond - roomRate;
            let result = yield user_1.User.updateUser({ userid: userId }, { diamond: nowDiamond });
            if (result === 0) {
                return { flag: false, code: 12003 };
            }
            // console.log('修改redis之前的数据情况:' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));
            yield redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, 'diamond', nowDiamond.toString());
            // console.log('修改redis之后的数据情况:' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));
            // 解析房间配置信息
            let json1 = yield gameUitl_1.GameUitl.parsePRoomConfig(config);
            let json2 = {
                roomId,
                creatorId: userId,
                roomConfig: config
            };
            let json = selfUtils_1.SelfUtils.assign(json1, json2);
            console.log('合并后的房间配置: ' + JSON.stringify(json));
            return { flag: true, roomId, json };
        });
    }
    static joinRoom(userId, roomId, sid, app) {
        return __awaiter(this, void 0, void 0, function* () {
            let roomList = app.get(nameSpace_1.appKeyPrefix.roomList);
            console.log('挂在APP上的房间有:' + JSON.stringify(Object.keys(roomList)));
            let room = roomList[roomId];
            console.log('获取到的room' + JSON.stringify(room.roomId));
            if (!room) {
                return { code: 12013 };
            }
            // let roomConfig = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
            let user = yield redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`);
            // 判断玩家的房卡是否足够
            let needDaimond = gameUitl_1.GameUitl.getRoomRate2(room.playerNum, room.round, room.PayType);
            if (room.PayType === 1) {
                if (parseInt(user.diamond, 0) < needDaimond) {
                    return { code: 12011 };
                }
            }
            else {
                if (room.creatorId === userId) {
                    if (parseInt(user.diamond, 0) < needDaimond) {
                        return { code: 12011 };
                    }
                }
            }
            let channel = room.channel;
            channel.add(userId, sid);
            let userData = {
                userNick: user.usernick,
                userID: user.userid,
                image: user.image
            };
            channel.pushMessage('onJoinRoom', userData);
            console.log('加入的玩家信息:' + JSON.stringify(userData));
            room.onlookerList.push(userData);
            return {
                code: 0,
                userList: room.userList,
                onlookerList: room.onlookerList,
                roomconfig: room.roomConfig
            };
        });
    }
}
RoomManager.roomList = {};
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwwQ0FBNkM7QUFDN0MsMERBQTBFO0FBRzFFLGtEQUErQztBQUMvQyxvREFBaUQ7QUFDakQsdUNBQW9DO0FBSXBDLE1BQWEsV0FBVztJQUliLE1BQU0sQ0FBTyxVQUFVLENBQUMsTUFBYyxFQUFFLE1BQVcsRUFBRSxHQUFnQjs7WUFDeEUsbUJBQW1CO1lBQ25CLElBQUksV0FBVyxHQUFHLE1BQU0sbUJBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRywwQkFBYyxDQUFDLFlBQVksR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3pGLElBQUksV0FBVyxJQUFJLFdBQVcsS0FBSyxFQUFFLEVBQUU7Z0JBQ25DLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUN2QztZQUNELElBQUksUUFBUSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNyRCxpQkFBaUI7WUFDakIsSUFBSSxRQUFRLEdBQVcsbUJBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFO2dCQUM3QixPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDdkM7WUFDRCxR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