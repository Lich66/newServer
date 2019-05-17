import { Application, ChannelService, FrontendSession, RemoterClass } from 'pinus';
import { Club } from '../../../controller/club/club';
import { User } from '../../../controller/user/user';
import { tbl_club } from '../../../models/tbl_club';
// import { redisClient } from '../../../db/redis';


export default function (app: Application) {
    return new ClubRemote(app);
}

declare global {
    interface UserRpc {
        club: {
            clubRemote: RemoterClass<FrontendSession, ClubRemote>;
        };
    }
}

export class ClubRemote {
    private app: Application;
    private channelService: ChannelService;
    public constructor(app: Application) {
        this.app = app;
        this.channelService = app.get('channelService');
    }

    public async createclub(userId: string, clubConfig: number[][]) {
        // let club = await this.clubManager.createclub(userId, clubConfig);
        // return { code: 200, data: { clubId: club.clubId } }
    }

    public async joinClub(uid: string, sid: string, clubid: string, flag: boolean): Promise<tbl_club> {
        const club = await Club.getClub({ clubid: Number.parseInt(clubid, 0) });
        if (!club) {
            return null;
        }
        const channel = this.channelService.getChannel(clubid, flag);
        const channelUser = channel.getMember(uid);
        if (!channelUser) {
            channel.add(uid, sid);
        }
        // redisClient.getAsync
        const user = await User.getUser({ userid: Number.parseInt(uid, 0) });
        channel.pushMessage(`onEntryClub:${clubid}`, { user });
        return club;

    }


    public async leaveClub(uid: string, sid: string, clubid: string, flag: boolean): Promise<tbl_club> {
        const club = await Club.getClub({ clubid: Number.parseInt(clubid, 0) });
        if (!club) {
            return null;
        }
        const channel = this.channelService.getChannel(clubid, flag);
        const channelUser = channel.getMember(uid);
        if (channelUser) {
            channel.leave(uid, sid);
        } else {
            return null;
        }
        const user = await User.getUser({ userid: Number.parseInt(uid, 0) });
        channel.pushMessage(`onEntryClub:${clubid}`, { user });
        return club;
    }

}
