"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poker_1 = require("./poker");
class Game {
    constructor(roomConfig, roundNumber) {
        this.roomConfig = roomConfig;
        this.roundNumber = roundNumber;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC91dGlsL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUM7QUFFakMsTUFBYSxJQUFJO0lBU2IsWUFBbUIsVUFBc0IsRUFBRSxXQUFtQjtRQUMxRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ00sVUFBVTtRQUNiLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNNLFNBQVM7UUFDWixXQUFXO1FBQ1gsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sT0FBTyxDQUFDO2FBQ2xCO1NBQ0o7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVyQixRQUFRO1FBQ1IsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFNLEVBQUUsQ0FBQztRQUU1QixVQUFVO1FBQ1YsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLFVBQVU7UUFDVixHQUFHO1lBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDN0IsTUFBTSxFQUFFLENBQUM7U0FDWixRQUFRLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFHNUIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLFdBQVc7UUFDWCxHQUFHO1lBQ0MsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsR0FBRztnQkFDQyxNQUFNLFFBQVEsR0FBYSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEMsS0FBSyxFQUFFLENBQUM7YUFDWCxRQUFRLEtBQUssSUFBSSxPQUFPLEVBQUU7WUFDM0IsTUFBTSxFQUFFLENBQUM7U0FDWixRQUFRLE1BQU0sR0FBRyxTQUFTLEVBQUU7UUFDN0IsU0FBUztJQUliLENBQUM7SUFDTSxVQUFVO0lBRWpCLENBQUM7SUFDTSxHQUFHO0lBRVYsQ0FBQztDQUVKO0FBcEVELG9CQW9FQyJ9