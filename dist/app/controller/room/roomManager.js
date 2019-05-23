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
            return { flag: true, roomId, json };
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
RoomManager.roomList = {};
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwwQ0FBNkM7QUFDN0MsMERBQTREO0FBRzVELGtEQUErQztBQUMvQyxvREFBaUQ7QUFDakQsdUNBQW9DO0FBSXBDLE1BQWEsV0FBVztJQUliLE1BQU0sQ0FBTyxVQUFVLENBQUMsTUFBYyxFQUFFLE1BQVc7O1lBQ3RELG1CQUFtQjtZQUNuQixJQUFJLFdBQVcsR0FBRyxNQUFNLG1CQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN6RixJQUFJLFdBQVcsSUFBSSxXQUFXLEtBQUssRUFBRSxFQUFFO2dCQUNuQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDdkM7WUFDRCxJQUFJLFFBQVEsR0FBRyxNQUFNLFdBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckQsaUJBQWlCO1lBQ2pCLElBQUksUUFBUSxHQUFXLG1CQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBSSxRQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsRUFBRTtnQkFDN0IsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ3ZDO1lBQ0QsUUFBUTtZQUNSLElBQUksTUFBYyxDQUFDO1lBQ25CLEdBQUc7Z0JBQ0MsTUFBTSxHQUFHLG1CQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDdEMsUUFBUSxNQUFNLG1CQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUM1RSxJQUFJLFVBQVUsR0FBRyxtQkFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLE1BQU0sR0FBRyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUNwRSxtQkFBbUI7WUFDbkIsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7WUFDN0MsSUFBSSxNQUFNLEdBQUcsTUFBTSxXQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDaEYsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNkLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUN2QztZQUNELHNIQUFzSDtZQUN0SCxNQUFNLG1CQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ2pHLHNIQUFzSDtZQUV0SCxXQUFXO1lBQ1gsSUFBSSxLQUFLLEdBQUcsTUFBTSxtQkFBUSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELElBQUksS0FBSyxHQUFHO2dCQUNSLE1BQU07Z0JBQ04sU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLFVBQVU7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDckIsQ0FBQztZQUNGLElBQUksSUFBSSxHQUFnQixxQkFBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFTSxNQUFNLENBQU8sUUFBUSxDQUFDLE1BQWMsRUFBRSxNQUFjOztZQUN2RCxzRkFBc0Y7WUFDdEYsZ0ZBQWdGO1lBQ2hGLCtCQUErQjtZQUMvQix5RUFBeUU7WUFDekUsMEZBQTBGO1lBQzFGLHFEQUFxRDtZQUNyRCwrRUFBK0U7WUFDL0UsUUFBUTtZQUNSLElBQUk7WUFDSixrQ0FBa0M7WUFDbEMsMkRBQTJEO1lBQzNELG1FQUFtRTtZQUNuRSxpQ0FBaUM7WUFDakMsbUJBQW1CO1lBQ25CLDBDQUEwQztZQUMxQyxlQUFlO1lBQ2YsOENBQThDO1lBQzlDLFFBQVE7WUFDUixNQUFNO1lBQ04sZ0VBQWdFO1lBQ2hFLG9DQUFvQztZQUNwQyxpQ0FBaUM7WUFDakMscUNBQXFDO1lBQ3JDLGtFQUFrRTtZQUNsRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLENBQUM7S0FBQTs7QUF2RWEsb0JBQVEsR0FBRyxFQUFFLENBQUM7QUFGaEMsa0NBMEVDIn0=