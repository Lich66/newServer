"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../db/redis");
const nameSpace_1 = require("../../gameConfig/nameSpace");
const gameUitl_1 = require("../../util/gameUitl");
const selfUtils_1 = require("../../util/selfUtils");
const user_1 = require("../user/user");
class RoomManager {
    static async createRoom(userId, config) {
        // 先判断玩家的房间数是否超过10个
        let roomListLen = await redis_1.redisClient.llenAsync(`${nameSpace_1.redisKeyPrefix.userRoomList}${userId}`);
        if (roomListLen && roomListLen === 10) {
            return { flag: false, code: 12002 };
        }
        let userData = await user_1.User.getUser({ userid: userId });
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
        } while (await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`));
        let createTime = gameUitl_1.GameUitl.getLocalDateStr();
        console.log('roomid = ' + roomId + ' ; createTime = ' + createTime);
        // 更改数据库及redis玩家钻石数
        let nowDiamond = userData.diamond - roomRate;
        let result = await user_1.User.updateUser({ userid: userId }, { diamond: nowDiamond });
        if (result === 0) {
            return { flag: false, code: 12003 };
        }
        // console.log('修改redis之前的数据情况:' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, 'diamond', nowDiamond.toString());
        // console.log('修改redis之后的数据情况:' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));
        // 解析房间配置信息
        let json1 = await gameUitl_1.GameUitl.parsePRoomConfig(config);
        let json2 = {
            roomId,
            creatorId: userId,
            createTime,
            roomConfig: config
        };
        let json = selfUtils_1.SelfUtils.assign(json1, json2);
        console.log('合并后的房间配置: ' + JSON.stringify(json));
        return { flag: true, roomId, json };
    }
    static async joinRoom(userId, roomId) {
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
    }
}
RoomManager.roomList = {};
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMENBQTZDO0FBQzdDLDBEQUE0RDtBQUc1RCxrREFBK0M7QUFDL0Msb0RBQWlEO0FBQ2pELHVDQUFvQztBQUlwQyxNQUFhLFdBQVc7SUFJYixNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBVztRQUN0RCxtQkFBbUI7UUFDbkIsSUFBSSxXQUFXLEdBQUcsTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLDBCQUFjLENBQUMsWUFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDekYsSUFBSSxXQUFXLElBQUksV0FBVyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDdkM7UUFDRCxJQUFJLFFBQVEsR0FBRyxNQUFNLFdBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckQsaUJBQWlCO1FBQ2pCLElBQUksUUFBUSxHQUFXLG1CQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxRQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsRUFBRTtZQUM3QixPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDdkM7UUFDRCxRQUFRO1FBQ1IsSUFB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