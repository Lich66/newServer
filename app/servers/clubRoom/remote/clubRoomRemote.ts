import { Application, FrontendSession, RemoterClass } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { ClubRoom } from '../../../controller/clubRoom/clubRoom';
import { ClubRoomState } from '../../../controller/redis/clubRoomState/clubRoomState';
import { User } from '../../../controller/user/user';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';
import socketRouter from '../../../gameConfig/socketRouterConfig';
import { IClubRoomRpc } from '../../../interface/clubRoom/clubRoomInterface';
import { tbl_room } from '../../../models/tbl_room';


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
    private globalChannelStatus: GlobalChannelServiceStatus;
    public constructor(app: Application) {
        this.app = app;
        // this.channelService = app.get('channelService');
        this.globalChannelStatus = app.get(GlobalChannelServiceStatus.PLUGIN_NAME);
    }

    public async createclub(userId: string, clubConfig: number[][]) {
        // let clubRoom = await this.clubManager.createclub(userId, clubConfig);
        // return { code: 200, data: { clubId: clubRoom.clubId } }
    }

    
}
