"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisKeys_1 = require("../controller/redis/redisKeys/redisKeys");
const user_1 = require("../controller/user/user");
const redis_1 = require("../db/redis");
const nameSpace_1 = require("../gameConfig/nameSpace");
const socketRouterConfig_1 = require("../gameConfig/socketRouterConfig");
const userConfig_1 = require("../gameConfig/userConfig");
const gameUitl_1 = require("./gameUitl");
const poker_1 = require("./poker");
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
class RoomGame {
    constructor(room, handler) {
        // 用户id
        this.playersId = [];
        // 玩家信息=> {账号:{账号,昵称,头像,抢庄次数,庄家次数,推注次数,总分数}}
        this.playersInfo = {};
        // 详细战绩=> [[{poker:xx,cardValue:xx,score:xx,bankerBet:xx,bet:xx},...],...] 
        this.detailreport = [];
        this.room = room;
        this.roomid = parseInt(room.roomId, 0);
        this.globalChannelStatus = handler.getGlobalChannelServiceStatus();
        this.round = 0;
        this.step = -1;
        this.timer = setInterval(async () => {
            console.log('时间到,房间还未开始游戏,进行删除数据');
            this.stopTimer();
            // todo 销毁房间,通知房间里的玩家,删除玩家redis中的房间数据,删除房间数据
            let creator = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${this.room.creatorId}`);
            // 将钻石返还给房主
            if (parseInt(room.payType, 0) === 0) {
                let needDaimond = await gameUitl_1.GameUitl.getRoomRate2(parseInt(room.playerNum, 0), parseInt(room.round, 0), parseInt(room.PayType, 0));
                let userDaimond = parseInt(creator.diamond, 0);
                let result = await user_1.User.updateUser({ userid: parseInt(creator.userid, 0) }, { diamond: (needDaimond + userDaimond) });
                if (result !== 1) {
                    console.log('钻石返还给房主失败!');
                }
                await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${creator.userid}`, `${userConfig_1.userConfig.diamond}`, `${needDaimond + userDaimond}`);
            }
            let roomUsers = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${this.roomid}${nameSpace_1.redisKeyPrefix.roomUsers}`);
            // 删除user上的roomId
            for (const key in roomUsers) {
                if (roomUsers.hasOwnProperty(key)) {
                    await redis_1.redisClient.hdelAsync(`${nameSpace_1.redisKeyPrefix.user}${key}`, `${userConfig_1.userConfig.roomId}`);
                }
            }
            // 删除玩家房间列表中该条房间数据
            await redis_1.redisClient.lremAsync(`${nameSpace_1.redisKeyPrefix.userRoomList}${creator.userid}`, 1, `${this.roomid}`);
            // 删除房间
            await redisKeys_1.RedisKeys.delAsync(`${nameSpace_1.redisKeyPrefix.room}${this.roomid}`);
            // 删除房间用户
            await redisKeys_1.RedisKeys.delAsync(`${nameSpace_1.redisKeyPrefix.room}${this.roomid}${nameSpace_1.redisKeyPrefix.roomUsers}`);
            // 删除房间椅子表
            await redisKeys_1.RedisKeys.delAsync(`${nameSpace_1.redisKeyPrefix.room}${this.roomid}${nameSpace_1.redisKeyPrefix.chair}`);
            // 通知玩家房间解散
            await this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onDestoryRoom}`, {}, `${nameSpace_1.gameChannelKeyPrefix.room}${this.roomid}`);
            await this.globalChannelStatus.destroyChannel(`${nameSpace_1.gameChannelKeyPrefix.room}${this.roomid}`);
        }, existenceTime);
    }
    stopTimer() {
        console.log('关闭定时器!');
        clearInterval(this.timer);
    }
    async start() {
        this.stopTimer();
        this.starttime = new Date();
        await this.getGamingUser();
        this.nextRound();
        this.timer = setInterval(() => {
            this.nextRound();
        }, entireTime);
    }
    async nextRound() {
        // 初始化
        this.poker = [];
        this.step = 0;
        this.bankerJSON = {};
        this.banker = -1;
        this.betJson = {};
        if (this.round > parseInt(this.room.round, 0)) {
            clearInterval(this.timer);
            // todo 游戏结束
            this.endtime = new Date();
            return;
        }
        // 开始当前局
        this.round++;
        // await this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStep}`, { step: 0 }, `${gameChannelKeyPrefix.room}${this.roomid}`);
        this.sendPoker();
    }
    async sendPoker() {
        this.step = 1;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 1 }, `${nameSpace_1.gameChannelKeyPrefix.room}${this.roomid}`);
        // 掏出一副牌
        const pokers = new poker_1.Pokers();
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
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onSendPoker}`, playerPoker, `${nameSpace_1.gameChannelKeyPrefix.room}${this.roomid}`);
        this.grabBanker();
    }
    grabBanker() {
        // 抢庄阶段
        this.step = 2;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 2 }, `${nameSpace_1.gameChannelKeyPrefix.room}${this.roomid}`);
        setTimeout(() => {
            this.setBet();
        }, grabBankerTime);
    }
    setBet() {
        // 下注之前决定谁是庄家
        const values = Object.values(this.bankerJSON);
        const bankerList = [];
        if (values.length == 0) {
            // const keys = Object.keys(this.bankerJSON).map((item) => Number.parseInt(item, 0));
            this.banker = this.playersId[Number.parseInt((Math.random() * this.playersId.length).toFixed(0), 0)];
        }
        else {
            const arr = values.sort((a, b) => b - a);
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
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 3, banker: this.banker }, `${nameSpace_1.gameChannelKeyPrefix.room}${this.roomid}`);
        setTimeout(() => {
            this.settlement();
        }, betTime);
    }
    settlement() {
        for (const iterator of this.playersId) {
            if (!this.betJson[iterator]) {
                this.betJson[iterator] = 100;
            }
        }
        this.step = 4;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 4, bet: this.betJson }, `${nameSpace_1.gameChannelKeyPrefix.room}${this.roomid}`);
        const playerPoker = {};
        this.playersId.forEach((e, i) => {
            playerPoker[e] = this.poker[i];
        });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onSettlement}`, playerPoker, `${nameSpace_1.gameChannelKeyPrefix.room}${this.roomid}`);
        this.end();
    }
    end() {
        // 这里入库
    }
    userGrabBanker(json) {
        if (this.step != 2) {
            return 5;
        }
        this.bankerJSON = Object.assign({}, this.bankerJSON, json);
        return 0;
    }
    userSetBet(json) {
        if (this.step != 3) {
            return 5;
        }
        this.betJson = Object.assign({}, this.betJson, json);
        return 0;
    }
    /**
     * 设置结束类型
     * @param endtype 结束类型
     */
    setEndType(endtype) {
        this.endtype = endtype;
    }
    /**
     * 获取结束类型
     */
    getEndType() {
        return this.endtype;
    }
    /**
     * 获取玩家id列表和玩家信息列表
     */
    async getGamingUser() {
        let players = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${this.roomid}${nameSpace_1.redisKeyPrefix.chair}`);
        for (const key in players) {
            if (players.hasOwnProperty(key)) {
                const element = parseInt(players[key], 0);
                if (element > 0) {
                    this.playersId.push(element);
                }
            }
        }
        for (const iterator of this.playersId) {
            let user = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${iterator}`);
            let map = { userId: user.userid, userNick: user.usernick, image: user.image, robCount: 0, bankerCount: 0, pushCount: 0, score: 0 };
            this.playersInfo[iterator] = map;
        }
        console.log('开始游戏,房间内玩家列表: ' + JSON.stringify(this.playersId));
        console.log('开始游戏,房间内玩家信息: ' + JSON.stringify(this.playersInfo));
    }
}
exports.RoomGame = RoomGame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUdhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9yb29tR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVFQUFvRTtBQUNwRSxrREFBK0M7QUFDL0MsdUNBQTBDO0FBQzFDLHVEQUErRTtBQUMvRSx5RUFBNEQ7QUFDNUQseURBQXNEO0FBR3RELHlDQUFzQztBQUN0QyxtQ0FBaUM7QUFFakM7O0dBRUc7QUFDSCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDN0I7O0dBRUc7QUFDSCxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUM7QUFDN0I7O0dBRUc7QUFDSCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDdEI7O0dBRUc7QUFDSCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFFekIsTUFBYSxRQUFRO0lBNkNqQixZQUFtQixJQUFnQixFQUFFLE9BQW9CO1FBeEJ6RCxPQUFPO1FBQ0MsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQWlCakMsNENBQTRDO1FBQ3BDLGdCQUFXLEdBQU8sRUFBRSxDQUFDO1FBQzdCLDJFQUEyRTtRQUNuRSxpQkFBWSxHQUFTLEVBQUUsQ0FBQztRQUk1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFD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