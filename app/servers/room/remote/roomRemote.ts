import { Application, FrontendSession, RemoterClass } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { RoomManager } from '../../../controller/room/roomManager';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';
import socketRouter from '../../../gameConfig/socketRouterConfig';

export default function (app: Application) {
    return new RoomRemote(app);
}

declare global {
    interface UserRpc {
        room: {
            roomRemote: RemoterClass<FrontendSession, RoomRemote>;
        };
    }
}

export class RoomRemote {
    private app: Application;
    // private channelService: ChannelService;
    private globalChannelStatus: GlobalChannelServiceStatus;
    public constructor(app: Application) {
        this.app = app;
        // this.channelService = app.get('channelService');
        this.globalChannelStatus = app.get(GlobalChannelServiceStatus.PLUGIN_NAME);
    }

    // public async createRoom(configJson: IRoomConfig) {
    //     console.log('进来了');
    //     let channel = this.channelService.createChannel(configJson.roomId.toString());
    //     let room = new RoomChannelService(channel, configJson);
    //     let roomList = this.app.get(appKeyPrefix.roomList);
    //     roomList[configJson.roomId] = room;
    //     console.log('查看房间是否挂上去了:' + JSON.stringify(Object.keys(this.app.get(appKeyPrefix.roomList))));
    // }
    public async joinRoom(userId: number, roomId: number) {
        console.log('joinRoom进来了');
        let result = await RoomManager.joinRoom(userId, roomId);
        console.log('====返回的加入房间信息' + JSON.stringify(result));
        if (!result.flag) {
            return { code: result.code };
        }
        let members = this.globalChannelStatus.getMembersByChannelName('connector', `${redisKeyPrefix.room}${roomId}`);
        // { connector_1:{ channelName1: [ 'uuid_21', 'uuid_12', 'uuid_24', 'uuid_27' ] },
        // 	 connector_2: { channelName1: [ 'uuid_15', 'uuid_9', 'uuid_0', 'uuid_18' ] },
        // 	 connector_3: { channelName1: [ 'uuid_6', 'uuid_3' ] }
        console.log('加入房间== members ==: ' + JSON.stringify(members));
        for (const key in members) {
            if (members.hasOwnProperty(key)) {
                const element = members[key];
                const ishas = element[`${redisKeyPrefix.room}${roomId}`].includes(`${userId}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${userId}`, key, `${redisKeyPrefix.room}${roomId}`);
                }
            }
        }
        let userData = result.userData;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onJoinRoom}`, { userData }, `${redisKeyPrefix.room}${roomId}`);
        // let channel = this.channelService.getChannel(`${redisKeyPrefix.room}${roomId}`);
        // let userData = result.userData;
        // channel.pushMessage('onJoinRoom', { userData });
        // channel.add(`${userId}`, result.sid);
        return {
            code: 0,
            data: {
                userList: result.userList,
                onlookerList: result.onlookerList,
                roomconfig: result.roomConfig
            }
        };
    }
}
