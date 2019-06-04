import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { redisClient } from '../db/redis';
import { gameChannelKeyPrefix, redisKeyPrefix } from '../gameConfig/nameSpace';
import socketRouter from '../gameConfig/socketRouterConfig';
import { IRoomRedis } from '../interface/room/roomInterfaces';
import { RoomHandler } from '../servers/Room/handler/RoomHandler';
import { Pokers } from './poker';


const grabBankerTime = 10000;

const betTime = 10000;

const entireTime = 45000;


export class RoomGame {

    private timer: NodeJS.Timer;
    // roomid
    private roomid: number;
    // 房间的信息
    private room: IRoomRedis;
    // 哪个阶段
    /**
     * -1:未开始
     * 0:开始
     * 1:发牌
     * 2:抢庄
     * 3:下注
     * 4:结算
     */
    private step: number;
    // 玩多少局
    private round: number;
    // 发的牌是什么
    private poker: number[][][];
    // players
    private players: any;
    // 用户id
    private playersId: number[];

    // 抢庄的原始数据
    private bankerJSON: { [key: number]: number };
    // 庄家是谁
    private banker: number;
    // 下注是谁
    private betJson: { [key: number]: number };
    // 频道
    private globalChannelStatus: GlobalChannelServiceStatus;
    public constructor(room: IRoomRedis, handler: RoomHandler) {
        this.room = room;
        this.roomid = parseInt(room.roomId, 0);
        this.globalChannelStatus = handler.getGlobalChannelServiceStatus();
        this.round = parseInt(room.round, 0);
        this.step = 0;
    }
    public start() {
        this.nextRound();
        this.timer = setInterval(() => {
            this.nextRound();
        }, entireTime);
    }


    public nextRound() {
        // 初始化
        this.poker = [];
        this.playersId = [];
        this.players = {};
        this.step = 0;
        this.bankerJSON = {};
        this.banker = -1;
        this.betJson = {};
        if (this.round < 1) {
            clearInterval(this.timer);
            return;
        }
        // 开始当前局
        this.round--;
        this.sendPoker();
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStep}`, { step: 0 }, `${gameChannelKeyPrefix.clubRoom}${this.roomid}`);
    }

    public async sendPoker() {
        this.step = 1;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStep}`, { step: 1 }, `${gameChannelKeyPrefix.clubRoom}${this.roomid}`);
        // 掏出一副牌
        const pokers = new Pokers();
        this.players = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${this.roomid}${redisKeyPrefix.roomUsers}`);
        // 玩家数量
        let ulength = 0;
        for (const key in this.players) {
            if (this.players.hasOwnProperty(key)) {
                const element = this.players[key];
                if (element > 0) {
                    ulength++;
                    this.playersId.push(element);
                }
            }
        }
        // const ulength = this.users.length;

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
        const playerPoker = {};
        this.playersId.forEach((e, i) => {
            playerPoker[e] = this.poker[i].slice(0, 4);
        });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onSendPoker}`, playerPoker, `${gameChannelKeyPrefix.clubRoom}${this.roomid}`);
        this.grabBanker();
    }
    public grabBanker() {
        // 抢庄阶段
        this.step = 2;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStep}`, { step: 2 }, `${gameChannelKeyPrefix.clubRoom}${this.roomid}`);
        setTimeout(() => {
            this.setBet();
        }, grabBankerTime);
    }
    public setBet() {
        // 下注之前决定谁是庄家
        const values = Object.values(this.bankerJSON);
        const bankerList = [];
        if (values.length == 0) {
            // const keys = Object.keys(this.bankerJSON).map((item) => Number.parseInt(item, 0));
            this.banker = this.playersId[Number.parseInt((Math.random() * this.playersId.length).toFixed(0), 0)];
        } else {
            const arr: number[] = values.sort((a: number, b: number) => b - a);
            for (const key in this.bankerJSON) {
                if (this.bankerJSON.hasOwnProperty(key)) {
                    const element = this.bankerJSON[key];
                    if (element == arr[0]) {
                        bankerList.push(Number.parseInt(key, 0));
                    }

                }
            }
            this.banker = bankerList[Number.parseInt((Math.random() * bankerList.length).toFixed(0), 0)];
        }
        // 开始下注
        this.step = 3;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStep}`, { step: 3, banker: this.banker }, `${gameChannelKeyPrefix.clubRoom}${this.roomid}`);
        setTimeout(() => {
            this.settlement();
        }, betTime);
    }
    public settlement() {
        for (const iterator of this.playersId) {
            if (!this.betJson[iterator]) {
                this.betJson[iterator] = 100;
            }
        }
        this.step = 4;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStep}`, { step: 4, bet: this.betJson }, `${gameChannelKeyPrefix.clubRoom}${this.roomid}`);
        const playerPoker = {};
        this.playersId.forEach((e, i) => {
            playerPoker[e] = this.poker[i];
        });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onSettlement}`, playerPoker, `${gameChannelKeyPrefix.clubRoom}${this.roomid}`);
        this.end();
    }
    public end() {
        // 这里入库
    }



    public userGrabBanker(json: any): number {
        if (this.step != 2) {
            return 5;
        }
        this.bankerJSON = { ...this.bankerJSON, ...json };
        return 0;
    }

    public userSetBet(json: any): number {
        if (this.step != 3) {
            return 5;
        }
        this.betJson = { ...this.betJson, ...json };
        return 0;
    }

}
