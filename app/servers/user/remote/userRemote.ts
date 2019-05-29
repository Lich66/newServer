import { Application, FrontendSession, RemoterClass } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { Login } from '../../../controller/account/login';
import { ClubRoomState } from '../../../controller/redis/clubRoomState/clubRoomState';
import { User } from '../../../controller/user/user';
import { gameChannelKeyPrefix } from '../../../gameConfig/nameSpace';
import socketRouter from '../../../gameConfig/socketRouterConfig';
import { IAccountInfoRequest, ITokenInfoRequest, IUserinfoRequest, IUserResponse } from '../../../interface/user/userInterface';

export default function (app: Application) {
    return new Remote(app);
}
declare global {
    interface UserRpc {
        user: {
            userRemote: RemoterClass<FrontendSession, Remote>;
        };
    }
}

export class Remote {
    private globalChannelStatus: GlobalChannelServiceStatus;
    public constructor(private app: Application) {
        this.globalChannelStatus = app.get(GlobalChannelServiceStatus.PLUGIN_NAME);
    }

    public async auth(userinfo: IUserinfoRequest): Promise<IUserResponse> {
        return await Login.login(userinfo);

    }


    public async accountLogin(userinfo: IAccountInfoRequest): Promise<IUserResponse> {
        // console.log(JSON.stringify(userinfo));
        return await Login.accountLogin(userinfo);

    }


    public async tokenLogin(userinfo: ITokenInfoRequest): Promise<IUserResponse> {
        // console.log(JSON.stringify(userinfo));
        return await Login.tokenLogin(userinfo);

    }

    public async kick(uid: number, clubid: number, roomid: number) {
        console.log('kick');
        if (roomid) {
            const channels = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.clubRoom}${roomid}`);
            // const channel = this.channelService.getChannel(`${gameChannelKeyPrefix.club}${session.get('clubid')}`, false);
            for (const key in channels) {
                if (channels.hasOwnProperty(key)) {
                    const element = channels[key];
                    const ishas = element[`${gameChannelKeyPrefix.clubRoom}${roomid}`].includes(`${uid}`);
                    if (ishas) {
                        this.globalChannelStatus.leave(`${uid}`, key, `${gameChannelKeyPrefix.clubRoom}${roomid}`);
                    }
                }
            }
            const user = await User.getUser({ userid: uid });
            this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onLeaveClubRoom}`, { user }, `${gameChannelKeyPrefix.clubRoom}${roomid}`);
            this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onLeaveClubRoom}`, { user, roomid }, `${gameChannelKeyPrefix.club}${clubid}`);
            return {
                code: 0,
                data: clubid
            };
        }
    }
}
