
import { Application, ChannelService } from 'pinus';
import { redisClient } from '../../db/redis';
import { redisKeyPrefix } from '../../gameConfig/nameSpace';
import { RoomConfig } from '../../gameConfig/roomConfig';
import { IRoomConfig } from '../../interface/room/roomInterfaces';
import { GameUitl } from '../../util/gameUitl';
import { SelfUtils } from '../../util/selfUtils';
import { User } from '../user/user';



export class RoomManager {

    public static roomList = {};

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
        let createTime = GameUitl.getLocalDateStr();
        console.log('roomid = ' + roomId + ' ; createTime = ' + createTime);
        // 更改数据库及redis玩家钻石数
        let nowDiamond = userData.diamond - roomRate;
        let result = await User.updateUser({ userid: userId }, { diamond: nowDiamond });
        if (result === 0) {
            return { flag: false, code: 12003 };
        }
        // console.log('修改redis之前的数据情况:' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));
        await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, 'diamond', nowDiamond.toString());
        // console.log('修改redis之后的数据情况:' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));

        // 解析房间配置信息
        let json1 = await GameUitl.parsePRoomConfig(config);
        let json2 = {
            roomId,
            creatorId: userId,
            createTime,
            roomConfig: config
        };
        let json: IRoomConfig = SelfUtils.assign(json1, json2);
        console.log('合并后的房间配置: ' + JSON.stringify(json));
        return { flag: true, roomId, json };
    }

    public static async joinRoom(userId: number, roomId: number) {
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
