"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_global_channel_status_1 = require("pinus-global-channel-status");
function default_1(app) {
    return new ClubRoomRemote(app);
}
exports.default = default_1;
class ClubRoomRemote {
    constructor(app) {
        this.app = app;
        // this.channelService = app.get('channelService');
        this.globalChannelStatus = app.get(pinus_global_channel_status_1.GlobalChannelServiceStatus.PLUGIN_NAME);
    }
    async createclub(userId, clubConfig) {
        // let clubRoom = await this.clubManager.createclub(userId, clubConfig);
        // return { code: 200, data: { clubId: clubRoom.clubId } }
    }
}
exports.ClubRoomRemote = ClubRoomRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21SZW1vdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViUm9vbS9yZW1vdGUvY2x1YlJvb21SZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2RUFBeUU7QUFVekUsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUZELDRCQUVDO0FBVUQsTUFBYSxjQUFjO0lBSXZCLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLHdEQUEwQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWMsRUFBRSxVQUFzQjtRQUMxRCx3RUFBd0U7UUFDeEUsMERBQTBEO0lBQzlELENBQUM7Q0FHSjtBQWhCRCx3Q0FnQkMifQ==