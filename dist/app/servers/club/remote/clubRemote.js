"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
const club_1 = require("../../../controller/club/club");
const user_1 = require("../../../controller/user/user");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const socketRouterConfig_1 = require("../../../gameConfig/socketRouterConfig");
function default_1(app) {
    return new ClubRemote(app);
}
exports.default = default_1;
class ClubRemote {
    constructor(app) {
        this.app = app;
        this.globalChannelStatus = app.get(pinus_global_channel_status_1.GlobalChannelServiceStatus.PLUGIN_NAME);
    }
    async createclub(userId, clubConfig) {
        // let club = await this.clubManager.createclub(userId, clubConfig);
        // return { code: 200, data: { clubId: club.clubId } }
    }
    async joinClub(clubrpc) {
        const club = await club_1.Club.getClub({ clubid: clubrpc.clubid, uid: clubrpc.uid });
        if (!club) {
            return null;
        }
        // console.log('*******************************');
        // console.log(this.app.getServerId());
        // 某对象的整体事件
        const userstate = await this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.redisKeyPrefix.club}${clubrpc.clubid}`);
        // // { connector_1:{ channelName1: [ 'uuid_21', 'uuid_12', 'uuid_24', 'uuid_27' ] },
        // // 							connector_2: { channelName1: [ 'uuid_15', 'uuid_9', 'uuid_0', 'uuid_18' ] },
        // // 							 connector_3: { channelName1: [ 'uuid_6', 'uuid_3' ] }
        // this.app.ge
        for (const key in userstate) {
            if (userstate.hasOwnProperty(key)) {
                const element = userstate[key];
                const ishas = element[`${nameSpace_1.redisKeyPrefix.club}${clubrpc.clubid}`].includes(`${clubrpc.uid}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${clubrpc.uid}`, key, `${nameSpace_1.redisKeyPrefix.club}${clubrpc.clubid}`);
                }
            }
        }
        const user = await user_1.User.getUser({ userid: clubrpc.uid });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onEntryClub}`, { user }, `${nameSpace_1.redisKeyPrefix.club}${clubrpc.clubid}`);
        return club;
    }
}
exports.ClubRemote = ClubRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL2NsdWIvcmVtb3RlL2NsdWJSZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsd0RBQXFEO0FBQ3JELHdEQUFxRDtBQUNyRCw2REFBK0Q7QUFDL0QsK0VBQWtFO0FBTWxFLG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFGRCw0QkFFQztBQVVELE1BQWEsVUFBVTtJQUduQixZQUFtQixHQUFnQjtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLHdEQUEwQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWMsRUFBRSxVQUFzQjtRQUMxRCxvRUFBb0U7UUFDcEUsc0RBQXNEO0lBQzFELENBQUM7SUFFTSxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQWlCO1FBQ25DLE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELGtEQUFrRDtRQUNsRCx1Q0FBdUM7UUFFdkMsV0FBVztRQUNYLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxHQUFHLDBCQUFjLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2pJLHFGQUFxRjtRQUNyRix5RkFBeUY7UUFDekYsbUVBQW1FO1FBQ25FLGNBQWM7UUFDZCxLQUFLLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRTtZQUN6QixJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQy9CLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzVGLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRywwQkFBYyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDbEc7YUFDSjtTQUNKO1FBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsR0FBRyw0QkFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRywwQkFBYyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNuSixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUF4Q0QsZ0NBd0NDIn0=