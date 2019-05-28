import { Application, FrontendSession, RemoterClass } from 'pinus';


export default function (app: Application) {
    return new ClubRoomRemote(app);
}

declare global {
    interface UserRpc {
        clubRoom: {
            clubRoomRemote: RemoterClass<FrontendSession, ClubRoomRemote>;
        };
    }
}

export class ClubRoomRemote {
    private app: Application;
    // private channelService: ChannelService;
    public constructor(app: Application) {
        this.app = app;
        // this.channelService = app.get('channelService');
    }

    public async createclub(userId: string, clubConfig: number[][]) {
        // let clubRoom = await this.clubManager.createclub(userId, clubConfig);
        // return { code: 200, data: { clubId: clubRoom.clubId } }
    }

    
}
