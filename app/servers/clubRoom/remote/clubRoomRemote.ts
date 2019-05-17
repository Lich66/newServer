import { Application, ChannelService, FrontendSession, RemoterClass } from 'pinus';
import { ClubRoom } from '../../../controller/clubRoom/clubRoom';
import { User } from '../../../controller/user/user';
import { tbl_club } from '../../../models/tbl_club';
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

    public async joinClubRoom(uid: string, sid: string, roomid: string, clubid: string, flag: boolean): Promise<tbl_room> {
        const clubRoom = await ClubRoom.getClubRoom({ roomid: Number.parseInt(roomid, 0) });
        if (!clubRoom) {
            return null;
        }
        const channel = this.channelService.getChannel(roomid, flag);
        const channelUser = channel.getMember(uid);
        if (!channelUser) {
            channel.add(uid, sid);
        }
        const user = await User.getUser({ userid: Number.parseInt(uid, 0) });
        channel.pushMessage(`onEntryClubRoom:${roomid}`, { user });
        channel.pushMessage(`onEntryClub${clubid}Room`, { user });
        return clubRoom;

    }

    public async leaveClubRoom(uid: string, sid: string, roomid: string, clubid: string, flag: boolean): Promise<tbl_room> {
        const clubRoom = await ClubRoom.getClubRoom({ roomid: Number.parseInt(roomid, 0) });
        if (!clubRoom) {
            return null;
        }
        const channel = this.channelService.getChannel(roomid, flag);
        const channelUser = channel.getMember(uid);
        if (channelUser) {
            channel.leave(uid, sid);
        } else {
            return null;
        }
        const user = await User.getUser({ userid: Number.parseInt(uid, 0) });
        channel.pushMessage(`onEntryClubRoom:${roomid}`, { user });
        channel.pushMessage(`onEntryClub${clubid}Room`, { user });
        return clubRoom;

    }
}
