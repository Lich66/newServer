import { Pokers } from './poker';

export class Game {
    private roomConfig: number[][];
    private roundNumber: number;
    private pokers: Pokers;
    private poker: string[][];
    public constructor(roomConfig: number[][], roundNumber: number) {
        this.roomConfig = roomConfig;
        this.roundNumber = roundNumber;
        this.poker = [];
    }
    public nextRound() {
        this.roundNumber--;
        this.sendPoker();
    }
    public sendPoker() {
        console.log('send');
        const pokers = new Pokers();
        
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
    public roundEnd() {

    }
    public end() {

    }

}
