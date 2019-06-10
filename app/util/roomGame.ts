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
    // 当前对局回合
    private round: number;
    // 发的牌是什么
    private poker: number[][][];
    // 用户id
    private playersId: number[] = [];

    // 抢庄的原始数据
    private bankerJSON: { [key: number]: number };
    // 庄家是谁
    private banker: number;
    // 下注是谁
    private betJson: { [key: number]: number };
    // 频道
    private globalChannelStatus: GlobalChannelServiceStatus;

    // 开始游戏时间
    private starttime: Date;
    // 结束游戏时间
    private endtime: Date;
    // 结束类型(正常:0,解散:1)
    private endtype: number;
    // 玩家信息=> {账号:{账号,昵称,头像,抢庄次数,庄家次数,推注次数,总分数}}
    private playersInfo: {} = {};
    // 详细战绩=> [[{poker:xx,cardValue:xx,score:xx,bankerBet:xx,bet:xx},...],...] 
    private detailreport: [][] = [];


    public constructor(room: IRoomRedis, handler: RoomHandler) {
        this.room = room;
        this.roomid = parseInt(room.roomId, 0);
        this.globalChannelStatus = handler.getGlobalChannelServiceStatus();
        this.round = 0;
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
        console.log('关闭定时器!');
        clearInterval(this.timer);
    }

    public async start() {
        this.stopTimer();
        this.starttime = new Date();
        let players = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${this.roomid}${redisKeyPrefix.chair}`);
        // 玩家数量
        for (const key in players) {
            if (players.hasOwnProperty(key)) {
                const element = parseInt(players[key], 0);
                if (element > 0) {
                    this.playersId.push(element);
                }
            }
        }
        for (const iterator of this.playersId) {
            let user = await redisClient.hgetallAsync(`${redisKeyPrefix.user}${iterator}`);
            let map = { userId: user.userid, userNick: user.usernick, image: user.image, robCount: 0, bankerCount: 0, pushCount: 0, score: 0 };
            this.playersInfo[iterator] = map;
        }
        console.log('开始游戏,房间内玩家信息: ' + JSON.stringify(this.playersInfo));
        this.nextRound();
        this.timer = setInterval(() => {
            this.nextRound();
        }, entireTime);
    }

    public async nextRound() {
        // 初始化
        this.poker = [];
        this.step = 0;
        this.bankerJSON = {};
        this.banker = -1;
        this.betJson = {};
        if (this.round > parseInt(this.room.round, 0)) {
            clearInterval(this.timer);
            // todo 游戏结束

            return;
        }
        // 开始当前局
        this.round++;
        // await this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStep}`, { step: 0 }, `${gameChannelKeyPrefix.clubRoom}${this.roomid}`);
        this.sendPoker();
    }

    public async sendPoker() {
        this.step = 1;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStep}`, { step: 1 }, `${gameChannelKeyPrefix.room}${this.roomid}`);
        // 掏出一副牌
        const pokers = new Pokers();
        let players = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${this.roomid}${redisKeyPrefix.chair}`);
        // 玩家数量
        let ulength = this.playersId.length;
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
        console.log('玩家手中的牌为: ' + JSON.stringify(this.poker));
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

    /**
     * 设置结束类型
     * @param endtype 结束类型
     */
    public setEndType(endtype: number) {
        this.endtype = endtype;
    }
    /**
     * 获取结束类型
     */
    public getEndType() {
        return this.endtype;
    }

}
