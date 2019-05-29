import { Application, BackendSession } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { Club } from '../../../controller/club/club';
import { ClubUser } from '../../../controller/clubUsers/clubUsers';
import { ClubRoomList } from '../../../controller/redis/clubRoomList/clubRoomList';
import { User } from '../../../controller/user/user';
import { gameChannelKeyPrefix } from '../../../gameConfig/nameSpace';
import socketRouter from '../../../gameConfig/socketRouterConfig';
import { IClubCreateRequest, IClubRequest, IClubReturn, IClubRpc, IClubUpdateRequest } from '../../../interface/club/clubInterface';
import { IClubUserReturn, IJoinClubData } from '../../../interface/clubUsers/clubUsersInterface';
import { GameUitl } from '../../../util/gameUitl';
import { SelfUtils } from '../../../util/selfUtils';


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
        const configLength = 23;
        if (!clubinfo || !clubinfo.config || clubinfo.config.length != configLength) {
            return {
                code: 10003
            };
        }
        const json: IClubRequest = await GameUitl.parsePlayConfig(clubinfo.config);
        let result = await Club.createClub({ ...json, uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 14001
            };
        }
    }
    public async deleteClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        if (!clubinfo || !clubinfo.clubid) {
            return {
                code: 10003
            };
        }
        let result = await Club.deleteClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 14002
            };
        }
    }

    public async updateClub(clubinfo: IClubUpdateRequest, session: BackendSession): Promise<IClubReturn> {
        const play_config_length = 23;
        const info_config_length = 6;
        if (!clubinfo || !clubinfo.clubid || (!clubinfo.play_config && !clubinfo.info_config) || clubinfo.play_config.length != play_config_length || clubinfo.info_config.length != info_config_length) {
            return {
                code: 10003
            };
        }
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
                code: 14003
            };
        }
    }

    public async getClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        if (!clubinfo || !clubinfo.clubid) {
            return {
                code: 10003
            };
        }
        let result = await Club.getClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 14004
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
                code: 14004
            };
        }
    }

    public async joinClub(clubrpc: IClubRpc, session: BackendSession): Promise<IClubReturn> {

        if (!clubrpc || !clubrpc.clubid) {
            return {
                code: 10003
            };
        }

        session.set('clubid', clubrpc.clubid);
        await session.apush('clubid');
        const club = await Club.getClub({ clubid: clubrpc.clubid, uid: Number.parseInt(session.uid, 0) });
        if (!club) {
            return {
                code: 14005
            };
        }
        const clubUser = await ClubUser.findClubUser({ clubid: clubrpc.clubid, userid: Number.parseInt(session.uid, 0) });
        if (!clubUser) {
            return {
                code: 14006
            };
        }
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
                    await this.globalChannelStatus.add(session.uid, key, `${gameChannelKeyPrefix.club}${clubrpc.clubid}`);
                }
            }
        }
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onEntryClub}`, { user }, `${gameChannelKeyPrefix.club}${clubrpc.clubid}`);
        const data = SelfUtils.assign<IJoinClubData>(club, clubUser);
        return {
            code: 0,
            data
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
        // ClubRoomList.lremClubRoomList(clubid);
        session.set('roomid', null);
        session.apush('roomid');
        session.set('clubid', null);
        session.apush('clubid');
        return {
            code: 0
        };
    }

    public async exitClub(json: { clubid: number }, session: BackendSession): Promise<IClubReturn> {
        if (!json || !json.clubid) {
            return {
                code: 10003
            };
        }
        const clubuser = await ClubUser.deleteClubUser({ clubid: json.clubid, userid: Number.parseInt(session.uid, 0) });
        return {
            code: 0,
            data: clubuser
        };
    }

    public async getAllJoinClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubUserReturn> {

        let result = await ClubUser.getAllClubUserbyUid({ userid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 14007
            };
        }
    }

    public async getAllJoinUser(clubinfo: IClubRequest, session: BackendSession): Promise<IClubUserReturn> {
        const clubid = session.get('clubid');
        let result = await ClubUser.getAllClubUserbyClubid({ clubid });
        if (result) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 14008
            };
        }
    }

    public async updateJoinUser(clubinfo: any, session: BackendSession): Promise<IClubUserReturn> {
        const clubid = session.get('clubid');
        const clubList = await Club.getAllClub({ clubid, uid: Number.parseInt(session.uid, 0) });
        if (clubList.length == 0) {
            return {
                code: 14009
            };
        }
        let result = await ClubUser.updateClubUser({ clubid, userid: clubinfo.uid }, { points: clubinfo.points });
        if (result) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 14010
            };
        }
    }

    public async delJoinUser(clubinfo: any, session: BackendSession): Promise<IClubUserReturn> {
        const clubid = session.get('clubid');
        const clubList = await Club.getAllClub({ clubid, uid: Number.parseInt(session.uid, 0) });
        if (clubList.length == 0) {
            return {
                code: 14011
            };
        }
        let result = await ClubUser.deleteClubUser({ clubid, userid: clubinfo.uid });
        if (result) {
            return {
                code: 0,
                data: result
            };
        } else {
            return {
                code: 14012
            };
        }
    }
}
