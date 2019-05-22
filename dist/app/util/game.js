"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poker_1 = require("./poker");
class Game {
    constructor(clubroom) {
        this.clubroom = clubroom;
        this.roundNumber = clubroom.round;
        this.poker = [];
        this.poker_user = [];
    }
    startRound() {
        this.roundNumber--;
        this.sendPoker();
    }
    sendPoker() {
        // 核对是否用bug
        for (const iterator of this.poker_user) {
            if (iterator.length !== 0) {
                return 'isbug';
            }
        }
        this.poker = [];
        this.poker_user = [];
        // 掏出一副牌
        const pokers = new poker_1.Pokers();
        // 假设只有6个人
        const plength = 6;
        let pindex = 0;
        // 初始化用户的牌
        do {
            this.poker[pindex] = [];
            this.poker_user[pindex] = [];
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
                this.poker_user[index].push(pokerone);
                index++;
            } while (index <= plength);
            sindex++;
        } while (sindex < sendcount);
        // 发牌，发四张
    }
    settlement() {
    }
    end() {
    }
}
exports.Game = Game;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC91dGlsL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtQ0FBaUM7QUFFakMsTUFBYSxJQUFJO0lBU2IsWUFBbUIsUUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ00sU0FBUztRQUNaLFdBQVc7UUFDWCxLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEMsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDdkIsT0FBTyxPQUFPLENBQUM7YUFDbEI7U0FDSjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCLFFBQVE7UUFDUixNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sRUFBRSxDQUFDO1FBRTVCLFVBQVU7UUFDVixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsVUFBVTtRQUNWLEdBQUc7WUFDQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM3QixNQUFNLEVBQUUsQ0FBQztTQUNaLFFBQVEsTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUc1QixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsV0FBVztRQUNYLEdBQUc7WUFDQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxHQUFHO2dCQUNDLE1BQU0sUUFBUSxHQUFhLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QyxLQUFLLEVBQUUsQ0FBQzthQUNYLFFBQVEsS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUMzQixNQUFNLEVBQUUsQ0FBQztTQUNaLFFBQVEsTUFBTSxHQUFHLFNBQVMsRUFBRTtRQUM3QixTQUFTO0lBSWIsQ0FBQztJQUNNLFVBQVU7SUFFakIsQ0FBQztJQUNNLEdBQUc7SUFFVixDQUFDO0NBRUo7QUFwRUQsb0JBb0VDIn0=