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
    constructor() {
        this.roomList = {};
    }
    static createRoom(userId, config) {
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
            let roomId;
            do {
                roomId = gameUitl_1.GameUitl.generateRoomId();
            } while (yield redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`));
            let createTime = gameUitl_1.GameUitl.getLocalDateStr();
            console.log('roomid = ' + roomId + ' ; createTime = ' + createTime);
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
                createTime,
                roomConfig: config
            };
            let json = selfUtils_1.SelfUtils.assign(json1, json2);
            console.log('合并后的房间配置: ' + JSON.stringify(json));
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
            // let roomConfig = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
            // let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
            // // 如果是房间是AA类型,则需要判断玩家的房卡是否足够
            // if (PayType[parseInt(roomConfig.playType, 0)].substr(0, 2) === 'AA') {
            //     let needDaimond = parseInt(PayType[parseInt(roomConfig.playType, 0)].substr(4), 0);
            //     if (parseInt(user.diamond, 0) < needDaimond) {
            //         return { flag: false, code: 511, msg: 'You are short of diamonds' };
            //     }
            // }
            // let num: number[][] = [[], []];
            // let numstr: string[] = roomConfig.roomConfig.split(',');
            // console.log('..................拆分出来的' + JSON.stringify(numstr));
            // numstr.forEach((value, i) => {
            //     if (i < 2) {
            //         num[0][i] = parseInt(value, 0);
            //     } else {
            //         num[1][i - 2] = parseInt(value, 0);
            //     }
            // });
            // console.log('..................解析出来的' + JSON.stringify(num));
            // // todo 从redis上拉取房间里的玩家列表和观战玩家列表 
            // const userList: string[] = [];
            // const onlookerList: string[] = [];
            // return { flag: true, roomConfig: num, userList, onlookerList };
            return { code: 500 };
        });
    }
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwwQ0FBNkM7QUFDN0MsMERBQTREO0FBRTVELGtEQUErQztBQUMvQyxvREFBaUQ7QUFDakQsdUNBQW9DO0FBSXBDLE1BQWEsV0FBVztJQUF4QjtRQUVXLGFBQVEsR0FBRyxFQUFFLENBQUM7SUE4RXpCLENBQUM7SUE1RVUsTUFBTSxDQUFPLFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBVzs7WUFDdEQsbUJBQW1CO1lBQ25CLElBQUksV0FBVyxHQUFHLE1BQU0sbUJBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRywwQkFBYyxDQUFDLFlBQVksR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3pGLElBQUksV0FBVyxJQUFJLFdBQVcsS0FBSyxFQUFFLEVBQUU7Z0JBQ25DLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUN2QztZQUNELElBQUksUUFBUSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNyRCxpQkFBaUI7WUFDakIsSUFBSSxRQUFRLEdBQVcsbUJBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFO2dCQUM3QixPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJ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