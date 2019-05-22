import { Application, ChannelService, FrontendSession, RemoterClass } from 'pinus';
import { ClubRoom } from '../../../controller/clubRoom/clubRoom';
import { User } from '../../../controller/user/user';
import { redisClient } from '../../../db/redis';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';
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
    private channelService: ChannelService;
    public constructor(app: Application) {
        this.app = app;
        this.channelService = app.get('channelService');
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
        const roomChannel = this.channelService.getChannel(`${redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, clubroomrpc.flag);
        const roomChannelUser = roomChannel.getMember(`${clubroomrpc.uid}`);
        if (!roomChannelUser) {
            roomChannel.add(`${clubroomrpc.uid}`, clubroomrpc.sid);
        }
        const clubChannel = this.channelService.getChannel(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, clubroomrpc.flag);
        const clubChannelUser = clubChannel.getMember(`${clubroomrpc.uid}`);
        if (!clubChannelUser) {
            clubChannel.add(`${clubroomrpc.uid}`, clubroomrpc.sid);
        }

        const user = await User.getUser({ userid: clubroomrpc.uid });
        redisClient.hsetAsync(`${redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, `${user.userid}`, '-1');
        // clubChannel.pushMessage(`${redisKeyPrefix.club}${clubroomrpc.clubid}`, { user, action: 0 });
        roomChannel.pushMessage(`${redisKeyPrefix.clubRoom}${clubroomrpc.roomid}`, { user, action: 1 });
        return clubRoom;

    }
}
