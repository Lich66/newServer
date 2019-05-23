import { Application, ChannelService, FrontendSession, RemoterClass } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { Club } from '../../../controller/club/club';
import { User } from '../../../controller/user/user';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';
import socketRouter from '../../../gameConfig/socketRouterConfig';
import { IClubRpc } from '../../../interface/club/clubInterface';
import { tbl_club } from '../../../models/tbl_club';



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
    private globalChannelStatus: GlobalChannelServiceStatus;
    public constructor(app: Application) {
        this.app = app;
        this.globalChannelStatus = app.get(GlobalChannelServiceStatus.PLUGIN_NAME);
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
        // console.log('*******************************');
        // console.log(this.app.getServerId());

        // 某对象的整体事件
        const userstate = await this.globalChannelStatus.getMembersByChannelName('connector', `${redisKeyPrefix.club}${clubrpc.clubid}`);
        // // { connector_1:{ channelName1: [ 'uuid_21', 'uuid_12', 'uuid_24', 'uuid_27' ] },
        // // 							connector_2: { channelName1: [ 'uuid_15', 'uuid_9', 'uuid_0', 'uuid_18' ] },
        // // 							 connector_3: { channelName1: [ 'uuid_6', 'uuid_3' ] }
        // this.app.ge
        for (const key in userstate) {
            if (userstate.hasOwnProperty(key)) {
                const element = userstate[key];
                const ishas = element[`${redisKeyPrefix.club}${clubrpc.clubid}`].includes(`${clubrpc.uid}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${clubrpc.uid}`, key, `${redisKeyPrefix.club}${clubrpc.clubid}`);
                }
            }
        }
        const user = await User.getUser({ userid: clubrpc.uid });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onEntryClub}`, { user }, `${redisKeyPrefix.club}${clubrpc.clubid}`);
        return club;
    }
}
