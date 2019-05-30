
import { redisClient } from '../../db/redis';
import { redisKeyPrefix } from '../../gameConfig/nameSpace';
import { RoomFields } from '../../gameConfig/roomConfig';
import { userConfig } from '../../gameConfig/userConfig';
import { IRoomConfig } from '../../interface/room/roomInterfaces';
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
            state: 0,
            roomId,
            creatorId: userId,
            roomConfig: JSON.stringify(config),
            createTime: (new Date()).valueOf(),
            onlookerList: JSON.stringify([]),
            userList: JSON.stringify([])
        };
        let json: IRoomConfig = SelfUtils.assign(json2, json1);
        console.log('合并后的房间配置: ' + JSON.stringify(json));
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                await redisClient.hsetAsync(`${redisKeyPrefix.room}${json.roomId}`, key, `${json[key]}`);
            }
        }
        await redisClient.rpushAsync(`${redisKeyPrefix.userRoomList}${userId}`, `${roomId}`);
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
        if (room.state === '1' && room.halfWayAdd === '1') {
            return { flag: false, code: 12015 };
        }
        let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
        // 判断玩家的房卡是否足够
        let needDaimond = GameUitl.getRoomRate2(parseInt(room.playerNum, 0), parseInt(room.round, 0), parseInt(room.PayType, 0));
        if (parseInt(room.PayType, 0) === 1) {
            if (parseInt(user.diamond, 0) < needDaimond) {
                return { flag: false, code: 12011 };
            }
        } else {
            if (parseInt(room.creatorId, 0) === userId) {
                if (parseInt(user.diamond, 0) < needDaimond) {
                    return { flag: false, code: 12011 };
                }
            }
        }
        let userData = {
            userNick: user.usernick,
            userId: user.userid,
            image: user.image
        };
        let userList = JSON.parse(room.userList);
        let onlookerList = JSON.parse(room.onlookerList);
        let roomConfig = JSON.parse(room.roomConfig);
        onlookerList.push(userData);
        let onlookerListStr = JSON.stringify(onlookerList);
        await redisClient.hsetAsync(`${redisKeyPrefix.room}${roomId}`, `${RoomFields.onlookerList}`, onlookerListStr);
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
     * 离开房间逻辑
     * @param userId 离开者id 
     * @param roomId 离开房间id
     */
    public static async leaveRoom(userId: number, roomId: number) {
        let room = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
        // 房间是否存在
        if (!room) {
            return { flag: false, code: 13001 };
        }
        let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
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
                if (i.userid === userId) {
                    userList.splice(index, 1);
                    break;
                }
                index++;
                // console.log('看看for-of能不能被break退出' + index);
            }
            await redisClient.hsetAsync(`${redisKeyPrefix.room}${roomId}`, `${RoomFields.userList}`, JSON.stringify(userList));
            await redisClient.hdelAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.roomId}`);
            await redisClient.hdelAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.seatNum}`);
            return { flag: true, userType: 1 };
        } else {
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
            await redisClient.hsetAsync(`${redisKeyPrefix.room}${roomId}`, `${RoomFields.onlookerList}`, JSON.stringify(onlookerList));
            await redisClient.hdelAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.roomId}`);
            return { flag: true, userType: 0 };
        }
    }

    /**
     * 获取房间里的所有玩家
     * @param roomId 房间id
     */
    public static async getPlayerListForRoom(roomId: number) {
        let room = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
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
    public static async getGamingPlayerListForRoom(roomId: number) {
        let room = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
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
    public static async dissolveRoom(userId: number, roomId: number) {
        let room = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
        // 房间是否存在
        if (!room) {
            return { flag: false, code: 13001 };
        }
        let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
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
                await redisClient.hdelAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.roomId}`);
            }
            for (const iterator of result.userList) {
                await redisClient.hdelAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.roomId}`);
                await redisClient.hdelAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.seatNum}`);
            }
            await redisClient.lremAsync(`${redisKeyPrefix.userRoomList}${userId}`, 1, `${roomId}`);
            await RedisKeys.delAsync(`${redisKeyPrefix.room}${roomId}`);
            return { flag: true, code: 0, players: result };
        } else {
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
    public static async optionOfDestoryRoom(userId: number) {
        // todo 打算解散房间的操作放在game中
    }
}
