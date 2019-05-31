"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../db/redis");
const nameSpace_1 = require("../../gameConfig/nameSpace");
const roomConfig_1 = require("../../gameConfig/roomConfig");
const userConfig_1 = require("../../gameConfig/userConfig");
const gameUitl_1 = require("../../util/gameUitl");
const selfUtils_1 = require("../../util/selfUtils");
const redisKeys_1 = require("../redis/redisKeys/redisKeys");
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
            createTime: (new Date()).valueOf()
        };
        let json = selfUtils_1.SelfUtils.assign(json2, json1);
        console.log('合并后的房间配置: ' + JSON.stringify(json));
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${json.roomId}`, key, `${json[key]}`);
            }
        }
        await redis_1.redisClient.rpushAsync(`${nameSpace_1.redisKeyPrefix.userRoomList}${userId}`, `${roomId}`);
        for (let i = 0, len = json.playerNum; i < len; i++) {
            await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${json.roomId}${nameSpace_1.redisKeyPrefix.chair}`, `${i}`, `${-1}`);
        }
        return { flag: true, json };
    }
    /**
     * 加入房间逻辑
     * @param userId 加入者id
     * @param roomId 房间id
     */
    static async joinRoom(userId, roomId) {
        let room = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`);
        if (!room) {
            return { flag: false, code: 12013 };
        }
        console.log('获取到的room' + JSON.stringify(room.roomId));
        // 游戏开始是否禁入
        if (room.state !== '-1' && room.halfWayAdd === '1') {
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
        let userData = {
            userNick: user.usernick,
            userId: user.userid,
            image: user.image
        };
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.clubRoom_users}`, `${userId}`, `${-1}`);
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
            roomConfig,
            creatorId: room.creatorId
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
            if (room.state !== '-1') {
                return { flag: false, code: 13022 };
            }
            let userList = JSON.parse(room.userList);
            for (let i of userList) {
                let index = 0;
                if (i.userid === userId) {
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
                if (i.userid === userId) {
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
    /**
     * 获取房间里的所有玩家
     * @param roomId 房间id
     */
    static async getPlayerListForRoom(roomId) {
        let room = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`);
        let onlookers = [];
        let users = [];
        let onlookerList = JSON.parse(room.onlookerList);
        let userList = JSON.parse(room.userList);
        for (const iterator of onlookerList) {
            onlookers.push(iterator.userId);
        }
        for (const iterator of userList) {
            users.push(iterator.userId);
        }
        return { onlookerList: onlookers, userList: users };
    }
    /**
     * 获取房间里的游戏的玩家
     * @param roomId 房间id
     */
    static async getGamingPlayerListForRoom(roomId) {
        let room = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`);
        let users = [];
        let userList = JSON.parse(room.userList);
        for (const iterator of userList) {
            users.push(iterator.userId);
        }
        return users;
    }
    /**
     * 解散房间逻辑
     * @param userId 申请解散者id
     * @param roomId 解散房间id
     */
    static async dissolveRoom(userId, roomId) {
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
        // 游戏是否开始
        if (room.state === '0') {
            // 非房主不能解散
            if (room.creatorId !== `${userId}`) {
                return { flag: false, code: 13032 };
            }
            let result = await RoomManager.getPlayerListForRoom(roomId);
            for (const iterator of result.onlookerList) {
                await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.roomId}`);
            }
            for (const iterator of result.userList) {
                await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.roomId}`);
                await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.seatNum}`);
            }
            await redis_1.redisClient.lremAsync(`${nameSpace_1.redisKeyPrefix.userRoomList}${userId}`, 1, `${roomId}`);
            await redisKeys_1.RedisKeys.delAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`);
            return { flag: true, code: 0, players: result };
        }
        else {
            // todo 游戏中解散房间,发起申请 ,待测试
            let userList = await RoomManager.getGamingPlayerListForRoom(roomId);
            let userData = { userId, userNick: user.usernick };
            return { flag: true, code: 1, userList, userData };
        }
    }
    /**
     * 解散房间的选择的逻辑
     * @param userId 解散房间同意与否玩家id
     */
    static async optionOfDestoryRoom(userId) {
        // todo 打算解散房间的操作放在game中
    }
    static async getSeatNum(playerNum, playerList) {
        console.log('===========' + JSON.stringify(playerList));
        let len = playerList.length;
        if (len === 0) {
            return 0;
        }
        if (len === playerNum) {
            return -1;
        }
        for (let i = 0; i < playerNum; i++) {
            let flag = false;
            for (let j = 0; j < len; j++) {
                if (i === playerList[j].seatNum) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                return i;
            }
        }
    }
    /**
     * 玩家准备逻辑
     * @param userId 准备玩家id
     * @param roomId 房间id
     */
    static async ready(userId, roomId) {
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
        // 单局游戏开始不能坐下
        if (room.state !== '-1') {
            return { flag: false, code: 13054 };
        }
        let userList = JSON.parse(room.userList);
        let onlookerList = JSON.parse(room.onlookerList);
        // todo 1:已坐下,旁观中无;2:已坐下,旁观者中有;3:未坐下:旁观者中无;4:未坐下:旁观者中有
        // let flag1 = false;
        // let flag2 = false;
        // for (const iterator of userList) {
        //     if (iterator.userId === userId) {
        //         console.log('玩家在已坐下列表中了!');
        //         flag1 = true;
        //         break;
        //     }
        // }
        // for (const iterator of onlookerList) {
        //     if (iterator.userId === userId) {
        //         console.log('玩家有在观战列表中!');
        //         flag2 = true;
        //         break;
        //     }
        // }
        // 分配座位
        let seatNum = await RoomManager.getSeatNum(parseInt(room.playerNum, 0), userList);
        if (seatNum === -1) {
            return { flag: false, code: 13052 };
        }
        // 从旁观者列表移到坐下列表
        for (const iterator of onlookerList) {
            let index = 0;
            if (iterator.userId === `${userId}`) {
                onlookerList.splice(index, 1);
                break;
            }
            index++;
        }
        let onlookerListStr = JSON.stringify(onlookerList);
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`, `${roomConfig_1.RoomFields.onlookerList}`, onlookerListStr);
        let userData = {
            userId,
            userNick: user.userNick,
            image: user.image,
            score: 0,
            seatNum
        };
        userList.push(userData);
        let userListStr = JSON.stringify(userList);
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`, `${roomConfig_1.RoomFields.userList}`, userListStr);
        // 判断是否可以开始游戏
        let startFlag = false;
        if (room.startType !== '0' && room.startType !== '2') {
            console.log('由服务端判定开始情况!!!!!!!!!!');
            // 满足准备开始条件
            if (room.startType === '1' && `${userList.length}` === room.playerNum) {
                console.log('人已满员可以开始游戏');
                startFlag = true;
            }
            if (room.startType !== '1' && userList.length === (parseInt(room.startType, 0) + 1)) {
                console.log(`人满${parseInt(room.startType, 0) + 1}个,可以开始游戏`);
                startFlag = true;
            }
        }
        return { flag: true, userData, startFlag };
    }
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMENBQTZDO0FBQzdDLDBEQUE0RDtBQUM1RCw0REFBeUQ7QUFDekQsNERBQXlEO0FBRXpELGtEQUErQztBQUMvQyxvREFBaUQ7QUFDakQsNERBQXlEO0FBQ3pELHVDQUFvQztBQUVwQyxNQUFhLFdBQVc7SUFDcEI7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWMsRUFBRSxNQUFXO1FBQ3RELG1CQUFtQjtRQUNuQixJQUFJLFdBQVcsR0FBRyxNQUFNLG1CQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN6RixJQUFJLFdBQVcsSUFBSSxXQUFXLEtBQUssRUFBRSxFQUFFO1lBQ25DLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUN2QztRQUNELElBQUksUUFBUSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNyRCxpQkFBaUI7UUFDakIsSUFBSSxRQUFRLEdBQVcsbUJBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFO1lBQzdCLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxF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