"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HouseChannelService {
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
exports.HouseChannelService = HouseChannelService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG91c2VDaGFubmVsU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jaGFubmVsU2VydmljZS9ob3VzZUNoYW5uZWxTZXJ2aWNlL2hvdXNlQ2hhbm5lbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQTtJQUdJLFlBQVksY0FBOEI7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFZLEVBQUUsSUFBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBQ0QsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFDRCxHQUFHLENBQUMsR0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMxQixDQUFDO0NBQ0o7QUFmRCxrREFlQyJ9