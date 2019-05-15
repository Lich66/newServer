"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poker_1 = require("./poker");
class Game {
    constructor(roomConfig, roundNumber) {
        this.roomConfig = roomConfig;
        this.roundNumber = roundNumber;
        this.poker = [];
    }
    nextRound() {
        this.roundNumber--;
        this.sendPoker();
    }
    sendPoker() {
        console.log('send');
        const pokers = new poker_1.Pokers();
        // 假设只有6个人
        const plength = 6;
        let pindex = 0;
        do {
            this.poker.push([]);
            pindex++;
        } while (pindex <= plength);
        const sendcount = 5;
        let sindex = 0;
        do {
            let index = 0;
            do {
                const pokerone = pokers.getPoker();
                this.poker[index].push(pokerone);
                index++;
            } while (index <= plength);
            sindex++;
        } while (sindex <= sendcount);
        if (this.roundNumber < 1) {
            this.end();
        }
        this.roundEnd();
    }
    roundEnd() {
    }
    end() {
    }
}
exports.Game = Game;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC91dGlsL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUM7QUFFakM7SUFLSSxZQUFtQixVQUFzQixFQUFFLFdBQW1CO1FBQzFELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDTSxTQUFTO1FBQ1osSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ00sU0FBUztRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFNLEVBQUUsQ0FBQztRQUU1QixVQUFVO1FBQ1YsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLEdBQUc7WUFDQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQixNQUFNLEVBQUUsQ0FBQztTQUNaLFFBQVEsTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUU1QixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFFcEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsR0FBRztZQUNDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLEdBQUc7Z0JBQ0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakMsS0FBSyxFQUFFLENBQUM7YUFDWCxRQUFRLEtBQUssSUFBSSxPQUFPLEVBQUU7WUFDM0IsTUFBTSxFQUFFLENBQUM7U0FDWixRQUFRLE1BQU0sSUFBSSxTQUFTLEVBQUU7UUFHOUIsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ00sUUFBUTtJQUVmLENBQUM7SUFDTSxHQUFHO0lBRVYsQ0FBQztDQUVKO0FBcERELG9CQW9EQyJ9