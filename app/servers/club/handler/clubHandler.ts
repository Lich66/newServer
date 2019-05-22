import { Application, BackendSession, ChannelService } from 'pinus';
// import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/handler/userInterface';
import { Club } from '../../../controller/club/club';
import { User } from '../../../controller/user/user';
import { redisKeyPrefix } from '../../../gameConfig/nameSpace';
import { IClubCreateRequest, IClubRequest, IClubReturn, IClubUpdateRequest } from '../../../interface/club/clubInterface';
import { GameUitl } from '../../../util/gameUitl';


export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    private channelService: ChannelService;
    public constructor(private app: Application) {
        this.channelService = app.get('channelService');
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
        const channel = this.channelService.getChannel(`${redisKeyPrefix.club}${session.get('clubid')}`, false);
        const channelUser = channel.getMember(`${session.uid}`);
        if (channelUser) {
            channel.removeMember(`${session.uid}`);
        }
        // redisClient.getAsync
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        channel.pushMessage(`${redisKeyPrefix.club}${session.get('clubid')}`, { user, action: 0 });
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
