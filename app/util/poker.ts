

const pokerlength = 12;
export class Pokers {
    private pokers = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
    ];
    public constructor() {

    }
    public getPoker() {
        let x = Number.parseInt((Math.random() * 3).toFixed(0), 0) ;
        let y = Number.parseInt((Math.random() * pokerlength).toFixed(0), 0);
        if (this.pokers[x][y]) {
            const poker = this.pokers[x][y];
            this.pokers[x][y] = '';
            return poker;
        } else {
            this.getPoker();
        }
    }
}


