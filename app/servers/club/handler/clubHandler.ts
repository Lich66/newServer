import { Application, BackendSession, ChannelService } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
// import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/handler/userInterface';
import { Club } from '../../../controller/club/club';
import { User } from '../../../controller/user/user';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';
import socketRouter from '../../../gameConfig/socketRouterConfig';
import { IClubCreateRequest, IClubRequest, IClubReturn, IClubUpdateRequest } from '../../../interface/club/clubInterface';
import { GameUitl } from '../../../util/gameUitl';


export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    // private channelService: ChannelService;
    private globalChannelStatus: GlobalChannelServiceStatus;
    public constructor(private app: Application) {
        // this.channelService = app.get('channelService');
        this.globalChannelStatus = app.get(GlobalChannelServiceStatus.PLUGIN_NAME);
    }

    public async createClub(clubinfo: IClubCreateRequest, session: BackendSession): Promise<IClubReturn> {
        // // 这里以后添加很多判断
        // if (!clubinfo.type) {
        //     return {
        //         code: 400,
        //         msg: '参数错误'
        //     };
        // }
        const json: IClubRequest = await GameUitl.parsePlayConfig(clubinfo.config);
        let result = await Club.createClub({ ...json, uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 200,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }
    public async deleteClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        let result = await Club.deleteClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 200,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async updateClub(clubinfo: IClubUpdateRequest, session: BackendSession): Promise<IClubReturn> {

        let njson = {};
        switch (clubinfo.type) {
            case 0:
                njson = await GameUitl.parsePlayConfig(clubinfo.play_config);
                break;
            case 1:
                njson = await GameUitl.parseInfoConfig(clubinfo.info_config);
                break;
            default:
                return null;
        }
        let result = await Club.updateClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) }, njson);
        if (result) {
            return {
                code: 200,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async getClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        let result = await Club.getClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 200,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async getAllClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        let result = await Club.getAllClub({ uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 200,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async leaveClub(obj: any, session: BackendSession): Promise<IClubReturn> {
        const channels = await this.globalChannelStatus.getMembersByChannelName('connector', `${redisKeyPrefix.club}${session.get('clubid')}`);
        // const channel = this.channelService.getChannel(`${redisKeyPrefix.club}${session.get('clubid')}`, false);
        for (const key in channels) {
            if (channels.hasOwnProperty(key)) {
                const element = channels[key];
                const ishas = element[`${redisKeyPrefix.club}${session.get('clubid')}`].includes(`${session.uid}`);
                if (ishas) {
                    this.globalChannelStatus.leave(`${session.uid}`, key, `${redisKeyPrefix.club}${session.get('clubid')}`);
                }
            }
        }
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onLeaveClub}`, { user }, `${redisKeyPrefix.club}${session.get('clubid')}`);
        session.set('roomid', null);
        session.push('roomid', () => {

        });
        session.set('clubid', null);
        session.push('clubid', () => {

        });
        return {
            code: 200
        };
    }
}
