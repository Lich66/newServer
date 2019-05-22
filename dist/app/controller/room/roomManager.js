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
            // 再判断玩家的钻石是否足够; 
            let roomRate = gameUitl_1.GameUitl.getRoomRate1(config[1], config[3], config[4]);
            if (userData.diamond < roomRate) {
                return { flag: false, code: 12001 };
            }
            // 生成房间号
            let roomId;
            do {
                roomId = gameUitl_1.GameUitl.generateRoomId();
            } while (yield redis_1.redisClient.hgetallAsync(`${redisKeyPrefix_1.redisKeyPrefix.room}${roomId}`));
            let createTime = gameUitl_1.GameUitl.getLocalDateStr();
            console.log('roomid = ' + roomId + ' ; createTime = ' + createTime);
            // 更改数据库及redis玩家钻石数
            let nowDiamond = userData.diamond - roomRate;
            let result = yield user_1.User.updateUser({ userid: userId }, { diamond: nowDiamond });
            if (result === 0) {
                return { flag: false, code: 12003 };
            }
            yield redis_1.redisClient.hsetAsync(`${redisKeyPrefix_1.redisKeyPrefix.user}${userId}`, 'diamond', nowDiamond.toString());
            // 解析房间配置信息
            let json = yield gameUitl_1.GameUitl.parsePRoomConfig(config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwwQ0FBNkM7QUFDN0Msb0VBQWlFO0FBRWpFLGtEQUErQztBQUMvQyx1Q0FBb0M7QUFJcEMsTUFBYSxXQUFXO0lBQXhCO1FBRVcsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQTZFekIsQ0FBQztJQTNFVSxNQUFNLENBQU8sVUFBVSxDQUFDLE1BQWMsRUFBRSxNQUFXOztZQUN0RCxtQkFBbUI7WUFDbkIsSUFBSSxXQUFXLEdBQUcsTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLCtCQUFjLENBQUMsWUFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDekYsSUFBSSxXQUFXLElBQUksV0FBVyxLQUFLLEVBQUUsRUFBRTtnQkFDbkMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ3ZDO1lBQ0QsSUFBSSxRQUFRLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JELGlCQUFpQjtZQUNqQixJQUFJLFFBQVEsR0FBVyxtQkFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlFLElBQUksUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLEVBQUU7Z0JBQzdCLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUN2QztZQUNELFFBQVE7WUFDUixJQUFJLE1BQWMsQ0FBQztZQUNuQixHQUFHO2dCQUNDLE1BQU0sR0FBRyxtQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3RDLFFBQVEsTUFBTSxtQkFBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLCtCQUFjLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDNUUsSUFBSSxVQUFVLEdBQUcsbUJBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLEdBQUcsa0JBQWtCLEdBQUcsVUFBVSxDQUFDLENBQUM7WUFDcEUsbUJBQW1CO1lBQ25CLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1lBQzdDLElBQUksTUFBTSxHQUFHLE1BQU0sV0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ2hGLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDZCxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDdkM7WUFDRCxNQUFNLG1CQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsK0JBQWMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ2pHLFdBQVc7WUFDWCxJQUFJLElBQUksR0FBRyxNQUFNLG1CQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsZ0NBQWdDO1lBQ2hDLHVDQUF1QztZQUN2QyxnQkFBZ0I7WUFDaEIsY0FBYztZQUNkLHlCQUF5QjtZQUN6QixrQkFBa0I7WUFDbEIseUJBQXlCO1lBQ3pCLEtBQUs7WUFDTCxtREFBbUQ7WUFDbkQsMERBQTBEO1lBQzFELGdDQUFnQztZQUNoQyw0Q0FBNEM7WUFDNUMsZ0dBQWdHO1lBQ2hHLFFBQVE7WUFDUixJQUFJO1lBQ0osOEhBQThIO1lBQzlILE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVNLE1BQU0sQ0FBTyxRQUFRLENBQUMsTUFBYyxFQUFFLE1BQWM7O1lBQ3ZELHNGQUFzRjtZQUN0RixnRkFBZ0Y7WUFDaEYsK0JBQStCO1lBQy9CLHlFQUF5RTtZQUN6RSwwRkFBMEY7WUFDMUYscURBQXFEO1lBQ3JELCtFQUErRTtZQUMvRSxRQUFRO1lBQ1IsSUFBSTtZQUNKLGtDQUFrQztZQUNsQywyREFBMkQ7WUFDM0QsbUVBQW1FO1lBQ25FLGlDQUFpQztZQUNqQyxtQkFBbUI7WUFDbkIsMENBQTBDO1lBQzFDLGVBQWU7WUFDZiw4Q0FBOEM7WUFDOUMsUUFBUTtZQUNSLE1BQU07WUFDTixnRUFBZ0U7WUFDaEUsb0NBQW9DO1lBQ3BDLGlDQUFpQztZQUNqQyxxQ0FBcUM7WUFDckMsa0VBQWtFO1lBQ2xFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0NBQ0o7QUEvRUQsa0NBK0VDIn0=