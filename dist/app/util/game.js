"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nameSpace_1 = require("../gameConfig/nameSpace");
const poker_1 = require("./poker");
class Game {
    constructor(clubroom, channelService) {
        this.clubroom = clubroom;
        this.channelService = channelService;
        this.channel = channelService.getChannel(`${nameSpace_1.redisKeyPrefix.clubRoom}${clubroom.roomid}`);
        this.roundNumber = clubroom.round;
        this.poker = [];
        this.poker_user = {};
        this.users = [];
    }
    /**
     * pushUser
     */
    pushUser(uid) {
        this.users.push(uid);
    }
    startRound() {
        this.roundNumber--;
        this.sendPoker();
    }
    sendPoker() {
        this.poker = [];
        this.poker_user = {};
        // 掏出一副牌
        const pokers = new poker_1.Pokers();
        const plength = this.users.length;
        let pindex = 0;
        // 初始化用户的牌
        do {
            this.poker[pindex] = [];
            pindex++;
        } while (pindex <= plength);
        const sendcount = 5;
        let sindex = 0;
        // 随机发牌（全发）
        do {
            let index = 0;
            do {
                const pokerone = pokers.getPoker();
                this.poker[index].push(pokerone);
                index++;
            } while (index <= plength);
            sindex++;
        } while (sindex < sendcount);
        this.poker.forEach((element, i) => {
            this.poker_user[this.users[i]] = element;
            this.channelService.pushMessageByUids('onSendPoker', element.slice(0, 4), [{
                    uid: `${this.users[sindex]}`,
                    sid: this.channel.getMember(`${this.users[sindex]}`).sid
                }]);
        });
    }
    settlement() {
        this.channel.pushMessage('onSendPoker', this.poker_user);
        this.end();
    }
    end() {
        // 这里入库
    }
}
exports.Game = Game;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC91dGlsL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1REFBeUQ7QUFFekQsbUNBQWlDO0FBSWpDLE1BQWEsSUFBSTtJQWViLFlBQW1CLFFBQW1CLEVBQUUsY0FBOEI7UUFDbEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRDs7T0FFRztJQUNJLFFBQVEsQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ00sU0FBUztRQUVaLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCLFFBQVE7UUFDUixNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sRUFBRSxDQUFDO1FBRTVCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLFVBQVU7UUFDVixHQUFHO1lBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDeEIsTUFBTSxFQUFFLENBQUM7U0FDWixRQUFRLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFHNUIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLFdBQVc7UUFDWCxHQUFHO1lBQ0MsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsR0FBRztnQkFDQyxNQUFNLFFBQVEsR0FBYSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqQyxLQUFLLEVBQUUsQ0FBQzthQUNYLFFBQVEsS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUUzQixNQUFNLEVBQUUsQ0FBQztTQUNaLFFBQVEsTUFBTSxHQUFHLFNBQVMsRUFBRTtRQUU3QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7WUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDdkUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDNUIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRztpQkFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ00sR0FBRztRQUNOLE9BQU87SUFDWCxDQUFDO0NBRUo7QUFqRkQsb0JBaUZDIn0=