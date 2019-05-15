
import { Application, ChannelService } from 'pinus';
import { redisClient } from '../../db/redis';
import { PayType, room_1_1 } from '../../gameConfig/room';
import { MPQZRoom } from '../../gameModels/mpqzRoom';
import { IRoomConfig } from '../../interface/room/roomInterfaces';


export class RoomManager {

    public roomList = {};
    private channelService: ChannelService;
    private app: Application;
    public constructor(channelService: ChannelService, app: Application) {
        this.channelService = channelService;
        this.app = app;
    }

    /**
     * 获取7位的房间ID
     */
    public generateRoomId(): number {
        let roomId = '';
        for (let i = 0; i < 7; ++i) {
            roomId += Math.floor(Math.random() * 10);
        }
        return parseInt(roomId, 0);
    }

    /**
     * 获取本地时间
     * @returns string    xxxx.xx.xx xx:xx:xx
     */
    public getLocalDateStr(): string {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let dateStr = year + '.' + month + '.' + day + '  ' + hours + ':' + minutes + ':' + seconds;
        return dateStr;
    }

    public async createRoom(userId: number, config: number[][]) {
        let user = await redisClient.getAsync(`'user:'${userId}`);
        console.log('1创建房间时获取到的玩家信息:' + JSON.stringify(user));
        console.log('2创建房间时获取到的玩家信息:' + JSON.stringify(user.userid));
        if (user.roomlist.length === 10) {
            return { code: 501, msg: "You already have 10 rooms and can't create any more" };
        }
        // todo 之后要改成从数据库生成的房间配置表获取
        let needDaimond = parseInt(PayType[config[1][3]], 0);
        if (user.diamond < needDaimond) {
            return { code: 502, msg: 'You are short of diamonds' };
        }
        let roomId: number;
        {
            roomId = this.generateRoomId();
        } while (this.roomList[roomId]);
        let createTime = this.getLocalDateStr();
        let channel = this.channelService.createChannel(roomId.toString());
        console.log('房间管理器中房间通道为：' + channel.name);
        let roomConfig: IRoomConfig = room_1_1(config);
        let room = new MPQZRoom(channel);
        this.roomList[roomId] = room;
        room.initRoom(roomId, userId, config, roomConfig, createTime);
        return { code: 200, roomid: room.roomId };
    }

    public async joinRoom(userId: number, roomId: number) {
        // let room = this.roomList[roomId];
        // if (!!room) {
        //     let needDaimond: number = parseInt(room.PayType.substr(4, room.PayType.length - 4));
        //     let user = userManager.getUser(userId);
        //     if (user.diamond < needDaimond) {
        //         return {
        //             code: 503,
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
