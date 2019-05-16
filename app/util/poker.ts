

const pokerlength = 12;
export class Pokers {
    private number = 0;
    private pokers = [
        [true, true, true, true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true, true, true, true]
    ];
    public constructor() {

    }
    public getPoker(): number[] {
        this.number++;
        let x = Number.parseInt((Math.random() * 3).toFixed(0), 0);
        let y = Number.parseInt((Math.random() * pokerlength).toFixed(0), 0);
        // console.log(this.pokers[x][y]);
        if (this.pokers[x][y]) {
            this.pokers[x][y] = false;
            // console.log(this.number);
            // console.log([x + 1, y + 1])
            return [x + 1, y + 1];
        } else {
            return this.getPoker();
        }
    }
}


