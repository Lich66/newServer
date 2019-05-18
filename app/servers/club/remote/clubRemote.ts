import { Application, ChannelService, FrontendSession, RemoterClass } from 'pinus';
import { Club } from '../../../controller/club/club';
import { User } from '../../../controller/user/user';
import { redisKeyPrefix } from '../../../gameConfig/redisKeyPrefix';
import { IClubRpc } from '../../../interface/club/remote/clubInterface';
import { tbl_club } from '../../../models/tbl_club';
import { tbl_user } from '../../../models/tbl_user';
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

    public async joinClub(clubrpc: IClubRpc): Promise<tbl_club> {
        const club = await Club.getClub({ clubid: clubrpc.clubid, uid: clubrpc.uid });
        if (!club) {
            return null;
        }
        const channel = this.channelService.getChannel(`${redisKeyPrefix.club}${clubrpc.clubid}`, clubrpc.flag);
        const channelUser = channel.getMember(`${clubrpc.uid}`);
        if (!channelUser) {
            channel.add(`${clubrpc.uid}`, clubrpc.sid);
        }
        // redisClient.getAsync
        const user = await User.getUser({ userid: clubrpc.uid });
        channel.pushMessage(`${redisKeyPrefix.club}${clubrpc.clubid}`, { user, action: 1 });
        return club;

    }


    public async leaveClub(clubrpc: IClubRpc): Promise<tbl_user> {
        const channel = this.channelService.getChannel(`${redisKeyPrefix.club}${clubrpc.clubid}`, clubrpc.flag);
        const channelUser = channel.getMember(`${clubrpc.uid}`);
        if (channelUser) {
            channel.leave(`${clubrpc.uid}`, clubrpc.sid);
        }
        // redisClient.getAsync
        const user = await User.getUser({ userid: clubrpc.uid });
        channel.pushMessage(`${redisKeyPrefix.club}${clubrpc.clubid}`, { user, action: 0 });
        return user;
    }

}
