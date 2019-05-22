import { ITbl_room } from '../interface/models/tbl_room';
import { Pokers } from './poker';

export class Game {
    // 房间的配置信息
    private clubroom: ITbl_room;
    // 玩多少局
    private roundNumber: number;
    // 发的牌是什么 结算用
    private poker: number[][][];
    // 发的牌是什么 发给用户用 主要用户核对
    private poker_user: number[][][];
    public constructor(clubroom: ITbl_room) {
        this.clubroom = clubroom;
        this.roundNumber = clubroom.round;
        this.poker = [];
        this.poker_user = [];
    }
    public startRound() {
        this.roundNumber--;
        this.sendPoker();
    }
    public sendPoker() {
        // 核对是否用bug
        for (const iterator of this.poker_user) {
            if (iterator.length !== 0) {
                return 'isbug';
            }
        }
        this.poker = [];
        this.poker_user = [];

        // 掏出一副牌
        const pokers = new Pokers();

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
                const pokerone: number[] = pokers.getPoker();
                this.poker[index].push(pokerone);
                this.poker_user[index].push(pokerone);
                index++;
            } while (index <= plength);
            sindex++;
        } while (sindex < sendcount);
        // 发牌，发四张



    }
    public settlement() {

    }
    public end() {

    }

}
