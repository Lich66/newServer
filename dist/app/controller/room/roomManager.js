"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../db/redis");
const nameSpace_1 = require("../../gameConfig/nameSpace");
const gameUitl_1 = require("../../util/gameUitl");
const selfUtils_1 = require("../../util/selfUtils");
const user_1 = require("../user/user");
class RoomManager {
    static async createRoom(userId, config, app) {
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
        let roomList = app.get(nameSpace_1.appKeyPrefix.roomList);
        let roomId;
        do {
            roomId = gameUitl_1.GameUitl.generateRoomId();
        } while (roomList.roomId);
        // 更改数据库及redis玩家钻石数
        if (config[4] === 0) {
            let nowDiamond = userData.diamond - roomRate;
            let result = await user_1.User.updateUser({ userid: userId }, { diamond: nowDiamond });
            if (result === 0) {
                return { flag: false, code: 12003 };
            }
            // console.log('修改redis之前的数据情况:' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));
            await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, 'diamond', nowDiamond.toString());
            // console.log('修改redis之后的数据情况:' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));
        }
        // 解析房间配置信息
        let json1 = await gameUitl_1.GameUitl.parsePRoomConfig(config);
        let json2 = {
            roomId,
            creatorId: userId,
            roomConfig: config
        };
        let json = selfUtils_1.SelfUtils.assign(json1, json2);
        console.log('合并后的房间配置: ' + JSON.stringify(json));
        return { flag: true, roomId, json };
    }
    static async joinRoom(userId, roomId, sid, app) {
        let roomList = app.get(nameSpace_1.appKeyPrefix.roomList);
        console.log('挂在APP上的房间有:' + JSON.stringify(Object.keys(roomList)));
        let room = roomList[roomId];
        console.log('获取到的room' + JSON.stringify(room.roomId));
        if (!room) {
            return { code: 12013 };
        }
        // let roomConfig = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
        let user = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`);
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
        channel.pushMessage('onJoinRoom', { userData });
        console.log('加入的玩家信息:' + JSON.stringify(userData));
        room.onlookerList.push(userData);
        return {
            code: 0,
            data: {
                userList: room.userList,
                onlookerList: room.onlookerList,
                roomconfig: room.roomConfig
            }
        };
    }
}
RoomManager.roomList = {};
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMENBQTZDO0FBQzdDLDBEQUEwRTtBQUcxRSxrREFBK0M7QUFDL0Msb0RBQWlEO0FBQ2pELHVDQUFvQztBQUlwQyxNQUFhLFdBQVc7SUFJYixNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBVyxFQUFFLEdBQWdCO1FBQ3hFLG1CQUFtQjtRQUNuQixJQUFJLFdBQVcsR0FBRyxNQUFNLG1CQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN6RixJQUFJLFdBQVcsSUFBSSxXQUFXLEtBQUssRUFBRSxFQUFFO1lBQ25DLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUN2QztRQUNELElBQUksUUFBUSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNyRCxpQkFBaUI7UUFDakIsSUFBSSxRQUFRLEdBQVcsbUJBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFO1lBQzdCLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUN2QztRQUNELFFB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