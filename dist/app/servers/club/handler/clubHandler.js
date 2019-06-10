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
        json.config_str = clubinfo.config.toString();
        let result = await club_1.Club.createClub(Object.assign({}, json, { uid: Number.parseInt(session.uid, 0) }));
        await clubUsers_1.ClubUser.findClubUser({ clubid: result.clubid, chactor: 1, userid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 140100
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
                code: 140200
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
        if (typeof result != 'number') {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 140300
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
                code: 140400
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
                code: 140400
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
                code: 140500
            };
        }
        const clubUser = await clubUsers_1.ClubUser.findClubUser({ clubid: clubrpc.clubid, userid: Number.parseInt(session.uid, 0) });
        if (!clubUser) {
            return {
                code: 140501
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
    async setChactorOfClubUser(msg, session) {
        if (!msg || !msg.userid || !msg.chactor || msg.chactor < 2 || msg.chactor > 5) {
            return {
                code: 10003
            };
        }
        const user = await clubUsers_1.ClubUser.updateClubUser({ userid: msg.userid }, { chactor: msg.chactor });
        return {
            code: 0,
            data: user
        };
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
                code: 140700
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
                code: 140800
            };
        }
    }
    async updateJoinUser(clubinfo, session) {
        const clubid = session.get('clubid');
        const clubList = await club_1.Club.getAllClub({ clubid, uid: Number.parseInt(session.uid, 0) });
        if (clubList.length == 0) {
            return {
                code: 140900
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
                code: 140901
            };
        }
    }
    async delJoinUser(clubinfo, session) {
        const clubid = session.get('clubid');
        const clubList = await club_1.Club.getAllClub({ clubid, uid: Number.parseInt(session.uid, 0) });
        if (clubList.length == 0) {
            return {
                code: 141000
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
                code: 141001
            };
        }
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViL2hhbmRsZXIvY2x1YkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsd0RBQXFEO0FBQ3JELHVFQUFtRTtBQUNuRSx3REFBcUQ7QUFDckQsNkRBQXFFO0FBQ3JFLCtFQUFrRTtBQUdsRSxxREFBa0Q7QUFDbEQsdURBQW9EO0FBR3BELG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFGRCw0QkFFQztBQUVELE1BQWEsT0FBTztJQUdoQixZQUEyQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQ3ZDLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyx3REFBMEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUE0QixFQUFFLE9BQXVCO1FBQ3pFLGdCQUFnQjtRQUNoQix3QkFBd0I7UUFDeEIsZUFBZTtRQUNmLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsU0FBUztRQUNULElBQUk7UUFDSixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksWUFBWSxFQUFFO1lBQ3pFLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7UUFDRCxNQUFNLElBQUksR0FBaUIsTUFBTSxtQkFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFD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