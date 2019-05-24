"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poker_1 = require("./poker");
class Game {
    constructor(clubroom, globalChannelStatus, clubid) {
        this.clubroom = clubroom;
        this.globalChannelStatus = globalChannelStatus;
        // this.channel = channelService.getChannel(`${redisKeyPrefix.clubRoom}${clubroom.roomid}`);
        this.round = clubroom.round;
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
        this.round--;
        this.sendPoker();
    }
    sendPoker() {
        this.poker = [];
        this.poker_user = {};
        // 掏出一副牌
        const pokers = new poker_1.Pokers();
        // 玩家数量
        const ulength = this.users.length;
        // // 玩家数量
        // const ulength = 6;
        /**
         * 开始发牌
         */
        // 玩家的index
        let uindex = 0;
        // 发多少张牌
        const sendcount = 5;
        // 初始化用户的牌
        while (uindex < ulength) {
            this.poker[uindex] = [];
            // 当前发的第几张牌
            let pindex = 0;
            do {
                this.poker[uindex].push(pokers.lpop());
                pindex++;
            } while (pindex < sendcount);
            uindex++;
        }
        // this.poker.forEach((element, i) => {
        //     this.poker_user[this.users[i]] = element;
        //     // this.channelService.pushMessageByUids('onSendPoker', element.slice(0, 4), [{
        //     //     uid: `${this.users[sindex]}`,
        //     //     sid: this.channel.getMember(`${this.users[sindex]}`).sid
        //     // }]);
        // });
        console.log(this.poker);
    }
    settlement() {
        // 这个里还要有个结算
        this.channel.pushMessage('onSendPoker', this.poker_user);
        this.end();
    }
    end() {
        // 这里入库
    }
}
exports.Game = Game;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC91dGlsL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxtQ0FBaUM7QUFHakMsTUFBYSxJQUFJO0lBZWIsWUFBbUIsUUFBbUIsRUFBRSxtQkFBK0MsRUFBRSxNQUFjO1FBQ25HLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUMvQyw0RkFBNEY7UUFDNUYsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRDs7T0FFRztJQUNJLFFBQVEsQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFDTSxTQUFTO1FBRVosSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsUUFBUTtRQUNSLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBTSxFQUFFLENBQUM7UUFFNUIsT0FBTztRQUNQLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBRWxDLFVBQVU7UUFDVixxQkFBcUI7UUFDckI7O1dBRUc7UUFFSCxXQUFXO1FBQ1gsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsUUFBUTtRQUNSLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztRQUVwQixVQUFVO1FBQ1YsT0FBTyxNQUFNLEdBQUcsT0FBTyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLFdBQVc7WUFDWCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDZixHQUFHO2dCQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLEVBQUUsQ0FBQzthQUNaLFFBQVEsTUFBTSxHQUFHLFNBQVMsRUFBRTtZQUM3QixNQUFNLEVBQUUsQ0FBQztTQUNaO1FBRUQsdUNBQXVDO1FBQ3ZDLGdEQUFnRDtRQUNoRCxzRkFBc0Y7UUFDdEYsMkNBQTJDO1FBQzNDLHNFQUFzRTtRQUN0RSxjQUFjO1FBQ2QsTUFBTTtRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDTSxVQUFVO1FBQ2IsWUFBWTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNNLEdBQUc7UUFDTixPQUFPO0lBQ1gsQ0FBQztDQUVKO0FBdEZELG9CQXNGQyJ9