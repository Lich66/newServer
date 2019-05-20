import { Application, BackendSession, ChannelService } from 'pinus';
// import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/handler/userInterface';
import { Club } from '../../../controller/club/club';
import { User } from '../../../controller/user/user';
import { defaultClubName } from '../../../gameConfig/defaultClubName';
import { redisKeyPrefix } from '../../../gameConfig/redisKeyPrefix';
import { IClubRequest, IClubReturn } from '../../../interface/club/handler/clubInterface';


export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    private channelService: ChannelService;
    public constructor(private app: Application) {
        this.channelService = app.get('channelService');
    }

    public async createClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {
        // 这里以后添加很多判断
        if (!clubinfo.type) {
            return {
                code: 400,
                msg: '参数错误'
            };
        }
        let play_setting = 'JSON.stringify(room_1_1(clubinfo.clubConfig))';
        let result = await Club.createClub({ ...clubinfo, play_setting, uid: Number.parseInt(session.uid, 0) }, session.get('usernick'));
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

    public async updateClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        let njson = { ...clubinfo };
        delete njson.clubid;
        delete njson.create_time;
        delete njson.uid;

        let result = await Club.updateClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) }, njson);
        if (result) {
            return {
                code: 200,
                data: result
                // msg: `${result[1]}`
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
