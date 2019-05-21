
import { Application, ChannelService } from 'pinus';
import { redisClient } from '../../db/redis';
import { redisKeyPrefix } from '../../gameConfig/redisKeyPrefix';
import { PayType, room_0_0 } from '../../gameConfig/room';
import { RoomConfig } from '../../gameConfig/roomConfig';
import { GameUitl } from '../../util/gameUitl';
import { User } from '../user/user';



export class RoomManager {

    public roomList = {};

    public static async createRoom(userId: number, config: Array<number | string>) {
        // 先判断玩家的房间数是否超过10个
        let roomListLen = await redisClient.llenAsync(`${redisKeyPrefix.userRoomList}${userId}`);
        if (roomListLen && roomListLen === 10) {
            return { flag: false, code: 12002 };
        }
        let userData = await User.getUser({ userid: userId });
        console.log('获取数据库的信息为:' + JSON.stringify(userData));
        // 再判断玩家的钻石是否足够; config[4]代表房费, >2表示支付方式为房主支付
        let needDaimond: number;
        if (config[4] > 2) {
            needDaimond = parseInt(RoomConfig.payType[config[4]], 0);
            if (userData.diamond < needDaimond) {
                return { flag: false, code: 12001 };
            }
        }
        // 生成房间号
        let roomId: number;
        do {
            roomId = GameUitl.generateRoomId();
        } while (await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`));
        let createTime = GameUitl.getLocalDateStr();
        console.log('roomid = ' + roomId + ' ; createTime = ' + createTime);
        // 更改数据库及redis玩家钻石数
        let nowDiamond = userData.diamond - needDaimond;
         let result = await User.updateUser({ userid: userId }, { diamond: nowDiamond });
        if (result === 0) {
            return { flag: false, code: 12003 };
        }
        await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, 'diamond', nowDiamond.toString());
        console.log('改变后redis的钻石数' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`)));        
      
        // let json1 = room_0_0(config);
        // console.log('转义后的房间配置信息: ' + json1);
        // let json2 = {
        //     roomId,
        //     creatorId: userId,
        //     createTime,
        //     roomConfig: config
        // };
        // let roomConfig = SelfUtils.assign(json1, json2);
        // console.log('合并后的房间配置: ' + JSON.stringify(roomConfig));
        // for (let key in roomConfig) {
        //     if (roomConfig.hasOwnProperty(key)) {
        //         await redisClient.hsetAsync(`${redisKeyPrefix.room}${roomId}`, key, roomConfig[key]);
        //     }
        // }
        // console.log('从redis捞出来的roomConfig = ' + JSON.stringify(await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`)));
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
