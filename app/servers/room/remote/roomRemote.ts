import { Application, ChannelService, FrontendSession, RemoterClass } from 'pinus';
import { RoomChannelService } from '../../../channelService/roomChannelService/roomChannelService';
import { RoomManager } from '../../../controller/room/roomManager';
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

    public async createRoom(configJson: IRoomConfig, sid: string) {
        /*{"gameType":1,"playType":1,"deskType":1,"baseScore":1,"roundCount":1,
        "payType":1,"startType":1,"pushWager":1,"maxRobBanker":1,"doubleRule":1,
        "specialCardType":"00001001","advancedOptions":"00001001","lazarilloDeTormes":1,
        "roomId":3235622,"creatorId":502,"createTime":"2019/5/17  13:53:46",
        "roomConfig":[[1,1],[1,1,1,1,1,1,1,1,9,9,1]]}
        */
       console.log('进入roomRemote了');
        let channel = this.channelService.createChannel(configJson.roomId.toString());
        console.log('产生channel了');
        let room = new RoomChannelService(channel);
        console.log('实例化room了');
        RoomManager.roomList[room.roomId] = room;
        console.log('序列化房间: ' + JSON.stringify(room));

    }

}
