
import { Application, ChannelService } from 'pinus';
import { RoomChannelService } from '../../channelService/roomChannelService/roomChannelService';
import { redisClient } from '../../db/redis';
import { redisKeyPrefix } from '../../gameConfig/redisKeyPrefix';
import { PayType, room_1_1 } from '../../gameConfig/room';
import { GameUitl } from '../../util/gameUitl';
import { User } from '../user/user';



export class RoomManager {

    public static async createRoom(userId: number, config: number[][]) {
        let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${userId}`);
        if (user.roomlist && user.roomlist.length === 10) {
            return { code: 501, msg: "You already have 10 rooms and can't create any more" };
        }
        // todo 之后要改成从数据库生成的房间配置表获取
        let needDaimond = parseInt(PayType[config[1][3]].substr(4), 0);
        if (Number.parseInt(user.diamond, 0) < needDaimond) {
            return { code: 502, msg: 'You are short of diamonds' };
        }

        let roomId: number;
        do {
            roomId = GameUitl.generateRoomId();
        } while (await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`));
        let createTime = GameUitl.getLocalDateStr();
        console.log('roomid = ' + roomId + ' ; createTime = ' + createTime);
        let nowDiamond = Number.parseInt(user.diamond, 0)  - needDaimond;
        let result = await User.updateUser({ userid: Number.parseInt(user.userid, 0)  }, { diamond: nowDiamond });
        if (result === 0) {
            return { code: 503, msg: 'Buckling failure' };
        }

        return { code: 500 };
        // let channel = this.channelService.createChannel(roomId.toString());
        // console.log('房间管理器中房间通道为：' + channel.name);
        // let roomConfig: IRoomConfig = room_1_1(config);
        // let room = new RoomChannelService(channel);
        // this.roomList[roomId] = room;
        // room.initRoom(roomId, userId, config, roomConfig, createTime);
        // return { code: 200, roomid: room.roomId };
    }

    public async joinRoom(userId: number, roomId: number) {
        // let room = this.roomList[roomId];
        // if (!!room) {
        //     let needDaimond: number = parseInt(room.PayType.substr(4, room.PayType.length - 4));
        //     let user = userManager.getUser(userId);
        //     if (user.diamond < needDaimond) {
        //         return {
        //             code: 511,
        //             msg: 'You are short of diamonds'
        //         }
        //     }
        //     let userInfo = {
        //         userid: user.userid,
        //         usernick: user.usernick,
        //         image: user.image
        //     };
        //     let channel = room.getChannel();
        //     channel.pushMessage('onJoinRoom', userInfo);
        //     channel.add(userId);
        //     return {
        //         code: 200,
        //         data: {
        //             userlist: room.userList,
        //             onlookerlist: room.onlookerList,
        //             roomconfig: room.roomConfig
        //         }
        //     }
        // } else {
        //     return {
        //         code: 401,
        //         msg: "The room does't exist!"
        //     };
        // }
        return null;
    }
}
