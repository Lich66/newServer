
import { Application, ChannelService } from 'pinus';
import { redisClient } from '../../db/redis';
import { appKeyPrefix, redisKeyPrefix } from '../../gameConfig/nameSpace';
import { RoomConfig, RoomFields } from '../../gameConfig/roomConfig';
import { IRoomConfig } from '../../interface/room/roomInterfaces';
import { GameUitl } from '../../util/gameUitl';
import { SelfUtils } from '../../util/selfUtils';
import { User } from '../user/user';



export class RoomManager {

    public static roomList = {};

    public static async createRoom(userId: number, config: any) {
        // 先判断玩家的房间数是否超过10个
        let roomListLen = await redisClient.llenAsync(`${redisKeyPrefix.user}${userId}${redisKeyPrefix.userRoomList}${userId}`);
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
            roomId,
            creatorId: userId,
            roomConfig: JSON.stringify(config),
            createTime: (new Date()).valueOf(),
            onlookerList: JSON.stringify([]),
            userList: JSON.stringify([])
        };
        let json: IRoomConfig = SelfUtils.assign(json1, json2);
        console.log('合并后的房间配置: ' + JSON.stringify(json));
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                await redisClient.hsetAsync(`${redisKeyPrefix.room}${json.roomId}`, key, `${json[key]}`);
            }
        }
        await redisClient.rpushAsync(`${redisKeyPrefix.user}${userId}${redisKeyPrefix.userRoomList}${userId}`, `${roomId}`);
        return { flag: true, json };
    }

    public static async joinRoom(userId: number, roomId: number) {
        let room = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
        // let roomList = app.get(appKeyPrefix.roomList);
        // console.log('挂在APP上的房间有:' + JSON.stringify(Object.keys(roomList)));
        // let room = roomList[roomId];
        console.log('获取到的room' + JSON.stringify(room.roomId));

        if (!room) {
            return { flag: false, code: 12013 };
        }
        // let roomConfig = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
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
            userID: user.userid,
            image: user.image
        };
        let userList = JSON.parse(room.userList);
        let onlookerList = JSON.parse(room.onlookerList);
        let roomConfig = JSON.parse(room.roomConfig);
        onlookerList.push(userData);
        let onlookerListStr = JSON.stringify(onlookerList);
        await redisClient.hsetAsync(`${redisKeyPrefix.room}${roomId}`, `${RoomFields.onlookerList}`, onlookerListStr);
        return {
            flag: true,
            userData,
            userList,
            onlookerList,
            roomConfig
        };
    }
}
