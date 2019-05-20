
import { Application, ChannelService } from 'pinus';
import { RoomChannelService } from '../../channelService/roomChannelService/roomChannelService';
import { redisClient } from '../../db/redis';
import { redisKeyPrefix } from '../../gameConfig/redisKeyPrefix';
import { PayType, room_0_0 } from '../../gameConfig/room';
import { GameUitl } from '../../util/gameUitl';
import { SelfUtils } from '../../util/selfUtils';
import { User } from '../user/user';



export class RoomManager {

    public roomList = {};

    public static async createRoom(userId: number, config: number[][]) {
        let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
        if (user.roomlist && user.roomlist.length === 10) {
            return { flag: false, code: 501, msg: "You already have 10 rooms and can't create any more" };
        }
        // todo 之后要改成从数据库生成的房间配置表获取
        let needDaimond = parseInt(PayType[config[1][3]].substr(4), 0);
        if (Number.parseInt(user.diamond, 0) < needDaimond) {
            return { flag: false, code: 502, msg: 'You are short of diamonds' };
        }

        let roomId: number;
        do {
            roomId = GameUitl.generateRoomId();
        } while (await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`));
        let createTime = GameUitl.getLocalDateStr();
        console.log('roomid = ' + roomId + ' ; createTime = ' + createTime);
        let nowDiamond = Number.parseInt(user.diamond, 0) - needDaimond;
        let result = await User.updateUser({ userid: Number.parseInt(user.userid, 0) }, { diamond: nowDiamond });
        if (result === 0) {
            return { flag: false, code: 503, msg: 'database deduction failed' };
        }
        await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, 'diamond', nowDiamond.toString());
        console.log('改变后redis的钻石数' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));
        let json1 = room_0_0(config);
        console.log('转义后的房间配置信息: ' + json1);
        let json2 = {
            roomId,
            creatorId: userId,
            createTime,
            roomConfig: config
        };
        let roomConfig = SelfUtils.assign(json1, json2);
        console.log('合并后的房间配置: ' + JSON.stringify(roomConfig));
        for (let key in roomConfig) {
            if (roomConfig.hasOwnProperty(key)) {
                await redisClient.hsetAsync(`${redisKeyPrefix.room}${roomId}`, key, roomConfig[key]);
            }
        }
        console.log('从redis捞出来的roomConfig = ' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`)));
        return { flag: true, roomId };
    }

    public static async joinRoom(userId: number, roomId: number) {
        let roomConfig = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
        let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
        // 如果是房间是AA类型,则需要判断玩家的房卡是否足够
        if (PayType[parseInt(roomConfig.playType, 0)].substr(0, 2) === 'AA') {
            let needDaimond = parseInt(PayType[parseInt(roomConfig.playType, 0)].substr(4), 0);
            if (parseInt(user.diamond, 0) < needDaimond) {
                return { flag: false, code: 511, msg: 'You are short of diamonds' };
            }
        }
        let num: number[][] = [[], []];
        let numstr: string[] = roomConfig.roomConfig.split(',');
        console.log('..................拆分出来的' + JSON.stringify(numstr));
        numstr.forEach((value, i) => {
            if (i < 2) {
                num[0][i] = parseInt(value, 0);
            } else {
                num[1][i - 2] = parseInt(value, 0);
            }
        });
        console.log('..................解析出来的' + JSON.stringify(num));
        // todo 从redis上拉取房间里的玩家列表和观战玩家列表 
        const userList: string[] = [];
        const onlookerList: string[] = [];
        return { flag: true, roomConfig: num, userList, onlookerList };
    }
}
