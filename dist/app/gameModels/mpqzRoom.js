"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MPQZRoom {
    constructor(channel) {
        this.channel = channel;
    }
    initRoom(roomId, userId, config, roomConfig) {
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
        return this.channel;
    }
}
exports.MPQZRoom = MPQZRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXBxelJvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvZ2FtZU1vZGVscy9tcHF6Um9vbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBO0lBcUJJLFlBQVksT0FBZ0I7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFjLEVBQUUsTUFBYyxFQUFFLE1BQWtCLEVBQUUsVUFBdUI7UUFDaEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFDNUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUM7UUFDbEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDO1FBQ2xELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUMsaUJBQWlCLENBQUM7SUFDMUQsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztDQUNKO0FBaERELDRCQWdEQyJ9