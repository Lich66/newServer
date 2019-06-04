const num11 = 11;
const num12 = 12;
const num13 = 13;
export class Pokers {
    private pokers = [
        [1, 1],     // 方片
        [1, 2],
        [1, 3],
        [1, 4],
        [1, 5],
        [1, 6],
        [1, 7],
        [1, 8],
        [1, 9],
        [1, 10],
        [1, num11],
        [1, num12],
        [1, num13],
        [2, 1],     // 梅花
        [2, 2],
        [2, 3],
        [2, 4],
        [2, 5],
        [2, 6],
        [2, 7],
        [2, 8],
        [2, 9],
        [2, 10],
        [2, num11],
        [2, num12],
        [2, num13],
        [3, 1],     // 红桃
        [3, 2],
        [3, 3],
        [3, 4],
        [3, 5],
        [3, 6],
        [3, 7],
        [3, 8],
        [3, 9],
        [3, 10],
        [3, num11],
        [3, num12],
        [3, num13],
        [4, 1],     // 黑桃
        [4, 2],
        [4, 3],
        [4, 4],
        [4, 5],
        [4, 6],
        [4, 7],
        [4, 8],
        [4, 9],
        [4, 10],
        [4, num11],
        [4, num12],
        [4, num13],
        [5, 0], // 小王
        [6, 0]  // 大王
    ];
    public constructor() {
        const MAXINDEX = 53;
        let random = Math.random();
        this.pokers.forEach((element, i) => {
            if (i == MAXINDEX) {
                return;
            }
            random = Number.parseInt((Math.random() * (MAXINDEX - i - 1)).toFixed(0), 0) + i + 1;
            this.pokers[i][0] = this.pokers[i][0] + this.pokers[random][0];
            this.pokers[random][0] = this.pokers[i][0] - this.pokers[random][0];
            this.pokers[i][0] = this.pokers[i][0] - this.pokers[random][0];

            this.pokers[i][1] = this.pokers[i][1] + this.pokers[random][1];
            this.pokers[random][1] = this.pokers[i][1] - this.pokers[random][1];
            this.pokers[i][1] = this.pokers[i][1] - this.pokers[random][1];
        });
    }
    public getPokers(): number[][] {
        return this.pokers;
    }
    public lpop(): number[] {
        return this.pokers.shift();
    }
    public lpopWhitoutJoker(): number[] {
        const poker = this.pokers[0];
        if (poker[0][1] == 0) {
            const random = Number.parseInt((Math.random() * (this.pokers.length - 1 - 1)).toFixed(0), 0) + 1;
            this.pokers[0][0] = this.pokers[0][0] + this.pokers[random][0];
            this.pokers[random][0] = this.pokers[0][0] - this.pokers[random][0];
            this.pokers[0][0] = this.pokers[0][0] - this.pokers[random][0];

            this.pokers[0][1] = this.pokers[0][1] + this.pokers[random][1];
            this.pokers[random][1] = this.pokers[0][1] - this.pokers[random][1];
            this.pokers[0][1] = this.pokers[0][1] - this.pokers[random][1];
        }
        return this.pokers.shift();
    }
}
