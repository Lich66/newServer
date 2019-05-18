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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YkNoYW5uZWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vYXBwL2NoYW5uZWxTZXJ2aWNlL2NsdWJDaGFubmVsU2VydmljZS9jbHViQ2hhbm5lbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFhLGtCQUFrQjtJQUczQixZQUFvQixjQUE4QjtRQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBQ00sVUFBVSxDQUFDLElBQVksRUFBRSxJQUFhO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDTSxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUNNLEdBQUcsQ0FBQyxHQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0NBQ0o7QUFmRCxnREFlQyJ9