
import { redisClient } from '../../db/redis';
import { redisKeyPrefix } from '../../gameConfig/nameSpace';
import { RoomFields } from '../../gameConfig/roomConfig';
import { userConfig } from '../../gameConfig/userConfig';
import { IRoomRedis } from '../../interface/room/roomInterfaces';
import { GameUitl } from '../../util/gameUitl';
import { SelfUtils } from '../../util/selfUtils';
import { RedisKeys } from '../redis/redisKeys/redisKeys';
import { User } from '../user/user';

export class RoomManager {
    /**
     * 创建房间逻辑
     * @param userId 创建者id
     * @param config 房间配置信息
     */
    public static async createRoom(userId: number, config: any) {
        // 先判断玩家的房间数是否超过10个
        let roomListLen = await redisClient.llenAsync(`${redisKeyPrefix.userRoomList}${userId}`);
        if (roomListLen && roomListLen === 10) {
            return { flag: false, code: 12002 };
        }
        let userData = await User.getUser({ userid: userId });
        console.log('获取数据库的信息为:' + JSON.stringify(userData));
        // 再判断玩家的钻石是否足够; 
        let roomRate: number = GameUitl.getRoomRate1(config[1], config[3], config[4]);
        if (userData.diamond < roomRate) {
            return { flag: false, code: 12001 };
        }
        // 生成房间号
        let roomId: number;
        do {
            roomId = GameUitl.generateRoomId();
        } while (await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`));
        // 更改数据库及redis玩家钻石数
        if (config[4] === 0) {
            let nowDiamond = userData.diamond - roomRate;
            let result = await User.updateUser({ userid: userId }, { diamond: nowDiamond });
            if (result === 0) {
                return { flag: false, code: 12003 };
            }
            // console.log('修改redis之前的数据情况:' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));
            await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, 'diamond', nowDiamond.toString());
            // console.log('修改redis之后的数据情况:' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));
        }

        // 解析房间配置信息
        let json1 = await GameUitl.parsePRoomConfig(config);
        let json2 = {
            state: -1,
            roomId,
            creatorId: userId,
            roomConfig: JSON.stringify(config),
            createTime: (new Date()).valueOf()
        };
        let json: IRoomRedis = SelfUtils.assign(json2, json1);
        console.log('合并后的房间配置: ' + JSON.stringify(json));
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                await redisClient.hsetAsync(`${redisKeyPrefix.room}${json.roomId}`, key, `${json[key]}`);
            }
        }
        await redisClient.rpushAsync(`${redisKeyPrefix.userRoomList}${userId}`, `${roomId}`);
        for (let i = 0, len = parseInt(json.playerNum, 0); i < len; i++) {
            await redisClient.hsetAsync(`${redisKeyPrefix.room}${json.roomId}${redisKeyPrefix.chair}`, `${i}`, `${-1}`);
        }
        return { flag: true, json };
    }

    /**
     * 加入房间逻辑
     * @param userId 加入者id
     * @param roomId 房间id
     */
    public static async joinRoom(userId: number, roomId: number) {
        let room = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
        if (!room) {
            return { flag: false, code: 12013 };
        }
        console.log('获取到的room' + JSON.stringify(room.roomId));
        // 游戏开始是否禁入
        if (room.state !== '-1' && room.halfWayAdd === '1') {
            return { flag: false, code: 12015 };
        }
        let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
        // 判断玩家的房卡是否足够
        if (parseInt(room.PayType, 0) === 1) {
            let needDaimond = GameUitl.getRoomRate2(parseInt(room.playerNum, 0), parseInt(room.round, 0), parseInt(room.PayType, 0));
            if (parseInt(user.diamond, 0) < needDaimond) {
                return { flag: false, code: 12011 };
            }
        }
        let userData = {
            userNick: user.usernick,
            userId: user.userid,
            image: user.image
        };
        await redisClient.hsetAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.roomUsers}`, `${userId}`, `${-1}`);
        let roomUsers = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.roomUsers}`);
        let userList = [];
        let onlookerList = [];
        for (const key in roomUsers) {
            if (roomUsers.hasOwnProperty(key)) {
                let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${key}`);
                if (roomUsers[key] !== '-1') {
                    userList.push({
                        userId: user.userid,
                        userNick: user.usernick,
                        image: user.image,
                        score: user.score,
                        seatNum: parseInt(roomUsers[key], 0)
                    });
                } else {
                    onlookerList.push({
                        userId: user.userid,
                        userNick: user.usernick,
                        image: user.image
                    });
                }

            }
        }
        let roomConfig = JSON.parse(room.roomConfig);
        await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.roomId}`, `${roomId}`);
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
    public static async getRoomServerId(roomId: number): Promise<string> {
        return await redisClient.hgetAsync(`${redisKeyPrefix.room}${roomId}`, 'sid');
    }

    /**
     * 设置房间服务器id
     * @param roomId 房间id
     * @param sid 服务器id
     */
    public static async setRoomServerId(roomId: number, sid: string): Promise<number> {
        return await redisClient.hsetAsync(`${redisKeyPrefix.room}${roomId}`, 'sid', sid);
    }

    /**
     * 坐下玩家判断逻辑
     * @param userId 发送者id
     */
    public static async isSittingUser(userId: number) {
        let roomId = await redisClient.hgetAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.roomId}`);
        if (!roomId) {
            return { flag: false, code: 13002 };
        }
        let seatNum = await redisClient.hgetAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.roomUsers}`, `${userId}`);
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
    public static async stageProperty(userId: number, receiverId: number) {
        // 发送者是否坐下
        let result1 = await RoomManager.isSittingUser(userId);
        if (!result1.flag) {
            return result1;
        }
        // 是否禁用道具
        let itemUse = await redisClient.hgetAsync(`${redisKeyPrefix.room}${result1.roomId}`, `${RoomFields.itemUse}`);
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
    public static async leaveRoom(userId: number) {
        let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
        // 玩家是否在房间里
        if (!user.roomId) {
            return { flag: false, code: 13002 };
        }
        let room = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${user.roomId}`);
        // 房间是否存在
        if (!room) {
            await redisClient.hdelAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.roomId}`);
            return { flag: false, code: 13001 };
        }
        let seatNum = await redisClient.hgetAsync(`${redisKeyPrefix.room}${user.roomId}${redisKeyPrefix.roomUsers}`, `${userId}`);
        // 玩家有无座位号
        if (seatNum !== '-1') {
            // 游戏是否开始
            if (room.state !== '-1') {
                return { flag: false, code: 13022 };
            }
            // 删除房间用户列表中的数据
            await redisClient.hdelAsync(`${redisKeyPrefix.room}${user.roomId}${redisKeyPrefix.roomUsers}`, `${userId}`);
            // 从房间椅子上移除
            await redisClient.hsetAsync(`${redisKeyPrefix.room}${user.roomId}${redisKeyPrefix.chair}`, `${seatNum}`, `${-1}`);
            // 删除user上的roomId
            await redisClient.hdelAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.roomId}`);
            return { flag: true, userType: 1, roomId: user.roomId };
        } else {
            // 删除房间用户列表中的数据
            await redisClient.hdelAsync(`${redisKeyPrefix.room}${user.roomId}${redisKeyPrefix.roomUsers}`, `${userId}`);
            // 删除user上的roomId
            await redisClient.hdelAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.roomId}`);
            return { flag: true, userType: 0, roomId: user.roomId };
        }
    }

    /**
     * 解散房间逻辑
     * @param userId 申请解散者id
     * @param roomId 解散房间id
     */
    public static async dissolveRoom(userId: number) {
        let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
        // 玩家是否在房间里
        if (!user.roomId) {
            return { flag: false, code: 13002 };
        }
        let roomId = user.roomId;
        let room = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
        // 房间是否存在
        if (!room) {
            await redisClient.hdelAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.roomId}`);
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
                let needDaimond = await GameUitl.getRoomRate2(parseInt(room.playerNum, 0), parseInt(room.round, 0), parseInt(room.PayType, 0));
                let userDaimond = parseInt(user.diamond, 0);
                console.log('解散房间时: needDaimond = ' + needDaimond + ' ; 玩家剩余钻石: userDaimond = ' + userDaimond);
                let result = await User.updateUser({ userid: userId }, { diamond: (needDaimond + userDaimond) });
                if (result !== 1) {
                    console.log('钻石返还给房主失败!');
                    return { flag: false, code: 13031 };
                }
                await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.diamond}`, `${needDaimond + userDaimond}`);
            }
            let roomUsers = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.roomUsers}`);
            // 删除user上的roomId
            for (const key in roomUsers) {
                if (roomUsers.hasOwnProperty(key)) {
                    await redisClient.hdelAsync(`${redisKeyPrefix.user}${key}`, `${userConfig.roomId}`);
                }
            }
            // 删除玩家房间列表中该条房间数据
            await redisClient.lremAsync(`${redisKeyPrefix.userRoomList}${userId}`, 1, `${roomId}`);
            // 删除房间
            await RedisKeys.delAsync(`${redisKeyPrefix.room}${roomId}`);
            // 删除房间用户
            await RedisKeys.delAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.roomUsers}`);
            // 删除房间椅子表
            await RedisKeys.delAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.chair}`);
            return { flag: true, code: 0, roomId };
        } else {
            // todo 游戏中解散房间,发起申请 ,待测试
            let userList = [];
            let chairs = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.chair}`);
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
    public static async optionOfDestoryRoom(userId: number) {
        // todo 打算解散房间的操作放在game中
    }

    public static async getSeatNum(playerNum: number, playerList) {
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
    public static async ready(userId: number) {
        let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
        // 玩家是否在房间里
        if (!user.roomId) {
            return { flag: false, code: 13002 };
        }
        let roomId = user.roomId;
        let room = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
        // 房间是否存在
        if (!room) {
            await redisClient.hdelAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.roomId}`);
            return { flag: false, code: 13001 };
        }

        // 单局游戏开始不能坐下
        if (room.state !== '-1') {
            return { flag: false, code: 13054 };
        }
        // 座位表中加入玩家,获取座位号,用户表中玩家改成坐下
        let chairs = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.chair}`);
        let seatNum = -1;
        let playerNum = 0;
        for (const key in chairs) {
            if (chairs.hasOwnProperty(key)) {
                if (seatNum === -1 && chairs[key] === '-1') {
                    seatNum = parseInt(key, 0);
                    await redisClient.hsetAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.chair}`, `${seatNum}`, `${userId}`);
                    await redisClient.hsetAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.roomUsers}`, `${userId}`, `${seatNum}`);
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
    public static async start(userId: number) {
        let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
        // 玩家是否存在
        if (!user) {
            return { flag: false, code: 11005 };
        }
        let roomId = user.roomId;
        let room = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
        // 房间是否存在
        if (!room) {
            return { flag: false, code: 13001 };
        }
        // 开始类型不为'房主开始'和'首位开始'时,不可能触发点击开始游戏
        if (room.startType !== '0' && room.startType !== '2') {
            return { flag: false, code: 13052 };
        }
        let users = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.roomUsers}`);
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
