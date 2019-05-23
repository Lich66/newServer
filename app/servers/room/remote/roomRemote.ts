import { Application, ChannelService, FrontendSession, RemoterClass } from 'pinus';
import { RoomChannelService } from '../../../channelService/roomChannelService/roomChannelService';
import { RoomManager } from '../../../controller/room/roomManager';
import { appKeyPrefix } from '../../../gameConfig/nameSpace';
import { IRoomConfig } from '../../../interface/room/roomInterfaces';

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
    private channelService: ChannelService;
    public constructor(app: Application) {
        this.app = app;
        this.channelService = app.get('channelService');
    }

    // public async createRoom(configJson: IRoomConfig) {
    //     console.log('进来了');
    //     let channel = this.channelService.createChannel(configJson.roomId.toString());
    //     let room = new RoomChannelService(channel, configJson);
    //     let roomList = this.app.get(appKeyPrefix.roomList);
    //     roomList[configJson.roomId] = room;
    //     console.log('查看房间是否挂上去了:' + JSON.stringify(Object.keys(this.app.get(appKeyPrefix.roomList))));
    // }
    public async joinRoom(userId: number, roomId: number, sid: string) {
        console.log('joinRoom进来了');
        let result = await RoomManager.joinRoom(userId, roomId, sid, this.app);
        console.log('====返回的加入房间信息' + JSON.stringify(result));
        return result;
        // let roomList = await this.app.get(appKeyPrefix.roomList);
        // console.log('roomRemote查看房间是否挂上去了:' + JSON.stringify(Object.keys(roomList)));
    }
}
