"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../db/redis");
const nameSpace_1 = require("../../gameConfig/nameSpace");
const roomConfig_1 = require("../../gameConfig/roomConfig");
const userConfig_1 = require("../../gameConfig/userConfig");
const gameUitl_1 = require("../../util/gameUitl");
const selfUtils_1 = require("../../util/selfUtils");
const user_1 = require("../user/user");
class RoomManager {
    /**
     * 创建房间逻辑
     * @param userId 创建者id
     * @param config 房间配置信息
     */
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
            state: 0,
            roomId,
            creatorId: userId,
            roomConfig: JSON.stringify(config),
            createTime: (new Date()).valueOf(),
            onlookerList: JSON.stringify([]),
            userList: JSON.stringify([])
        };
        let json = selfUtils_1.SelfUtils.assign(json2, json1);
        console.log('合并后的房间配置: ' + JSON.stringify(json));
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${json.roomId}`, key, `${json[key]}`);
            }
        }
        await redis_1.redisClient.rpushAsync(`${nameSpace_1.redisKeyPrefix.userRoomList}${userId}`, `${roomId}`);
        return { flag: true, json };
    }
    /**
     * 加入房间逻辑
     * @param userId 加入者id
     * @param roomId 房间id
     */
    static async joinRoom(userId, roomId) {
        let room = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`);
        console.log('获取到的room' + JSON.stringify(room.roomId));
        if (!room) {
            return { flag: false, code: 12013 };
        }
        if (room.state === '1' && room.halfWayAdd === '1') {
            return { flag: false, code: 12015 };
        }
        let user = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`);
        // 判断玩家的房卡是否足够
        let needDaimond = gameUitl_1.GameUitl.getRoomRate2(parseInt(room.playerNum, 0), parseInt(room.round, 0), parseInt(room.PayType, 0));
        if (parseInt(room.PayType, 0) === 1) {
            if (parseInt(user.diamond, 0) < needDaimond) {
                return { flag: false, code: 12011 };
            }
        }
        else {
            if (parseInt(room.creatorId, 0) === userId) {
                if (parseInt(user.diamond, 0) < needDaimond) {
                    return { flag: false, code: 12011 };
                }
            }
        }
        let userData = {
            userNick: user.usernick,
            userID: user.userid,
            image: user.image
        };
        let userList = JSON.parse(room.userList);
        let onlookerList = JSON.parse(room.onlookerList);
        let roomConfig = JSON.parse(room.roomConfig);
        onlookerList.push(userData);
        let onlookerListStr = JSON.stringify(onlookerList);
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`, `${roomConfig_1.RoomFields.onlookerList}`, onlookerListStr);
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.roomId}`, `${roomId}`);
        return {
            flag: true,
            userData,
            userList,
            onlookerList,
            roomConfig
        };
    }
    /**
     * 获取房间所在服务器id
     * @param roomId 房间id
     */
    static async getRoomServerId(roomId) {
        return await redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`, 'sid');
    }
    /**
     * 设置房间服务器id
     * @param roomId 房间id
     * @param sid 服务器id
     */
    static async setRoomServerId(roomId, sid) {
        return await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`, 'sid', sid);
    }
    /**
     * 离开房间逻辑
     * @param userId 离开者id
     * @param roomId 离开房间id
     */
    static async leaveRoom(userId, roomId) {
        let room = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`);
        // 房间是否存在
        if (!room) {
            return { flag: false, code: 13001 };
        }
        let user = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`);
        // 玩家是否在房间里
        if (!user.roomId) {
            return { flag: false, code: 13002 };
        }
        // 玩家有无座位号
        if (user.seatNum) {
            // 游戏是否开始
            if (room.state === '1') {
                return { flag: false, code: 13022 };
            }
            let userList = JSON.parse(room.userList);
            for (let i of userList) {
                let index = 0;
                if (i.userId === userId) {
                    userList.splice(index, 1);
                    break;
                }
                index++;
                // console.log('看看for-of能不能被break退出' + index);
            }
            await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`, `${roomConfig_1.RoomFields.userList}`, JSON.stringify(userList));
            await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.roomId}`);
            await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.seatNum}`);
            return { flag: true, userType: 1 };
        }
        else {
            let onlookerList = JSON.parse(room.onlookerList);
            for (let i of onlookerList) {
                let index = 0;
                if (i.userId === userId) {
                    onlookerList.splice(index, 1);
                    break;
                }
                index++;
                // console.log('看看for-of能不能被break退出' + index);
            }
            await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`, `${roomConfig_1.RoomFields.onlookerList}`, JSON.stringify(onlookerList));
            await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.roomId}`);
            return { flag: true, userType: 0 };
        }
    }
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMENBQTZDO0FBQzdDLDBEQUE0RDtBQUM1RCw0REFBeUQ7QUFDekQsNERBQXlEO0FBRXpELGtEQUErQztBQUMvQyxvREFBaUQ7QUFDakQsdUNBQW9DO0FBSXBDLE1BQWEsV0FBVztJQUNwQjs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBYyxFQUFFLE1BQVc7UUFDdEQsbUJBQW1CO1FBQ25CLElBQUksV0FBVyxHQUFHLE1BQU0sbUJBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRywwQkFBYyxDQUFDLFlBQVksR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3pGLElBQUksV0FBVyxJQUFJLFdBQVcsS0FBSyxFQUFFLEVBQUU7WUFDbkMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxRQUFRLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3JELGlCQUFpQjtRQUNqQixJQUFJLFFBQVEsR0FBVyxtQkFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFF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