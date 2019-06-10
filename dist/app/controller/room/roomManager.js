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
            state: -1,
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
        for (let i = 0, len = parseInt(json.playerNum, 0); i < len; i++) {
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
        if (parseInt(room.PayType, 0) === 1) {
            let needDaimond = gameUitl_1.GameUitl.getRoomRate2(parseInt(room.playerNum, 0), parseInt(room.round, 0), parseInt(room.PayType, 0));
            if (parseInt(user.diamond, 0) < needDaimond) {
                return { flag: false, code: 12011 };
            }
        }
        let userData = {
            userNick: user.usernick,
            userId: user.userid,
            image: user.image
        };
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.roomUsers}`, `${userId}`, `${-1}`);
        let roomUsers = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.roomUsers}`);
        let userList = [];
        let onlookerList = [];
        for (const key in roomUsers) {
            if (roomUsers.hasOwnProperty(key)) {
                let user = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${key}`);
                if (roomUsers[key] !== '-1') {
                    userList.push({
                        userId: user.userid,
                        userNick: user.usernick,
                        image: user.image,
                        score: user.score,
                        seatNum: parseInt(roomUsers[key], 0)
                    });
                }
                else {
                    onlookerList.push({
                        userId: user.userid,
                        userNick: user.usernick,
                        image: user.image
                    });
                }
            }
        }
        let roomConfig = JSON.parse(room.roomConfig);
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
     * 坐下玩家判断逻辑
     * @param userId 发送者id
     */
    static async isSittingUser(userId) {
        let roomId = await redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.roomId}`);
        if (!roomId) {
            return { flag: false, code: 13002 };
        }
        let seatNum = await redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.roomUsers}`, `${userId}`);
        if (!seatNum) {
            return { flag: false, code: 13001 };
        }
        if (seatNum === '-1') {
            return { flag: false, code: 13047 };
        }
        return { flag: true, roomId };
    }
    /**
     * 发送道具判断逻辑
     * @param userId 发送者id
     * @param receiverId 接收者id
     */
    static async stageProperty(userId, receiverId) {
        // 发送者是否坐下
        let result1 = await RoomManager.isSittingUser(userId);
        if (!result1.flag) {
            return result1;
        }
        // 是否禁用道具
        let itemUse = await redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.room}${result1.roomId}`, `${roomConfig_1.RoomFields.itemUse}`);
        if (!!itemUse && itemUse === '1') {
            return { flag: false, code: 13043 };
        }
        // 接收者是否坐下
        let result2 = await RoomManager.isSittingUser(receiverId);
        if (!result2.flag) {
            return result2;
        }
        return { flag: true, roomId: result1.roomId };
    }
    /**
     * 离开房间逻辑
     * @param userId 离开者id
     * @param roomId 离开房间id
     */
    static async leaveRoom(userId) {
        let user = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`);
        // 玩家是否在房间里
        if (!user.roomId) {
            return { flag: false, code: 13002 };
        }
        let room = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${user.roomId}`);
        // 房间是否存在
        if (!room) {
            await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.roomId}`);
            return { flag: false, code: 13001 };
        }
        let seatNum = await redis_1.redisClient.hgetAsync(`${nameSpace_1.redisKeyPrefix.room}${user.roomId}${nameSpace_1.redisKeyPrefix.roomUsers}`, `${userId}`);
        // 玩家有无座位号
        if (seatNum !== '-1') {
            // 游戏是否开始
            if (room.state !== '-1') {
                return { flag: false, code: 13022 };
            }
            // 删除房间用户列表中的数据
            await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.room}${user.roomId}${nameSpace_1.redisKeyPrefix.roomUsers}`, `${userId}`);
            // 从房间椅子上移除
            await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${user.roomId}${nameSpace_1.redisKeyPrefix.chair}`, `${seatNum}`, `${-1}`);
            // 删除user上的roomId
            await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.roomId}`);
            return { flag: true, userType: 1, roomId: user.roomId };
        }
        else {
            // 删除房间用户列表中的数据
            await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.room}${user.roomId}${nameSpace_1.redisKeyPrefix.roomUsers}`, `${userId}`);
            // 删除user上的roomId
            await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.roomId}`);
            return { flag: true, userType: 0, roomId: user.roomId };
        }
    }
    /**
     * 解散房间逻辑
     * @param userId 申请解散者id
     * @param roomId 解散房间id
     */
    static async dissolveRoom(userId) {
        let user = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`);
        // 玩家是否在房间里
        if (!user.roomId) {
            return { flag: false, code: 13002 };
        }
        let roomId = user.roomId;
        let room = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`);
        // 房间是否存在
        if (!room) {
            await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.roomId}`);
            return { flag: false, code: 13001 };
        }
        // 游戏是否开始
        if (room.state === '-1') {
            // 非房主不能解散
            if (room.creatorId !== `${userId}`) {
                return { flag: false, code: 13032 };
            }
            // 将钻石返还给房主
            console.log('房间的支付类型:' + room.payType);
            if (room.payType === '0') {
                let needDaimond = await gameUitl_1.GameUitl.getRoomRate2(parseInt(room.playerNum, 0), parseInt(room.round, 0), parseInt(room.PayType, 0));
                let userDaimond = parseInt(user.diamond, 0);
                console.log('解散房间时: needDaimond = ' + needDaimond + ' ; 玩家剩余钻石: userDaimond = ' + userDaimond);
                let result = await user_1.User.updateUser({ userid: userId }, { diamond: (needDaimond + userDaimond) });
                if (result !== 1) {
                    console.log('钻石返还给房主失败!');
                    return { flag: false, code: 13031 };
                }
                await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.diamond}`, `${needDaimond + userDaimond}`);
            }
            let roomUsers = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.roomUsers}`);
            // 删除user上的roomId
            for (const key in roomUsers) {
                if (roomUsers.hasOwnProperty(key)) {
                    await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${key}`, `${userConfig_1.userConfig.roomId}`);
                }
            }
            // 删除玩家房间列表中该条房间数据
            await redis_1.redisClient.lremAsync(`${nameSpace_1.redisKeyPrefix.userRoomList}${userId}`, 1, `${roomId}`);
            // 删除房间
            await redisKeys_1.RedisKeys.delAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`);
            // 删除房间用户
            await redisKeys_1.RedisKeys.delAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.roomUsers}`);
            // 删除房间椅子表
            await redisKeys_1.RedisKeys.delAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.chair}`);
            return { flag: true, code: 0, roomId };
        }
        else {
            // todo 游戏中解散房间,发起申请 ,待测试
            let userList = [];
            let chairs = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.chair}`);
            for (const key in chairs) {
                if (chairs.hasOwnProperty(key)) {
                    if (chairs[key] !== '-1') {
                        userList.push(chairs[key]);
                    }
                }
            }
            let userData = { userId, userNick: user.usernick };
            return { flag: true, code: 1, userList, userData, roomId };
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
    static async ready(userId) {
        let user = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`);
        // 玩家是否在房间里
        if (!user.roomId) {
            return { flag: false, code: 13002 };
        }
        let roomId = user.roomId;
        let room = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`);
        // 房间是否存在
        if (!room) {
            await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.roomId}`);
            return { flag: false, code: 13001 };
        }
        // 单局游戏开始不能坐下
        if (room.state !== '-1') {
            return { flag: false, code: 13054 };
        }
        // 座位表中加入玩家,获取座位号,用户表中玩家改成坐下
        let chairs = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.chair}`);
        let seatNum = -1;
        let playerNum = 0;
        for (const key in chairs) {
            if (chairs.hasOwnProperty(key)) {
                if (seatNum === -1 && chairs[key] === '-1') {
                    seatNum = parseInt(key, 0);
                    await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.chair}`, `${seatNum}`, `${userId}`);
                    await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.roomUsers}`, `${userId}`, `${seatNum}`);
                }
                if (chairs[key] !== '-1') {
                    playerNum++;
                }
            }
        }
        console.log('玩家的座位号为: ' + seatNum + ' ; 房间里已有人数为: ' + playerNum);
        if (seatNum === -1) {
            return { flag: false, code: 13055 };
        }
        // 判断是否可以开始游戏
        let startFlag = false;
        if (room.startType !== '0' && room.startType !== '2') {
            console.log('由服务端判定开始情况!!!!!!!!!!');
            // 满足准备开始条件
            if (room.startType === '1' && `${playerNum + 1}` === room.playerNum) {
                console.log('人已满员可以开始游戏');
                startFlag = true;
            }
            if (room.startType !== '1' && `${playerNum}` === room.startType) {
                console.log(`人满${parseInt(room.startType, 0) + 1}个,可以开始游戏`);
                startFlag = true;
            }
        }
        let userData = {
            userId,
            userNick: user.userNick,
            image: user.image,
            score: 0,
            seatNum
        };
        if (startFlag) {
            return { flag: true, roomId, userData, room };
        }
        return { flag: true, roomId, userData };
    }
    /**
     * 开始游戏判断逻辑
     * @param userId 开始游戏玩家id
     */
    static async start(userId) {
        let user = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`);
        // 玩家是否存在
        if (!user) {
            return { flag: false, code: 11005 };
        }
        let roomId = user.roomId;
        let room = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`);
        // 房间是否存在
        if (!room) {
            return { flag: false, code: 13001 };
        }
        // 开始类型不为'房主开始'和'首位开始'时,不可能触发点击开始游戏
        if (room.startType !== '0' && room.startType !== '2') {
            return { flag: false, code: 13052 };
        }
        let users = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.roomUsers}`);
        let usersNum = 0;
        let firstUser = '';
        for (const key in users) {
            if (users.hasOwnProperty(key)) {
                if (users[key] !== '-1') {
                    usersNum++;
                }
                if (usersNum === 1) {
                    firstUser = key;
                }
            }
        }
        // 准备人数不满2人,不能开始
        if (usersNum < 2) {
            return { flag: false, code: 13056 };
        }
        // '房主开始',玩家不为房主
        if (room.startType === '2' && `${userId}` !== room.creatorId) {
            return { flag: false, code: 13052 };
        }
        // '首位开始',玩家不为首位玩家或房主
        if (room.startType === '0' && `${userId}` !== room.creatorId || `${userId}` !== firstUser) {
            return { flag: false, code: 13052 };
        }
        return { flag: true, room };
    }
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yb29tL3Jvb21NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMENBQTZDO0FBQzdDLDBEQUE0RDtBQUM1RCw0REFBeUQ7QUFDekQsNERBQXlEO0FBRXpELGtEQUErQztBQUMvQyxvREFBaUQ7QUFDakQsNERBQXlEO0FBQ3pELHVDQUFvQztBQUVwQyxNQUFhLFdBQVc7SUFDcEI7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWMsRUFBRSxNQUFXO1FBQ3RELG1CQUFtQjtRQUNuQixJQUFJLFdBQVcsR0FBRyxNQUFNLG1CQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN6RixJQUFJLFdBQVcsSUFBSSxXQUFXLEtBQUssRUFBRSxFQUFFO1lBQ25DLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUN2QztRQUNELElBQUksUUFBUSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNyRCxpQkFBaUI7UUFDakIsSUFBSSxRQUFRLEdBQVcsbUJBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFO1lBQzdCLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxF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