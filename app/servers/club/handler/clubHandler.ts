import { Application, BackendSession, ChannelService } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
// import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/handler/userInterface';
import { Club } from '../../../controller/club/club';
import { User } from '../../../controller/user/user';
import { gameChannelKeyPrefix } from '../../../gameConfig/nameSpace';
import socketRouter from '../../../gameConfig/socketRouterConfig';
import { IClubCreateRequest, IClubRequest, IClubReturn, IClubRpc, IClubUpdateRequest } from '../../../interface/club/clubInterface';
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
                code: 0,
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
                code: 0,
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
                code: 0,
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
                code: 0,
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
                code: 0,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async joinClub(clubrpc: IClubRpc, session: BackendSession): Promise<IClubReturn> {
        session.set('clubid', clubrpc.clubid);
        session.push('clubid', () => {

        });
        const club = await Club.getClub({ clubid: clubrpc.clubid, uid: Number.parseInt(session.uid, 0) });
        if (!club) {
            return null;
        }
        // console.log('*******************************');
        // console.log(this.app.getServerId());

        // 某对象的整体事件
        const userstate = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.club}${clubrpc.clubid}`);
        // // { connector_1:{ channelName1: [ 'uuid_21', 'uuid_12', 'uuid_24', 'uuid_27' ] },
        // // 							connector_2: { channelName1: [ 'uuid_15', 'uuid_9', 'uuid_0', 'uuid_18' ] },
        // // 							 connector_3: { channelName1: [ 'uuid_6', 'uuid_3' ] }
        // this.app.ge
        for (const key in userstate) {
            if (userstate.hasOwnProperty(key)) {
                const element = userstate[key];
                const ishas = element[`${gameChannelKeyPrefix.club}${clubrpc.clubid}`].includes(session.uid);
                if (!ishas) {
                    this.globalChannelStatus.add(session.uid, key, `${gameChannelKeyPrefix.club}${clubrpc.clubid}`);
                }
            }
        }
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onEntryClub}`, { user }, `${gameChannelKeyPrefix.club}${clubrpc.clubid}`);
        return {
            code: 0,
            data: club
        };
        // return club;
    }

    public async leaveClub(obj: any, session: BackendSession): Promise<IClubReturn> {
        const clubid = session.get('clubid');
        const channels = await this.globalChannelStatus.getMembersByChannelName('connector', `${gameChannelKeyPrefix.club}${clubid}`);
        // const channel = this.channelService.getChannel(`${gameChannelKeyPrefix.club}${session.get('clubid')}`, false);
        for (const key in channels) {
            if (channels.hasOwnProperty(key)) {
                const element = channels[key];
                const ishas = element[`${gameChannelKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (ishas) {
                    this.globalChannelStatus.leave(`${session.uid}`, key, `${gameChannelKeyPrefix.club}${clubid}`);
                }
            }
        }
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onLeaveClub}`, { user }, `${gameChannelKeyPrefix.club}${clubid}`);
        session.set('roomid', null);
        session.push('roomid', () => {

        });
        session.set('clubid', null);
        session.push('clubid', () => {

        });
        return {
            code: 0
        };
    }
}
