"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClubChannelService {
    constructor(channelService) {
        this.channelService = channelService;
    }
    getChannel(parm, bool) {
        return this.channelService.getChannel(parm, bool);
    }
    set(key, value) {
        this.parms[key] = value;
    }
    get(key) {
        return this.parms[key];
    }
}
exports.ClubChannelService = ClubChannelService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YkNoYW5uZWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vYXBwL2NoYW5uZWxTZXJ2aWNlL2NsdWJDaGFubmVsU2VydmljZS9jbHViQ2hhbm5lbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQTtJQUdJLFlBQVksY0FBOEI7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFZLEVBQUUsSUFBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBQ0QsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFDRCxHQUFHLENBQUMsR0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMxQixDQUFDO0NBQ0o7QUFmRCxnREFlQyJ9