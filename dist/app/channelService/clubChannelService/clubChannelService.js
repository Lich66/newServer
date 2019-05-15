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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YkNoYW5uZWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vYXBwL2NoYW5uZWxTZXJ2aWNlL2NsdWJDaGFubmVsU2VydmljZS9jbHViQ2hhbm5lbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQTtJQUdJLFlBQW9CLGNBQThCO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3pDLENBQUM7SUFDTSxVQUFVLENBQUMsSUFBWSxFQUFFLElBQWE7UUFDekMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNNLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBVTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBQ00sR0FBRyxDQUFDLEdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FDSjtBQWZELGdEQWVDIn0=