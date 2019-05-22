import { Application, ChannelService, FrontendSession, RemoterClass } from 'pinus';

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

    public async createRoom(roomId: number) {
        /*{"gameType":1,"playType":1,"deskType":1,"baseScore":1,"roundCount":1,
        "payType":1,"startType":1,"pushWager":1,"maxRobBanker":1,"doubleRule":1,
        "specialCardType":"00001001","advancedOptions":"00001001","lazarilloDeTormes":1,
        "roomId":3235622,"creatorId":502,"createTime":"2019/5/17  13:53:46",
        "roomConfig":[[1,1],[1,1,1,1,1,1,1,1,9,9,1]]}
        */
        let channel = this.channelService.createChannel(roomId.toString());
        
    }

}
