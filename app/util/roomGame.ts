import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { RedisKeys } from '../controller/redis/redisKeys/redisKeys';
import { User } from '../controller/user/user';
import { redisClient } from '../db/redis';
import { gameChannelKeyPrefix, redisKeyPrefix } from '../gameConfig/nameSpace';
import socketRouter from '../gameConfig/socketRouterConfig';
import { userConfig } from '../gameConfig/userConfig';
import { IRoomRedis } from '../interface/room/roomInterfaces';
import { RoomHandler } from '../servers/Room/handler/RoomHandler';
import { GameUitl } from './gameUitl';
import { Pokers } from './poker';

/**
 * 未开始,房间存在时间
 */
const existenceTime = 600000;  
/**
 * 抢庄时间
 */
const grabBankerTime = 10000;
/**
 * 下注时间
 */
const betTime = 10000;
/**
 * 每回合总时间
 */
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
        this.step = -1;
        this.timer = setInterval(async () => {
            console.log('时间到,房间还未开始游戏,进行删除数据');
            this.stopTimer();
            // todo 销毁房间,通知房间里的玩家,删除玩家redis中的房间数据,删除房间数据
            let creator = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${this.room.creatorId}`);
            // 将钻石返还给房主
            if (parseInt(room.payType, 0) === 0) {
                let needDaimond = await GameUitl.getRoomRate2(parseInt(room.playerNum, 0), parseInt(room.round, 0), parseInt(room.PayType, 0));
                let userDaimond = parseInt(creator.diamond, 0);
                let result = await User.updateUser({ userid: parseInt(creator.userid, 0) }, { diamond: (needDaimond + userDaimond) });
                if (result !== 1) {
                    console.log('钻石返还给房主失败!');
                }
                await redisClient.hsetAsync(`${redisKeyPrefix.user}${creator.userid}`, `${userConfig.diamond}`, `${needDaimond + userDaimond}`);
            }
            let roomUsers = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${this.roomid}${redisKeyPrefix.roomUsers}`);
            // 删除user上的roomId
            for (const key in roomUsers) {
                if (roomUsers.hasOwnProperty(key)) {
                    await redisClient.hdelAsync(`${redisKeyPrefix.user}${key}`, `${userConfig.roomId}`);
                }
            }
            // 删除玩家房间列表中该条房间数据
            await redisClient.lremAsync(`${redisKeyPrefix.userRoomList}${creator.userid}`, 1, `${this.roomid}`);
            // 删除房间
            await RedisKeys.delAsync(`${redisKeyPrefix.room}${this.roomid}`);
            // 删除房间用户
            await RedisKeys.delAsync(`${redisKeyPrefix.room}${this.roomid}${redisKeyPrefix.roomUsers}`);
            // 删除房间椅子表
            await RedisKeys.delAsync(`${redisKeyPrefix.room}${this.roomid}${redisKeyPrefix.chair}`);
            // 通知玩家房间解散
            await this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onDestoryRoom}`, {}, `${gameChannelKeyPrefix.room}${this.roomid}`);
            await this.globalChannelStatus.destroyChannel(`${gameChannelKeyPrefix.room}${this.roomid}`);
        }, existenceTime);
    }

    public stopTimer() {
        console.log('清除定时器!');
        clearInterval(this.timer);
    }

    public start() {
        this.stopTimer();
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
