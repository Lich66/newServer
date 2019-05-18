"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoomChannelService {
    constructor(channelService) {
        this.channelService = channelService;
    }
    initRoom(roomId, userId, config, roomConfig, createTime) {
        this.createTime = createTime;
        this.roomId = roomId;
        this.creatorId = userId;
        this.roomConfig = config;
        this.gameType = roomConfig.gameType;
        this.playType = roomConfig.playType;
        this.deskType = roomConfig.deskType;
        this.baseScore = roomConfig.baseScore;
        this.roundCount = roomConfig.roundCount;
        this.payType = roomConfig.payType;
        this.startType = roomConfig.startType;
        this.pushWager = roomConfig.pushWager;
        this.maxRobBanker = roomConfig.maxRobBanker;
        this.compareAllType = roomConfig.compareAllType;
        this.doubleRule = roomConfig.doubleRule;
        this.specialCardType = roomConfig.specialCardType;
        this.advancedOptions = roomConfig.advancedOptions;
        this.lazarilloDeTormes = roomConfig.lazarilloDeTormes;
    }
    getChannel() {
        return this.channelService.getChannel(this.roomId.toString(), false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUNoYW5uZWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL2NoYW5uZWxTZXJ2aWNlL3Jvb21DaGFubmVsU2VydmljZS9yb29tQ2hhbm5lbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxNQUFhLGtCQUFrQjtJQXdCM0IsWUFBbUIsY0FBOEI7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQUVNLFFBQVEsQ0FBQyxNQUFjLEVBQUUsTUFBYyxFQUFFLE1BQWtCLEVBQUUsVUFBdUIsRUFBRSxVQUFrQjtRQUMzRyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUM1QyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztRQUNsRCxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUM7UUFDbEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztJQUMxRCxDQUFDO0lBRU0sVUFBVTtRQUNiLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDekIsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDakIsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUdKO0FBL0RELGdEQStEQyJ9