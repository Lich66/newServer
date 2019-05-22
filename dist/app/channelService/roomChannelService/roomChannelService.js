"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoomChannelService {
    constructor(channel) {
        this.channel = channel;
    }
    hasUser(userId) {
        for (let item of this.userList) {
            if (item === userId) {
                return true;
            }
        }
        return false;
    }
}
exports.RoomChannelService = RoomChannelService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUNoYW5uZWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vYXBwL2NoYW5uZWxTZXJ2aWNlL3Jvb21DaGFubmVsU2VydmljZS9yb29tQ2hhbm5lbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxNQUFhLGtCQUFrQjtJQWdDM0IsWUFBbUIsT0FBZ0I7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFjO1FBQ3pCLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM1QixJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FHSjtBQTlDRCxnREE4Q0MifQ==