"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
const club_1 = require("../../../controller/club/club");
const clubUsers_1 = require("../../../controller/clubUsers/clubUsers");
const user_1 = require("../../../controller/user/user");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const socketRouterConfig_1 = require("../../../gameConfig/socketRouterConfig");
const gameUitl_1 = require("../../../util/gameUitl");
const selfUtils_1 = require("../../../util/selfUtils");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
        // this.channelService = app.get('channelService');
        this.globalChannelStatus = app.get(pinus_global_channel_status_1.GlobalChannelServiceStatus.PLUGIN_NAME);
    }
    async createClub(clubinfo, session) {
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
        const json = await gameUitl_1.GameUitl.parsePlayConfig(clubinfo.config);
        let result = await club_1.Club.createClub(Object.assign({}, json, { uid: Number.parseInt(session.uid, 0) }));
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 14001
            };
        }
    }
    async deleteClub(clubinfo, session) {
        if (!clubinfo || !clubinfo.clubid) {
            return {
                code: 10003
            };
        }
        let result = await club_1.Club.deleteClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 14002
            };
        }
    }
    async updateClub(clubinfo, session) {
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
                njson = await gameUitl_1.GameUitl.parsePlayConfig(clubinfo.play_config);
                break;
            case 1:
                njson = await gameUitl_1.GameUitl.parseInfoConfig(clubinfo.info_config);
                break;
            default:
                return null;
        }
        let result = await club_1.Club.updateClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) }, njson);
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 14003
            };
        }
    }
    async getClub(clubinfo, session) {
        if (!clubinfo || !clubinfo.clubid) {
            return {
                code: 10003
            };
        }
        let result = await club_1.Club.getClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 14004
            };
        }
    }
    async getAllClub(clubinfo, session) {
        let result = await club_1.Club.getAllClub({ uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 14004
            };
        }
    }
    async joinClub(clubrpc, session) {
        if (!clubrpc || !clubrpc.clubid) {
            return {
                code: 10003
            };
        }
        session.set('clubid', clubrpc.clubid);
        await session.apush('clubid');
        const club = await club_1.Club.getClub({ clubid: clubrpc.clubid, uid: Number.parseInt(session.uid, 0) });
        if (!club) {
            return {
                code: 14005
            };
        }
        const clubUser = await clubUsers_1.ClubUser.findClubUser({ clubid: clubrpc.clubid, userid: Number.parseInt(session.uid, 0) });
        if (!clubUser) {
            return {
                code: 14006
            };
        }
        // 某对象的整体事件
        const userstate = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.club}${clubrpc.clubid}`);
        // // { connector_1:{ channelName1: [ 'uuid_21', 'uuid_12', 'uuid_24', 'uuid_27' ] },
        // // 							connector_2: { channelName1: [ 'uuid_15', 'uuid_9', 'uuid_0', 'uuid_18' ] },
        // // 							 connector_3: { channelName1: [ 'uuid_6', 'uuid_3' ] }
        // this.app.ge
        for (const key in userstate) {
            if (userstate.hasOwnProperty(key)) {
                const element = userstate[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.club}${clubrpc.clubid}`].includes(session.uid);
                if (!ishas) {
                    await this.globalChannelStatus.add(session.uid, key, `${nameSpace_1.gameChannelKeyPrefix.club}${clubrpc.clubid}`);
                }
            }
        }
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onEntryClub}`, { user }, `${nameSpace_1.gameChannelKeyPrefix.club}${clubrpc.clubid}`);
        const data = selfUtils_1.SelfUtils.assign(club.toJSON(), clubUser.toJSON());
        return {
            code: 0,
            data
        };
        // return club;
    }
    async leaveClub(obj, session) {
        const clubid = session.get('clubid');
        const channels = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        // const channel = this.channelService.getChannel(`${gameChannelKeyPrefix.club}${session.get('clubid')}`, false);
        for (const key in channels) {
            if (channels.hasOwnProperty(key)) {
                const element = channels[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`].includes(`${session.uid}`);
                if (ishas) {
                    this.globalChannelStatus.leave(`${session.uid}`, key, `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
                }
            }
        }
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onLeaveClub}`, { user }, `${nameSpace_1.gameChannelKeyPrefix.club}${clubid}`);
        // ClubRoomList.lremClubRoomList(clubid);
        session.set('roomid', null);
        session.apush('roomid');
        session.set('clubid', null);
        session.apush('clubid');
        return {
            code: 0
        };
    }
    async exitClub(json, session) {
        if (!json || !json.clubid) {
            return {
                code: 10003
            };
        }
        const clubuser = await clubUsers_1.ClubUser.deleteClubUser({ clubid: json.clubid, userid: Number.parseInt(session.uid, 0) });
        return {
            code: 0,
            data: clubuser
        };
    }
    async getAllJoinClub(clubinfo, session) {
        let result = await clubUsers_1.ClubUser.getAllClubUserbyUid({ userid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 14007
            };
        }
    }
    async getAllJoinUser(clubinfo, session) {
        const clubid = session.get('clubid');
        let result = await clubUsers_1.ClubUser.getAllClubUserbyClubid({ clubid });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 14008
            };
        }
    }
    async updateJoinUser(clubinfo, session) {
        const clubid = session.get('clubid');
        const clubList = await club_1.Club.getAllClub({ clubid, uid: Number.parseInt(session.uid, 0) });
        if (clubList.length == 0) {
            return {
                code: 14009
            };
        }
        let result = await clubUsers_1.ClubUser.updateClubUser({ clubid, userid: clubinfo.uid }, { points: clubinfo.points });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 14010
            };
        }
    }
    async delJoinUser(clubinfo, session) {
        const clubid = session.get('clubid');
        const clubList = await club_1.Club.getAllClub({ clubid, uid: Number.parseInt(session.uid, 0) });
        if (clubList.length == 0) {
            return {
                code: 14011
            };
        }
        let result = await clubUsers_1.ClubUser.deleteClubUser({ clubid, userid: clubinfo.uid });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 14012
            };
        }
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViL2hhbmRsZXIvY2x1YkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsd0RBQXFEO0FBQ3JELHVFQUFtRTtBQUVuRSx3REFBcUQ7QUFDckQsNkRBQXFFO0FBQ3JFLCtFQUFrRTtBQUdsRSxxREFBa0Q7QUFDbEQsdURBQW9EO0FBR3BELG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFGRCw0QkFFQztBQUVELE1BQWEsT0FBTztJQUdoQixZQUEyQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQ3ZDLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyx3REFBMEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUE0QixFQUFFLE9BQXVCO1FBQ3pFLGdCQUFnQjtRQUNoQix3QkFBd0I7UUFDeEIsZUFBZTtRQUNmLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsU0FBUztRQUNULElBQUk7UUFDSixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksWUFBWSxFQUFFO1lBQ3pFLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7UUFDRCxNQUFNLElBQUksR0FBaUIsTUFBTSxtQkFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0UsSUFBSSxNQUFNLEdBQUcsTUFBTSxXQUFJLENBQUMsVUFBVSxtQkFB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