"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
const roomManager_1 = require("../../../controller/room/roomManager");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const socketRouterConfig_1 = require("../../../gameConfig/socketRouterConfig");
function default_1(app) {
    return new RoomRemote(app);
}
exports.default = default_1;
class RoomRemote {
    constructor(app) {
        this.app = app;
        // this.channelService = app.get('channelService');
        this.globalChannelStatus = app.get(pinus_global_channel_status_1.GlobalChannelServiceStatus.PLUGIN_NAME);
    }
    // public async createRoom(configJson: IRoomConfig) {
    //     console.log('进来了');
    //     let channel = this.channelService.createChannel(configJson.roomId.toString());
    //     let room = new RoomChannelService(channel, configJson);
    //     let roomList = this.app.get(appKeyPrefix.roomList);
    //     roomList[configJson.roomId] = room;
    //     console.log('查看房间是否挂上去了:' + JSON.stringify(Object.keys(this.app.get(appKeyPrefix.roomList))));
    // }
    async joinRoom(userId, roomId) {
        console.log('joinRoom进来了');
        let result = await roomManager_1.RoomManager.joinRoom(userId, roomId);
        console.log('====返回的加入房间信息' + JSON.stringify(result));
        if (!result.flag) {
            return { code: result.code };
        }
        let members = this.globalChannelStatus.getMembersByChannelName('connector', `${nameSpace_1.gameChannelKeyPrefix.room}${roomId}`);
        // { connector_1:{ channelName1: [ 'uuid_21', 'uuid_12', 'uuid_24', 'uuid_27' ] },
        // 	 connector_2: { channelName1: [ 'uuid_15', 'uuid_9', 'uuid_0', 'uuid_18' ] },
        // 	 connector_3: { channelName1: [ 'uuid_6', 'uuid_3' ] }
        console.log('加入房间== members ==: ' + JSON.stringify(members));
        for (const key in members) {
            if (members.hasOwnProperty(key)) {
                const element = members[key];
                const ishas = element[`${nameSpace_1.gameChannelKeyPrefix.room}${roomId}`].includes(`${userId}`);
                if (!ishas) {
                    this.globalChannelStatus.add(`${userId}`, key, `${nameSpace_1.gameChannelKeyPrefix.room}${roomId}`);
                }
            }
        }
        let userData = result.userData;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onJoinRoom}`, { userData }, `${nameSpace_1.gameChannelKeyPrefix.room}${roomId}`);
        // let channel = this.channelService.getChannel(`${redisKeyPrefix.room}${roomId}`);
        // let userData = result.userData;
        // channel.pushMessage('onJoinRoom', { userData });
        // channel.add(`${userId}`, result.sid);
        return {
            code: 0,
            data: {
                userList: result.userList,
                onlookerList: result.onlookerList,
                roomconfig: result.roomConfig
            }
        };
    }
}
exports.RoomRemote = RoomRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbVJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL3Jvb20vcmVtb3RlL3Jvb21SZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFDekUsc0VBQW1FO0FBQ25FLDZEQUFxRTtBQUNyRSwrRUFBa0U7QUFFbEUsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUZELDRCQUVDO0FBVUQsTUFBYSxVQUFVO0lBSW5CLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLHdEQUEwQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxxREFBcUQ7SUFDckQsMEJBQTBCO0lBQzFCLHFGQUFxRjtJQUNyRiw4REFBOEQ7SUFDOUQsMERBQTBEO0lBQzFELDBDQUEwQztJQUMxQyxxR0FBcUc7SUFDckcsSUFBSTtJQUNHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBYyxFQUFFLE1BQWM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixJQUFJLE1BQU0sR0FBRyxNQUFNLHlCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDZCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNoQztRQUNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsR0FBRyxnQ0FBb0IsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNySCxrRkFBa0Y7UUFDbEYsaUZBQWlGO1FBQ2pGLDBEQUEwRDtRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM3RCxLQUFLLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRTtZQUN2QixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDckYsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsZ0NBQW9CLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQzNGO2FBQ0o7U0FDSjtRQUNELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxHQUFHLDRCQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLGdDQUFvQixDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3BKLG1GQUFtRjtRQUNuRixrQ0FBa0M7UUFDbEMsbURBQW1EO1FBQ25ELHdDQUF3QztRQUN4QyxPQUFPO1lBQ0gsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUU7Z0JBQ0YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO2dCQUN6QixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7Z0JBQ2pDLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTthQUNoQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF0REQsZ0NBc0RDIn0=