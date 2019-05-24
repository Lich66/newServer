import { Application, ChannelService, FrontendSession, RemoterClass } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { ClubRoom } from '../../../controller/clubRoom/clubRoom';
import { User } from '../../../controller/user/user';
import { redisClient } from '../../../db/redis';
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

    public async joinClubRoom(clubroomrpc: IClubRoomRpc): Promise<tbl_room> {
        const clubRoom = await ClubRoom.getClubRoom({ roomid: clubroomrpc.roomid });
        if (!clubRoom) {
            return null;
        }
        const clubChannel = await this.globalChannelStatus.getMembersByChannelName('connector', `${redisKeyPrefix.club}${clubroomrpc.clubid}`);
        for (const key in clubChannel) {
            if (clubChannel.hasOwnProperty(key)) {
                const element = clubChannel[key];
                const ishas = element[`${redisKeyPrefix.club}${clubroomrpc.clubid}`].includes(`${clubroomrpc.uid}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${clubroomrpc.uid}`, key, `${redisKeyPrefix.club}${clubroomrpc.clubid}`);
                }
            }
        }

        const roomChannel = await this.globalChannelStatus.getMembersByChannelName('connector', `${redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`);
        for (const key in roomChannel) {
            if (roomChannel.hasOwnProperty(key)) {
                const element = roomChannel[key];
                const ishas = element[`${redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`].includes(`${clubroomrpc.uid}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${clubroomrpc.uid}`, key, `${redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`);
                }
            }
        }
        const user = await User.getUser({ userid: clubroomrpc.uid });
        // 发送到房间
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onEntryClubRoom}`, { user }, `${redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`);
        // 发送到大厅
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onEntryClubRoom}`, { user, roomid: clubroomrpc.roomid }, `${redisKeyPrefix.club}${clubroomrpc.clubid}`);

        redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, `${user.userid}`, '-1');

        return clubRoom;

    }
}
