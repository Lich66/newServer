"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
// import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/handler/userInterface';
const club_1 = require("../../../controller/club/club");
const clubRoomList_1 = require("../../../controller/redis/clubRoomList/clubRoomList");
const user_1 = require("../../../controller/user/user");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const socketRouterConfig_1 = require("../../../gameConfig/socketRouterConfig");
const gameUitl_1 = require("../../../util/gameUitl");
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
        if (!clubinfo.config || clubinfo.config.length != configLength) {
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
                code: 500
            };
        }
    }
    async deleteClub(clubinfo, session) {
        let result = await club_1.Club.deleteClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 500
            };
        }
    }
    async updateClub(clubinfo, session) {
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
                code: 500
            };
        }
    }
    async getClub(clubinfo, session) {
        let result = await club_1.Club.getClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
        if (result) {
            return {
                code: 0,
                data: result
            };
        }
        else {
            return {
                code: 500
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
                code: 500
            };
        }
    }
    async joinClub(clubrpc, session) {
        session.set('clubid', clubrpc.clubid);
        await session.apush('clubid');
        const club = await club_1.Club.getClub({ clubid: clubrpc.clubid, uid: Number.parseInt(session.uid, 0) });
        if (!club) {
            return null;
        }
        // console.log('*******************************');
        // console.log(this.app.getServerId());
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
                    this.globalChannelStatus.add(session.uid, key, `${nameSpace_1.gameChannelKeyPrefix.club}${clubrpc.clubid}`);
                }
            }
        }
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onEntryClub}`, { user }, `${nameSpace_1.gameChannelKeyPrefix.club}${clubrpc.clubid}`);
        return {
            code: 0,
            data: club
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
        clubRoomList_1.ClubRoomList.lremClubRoomList(clubid);
        session.set('roomid', null);
        session.apush('roomid');
        session.set('clubid', null);
        session.apush('clubid');
        return {
            code: 0
        };
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViL2hhbmRsZXIvY2x1YkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsb0hBQW9IO0FBQ3BILHdEQUFxRDtBQUNyRCxzRkFBbUY7QUFDbkYsd0RBQXFEO0FBQ3JELDZEQUFxRTtBQUNyRSwrRUFBa0U7QUFFbEUscURBQWtEO0FBR2xELG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFGRCw0QkFFQztBQUVELE1BQWEsT0FBTztJQUdoQixZQUEyQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQ3ZDLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyx3REFBMEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUE0QixFQUFFLE9BQXVCO1FBQ3pFLGdCQUFnQjtRQUNoQix3QkFBd0I7UUFDeEIsZUFBZTtRQUNmLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsU0FBUztRQUNULElBQUk7UUFDSixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksWUFBWSxFQUFFO1lBQzVELE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1NBQ0w7UUFDRCxNQUFNLElBQUksR0FBaUIsTUFBTSxtQkFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0UsSUFBSSxNQUFNLEdBQUcsTUFBTSxXQUFJLENBQUMsVUFBVSxtQkFBTSxJQUFJLElBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBRyxDQUFDO1FBQ3RGLElBQUksTUFBTSxFQUFFO1lBQ1IsT0FBTztnQkFDSCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUM7U0FDTDthQUFNO1lBQ0gsT0FBTztnQkFDSCxJQUFJLEVBQUUsR0FBRzthQUNaLENBQUM7U0FDTDtJQUNMLENBQUM7SUFDTSxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQXNCLEVBQUUsT0FBdUI7UUFFbkUsSUFBSSxNQUFNLEdBQUcsTUFBTSxXQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEcsSUFBSSxNQUFNLEVBQUU7WUFDUixPQUFPO2dCQUNILElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPO2dCQUNILElBQUksRUFBRSxHQUFHO2FBQ1osQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBNEIsRUFBRSxPQUF1QjtRQUV6RSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixRQUFRLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDbkIsS0FBSyxDQUFDO2dCQUNGLEtBQUssR0FBRyxNQUFNLG1CQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDN0QsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixLQUFLLEdBQUcsTUFBTSxtQkFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzdELE1BQU07WUFDVjtnQkFDSSxPQUFPLElBQUksQ0FBQztTQUNuQjtRQUNELElBQUksTUFBTSxHQUFHLE1BQU0sV0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RyxJQUFJLE1BQU0sRUFBRTtZQUNSLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDO1NBQ0w7YUFBTTtZQUNILE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7YUFDWixDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFzQixFQUFFLE9BQXVCO1FBRWhFLElBQUksTUFBTSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25HLElBQUksTUFBTSxFQUFFO1lBQ1IsT0FBTztnQkFDSCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUM7U0FDTDthQUFNO1lBQ0gsT0FBTztnQkFDSCxJQUFJLEVBQUUsR0FBRzthQUNaLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQXNCLEVBQUUsT0FBdUI7UUFFbkUsSUFBSSxNQUFNLEdBQUcsTUFBTSxXQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0UsSUFBSSxNQUFNLEVBQUU7WUFDUixPQUFPO2dCQUNILElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPO2dCQUNILElBQUksRUFBRSxHQUFHO2FBQ1osQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBaUIsRUFBRSxPQUF1QjtRQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0Qsa0RBQWtEO1FBQ2xELHVDQUF1QztRQUV2QyxXQUFXO1FBQ1gsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZJLHFGQUFxRjtRQUNyRix5RkFBeUY7UUFDekYsbUVBQW1FO1FBQ25FLGNBQWM7UUFDZCxLQUFLLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRTtZQUN6QixJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQy9CLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdGLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLGdDQUFvQixDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDbkc7YUFDSjtTQUNKO1FBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxHQUFHLDRCQUFZLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLGdDQUFvQixDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN6SixPQUFPO1lBQ0gsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFDRixlQUFlO0lBQ25CLENBQUM7SUFFTSxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQVEsRUFBRSxPQUF1QjtRQUNwRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxHQUFHLGdDQUFvQixDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzlILGlIQUFpSDtRQUNqSCxLQUFLLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUN4QixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzlCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzFGLElBQUksS0FBSyxFQUFFO29CQUNQLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQ2xHO2FBQ0o7U0FDSjtRQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsR0FBRyw0QkFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxnQ0FBb0IsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqSiwyQkFBWSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QixPQUFPO1lBQ0gsSUFBSSxFQUFFLENBQUM7U0FDVixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBcEtELDBCQW9LQyJ9