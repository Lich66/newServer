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
        let players = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${this.roomid}${nameSpace_1.redisKeyPrefix.chair}`);
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
            let user = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.user}${iterator}`);
            let map = { userId: user.userid, userNick: user.usernick, image: user.image, robCount: 0, bankerCount: 0, pushCount: 0, score: 0 };
            this.playersInfo[iterator] = map;
        }
        console.log('开始游戏,房间内玩家信息: ' + JSON.stringify(this.playersInfo));
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
            return;
        }
        // 开始当前局
        this.round++;
        // await this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouter.onStep}`, { step: 0 }, `${gameChannelKeyPrefix.clubRoom}${this.roomid}`);
        this.sendPoker();
    }
    async sendPoker() {
        this.step = 1;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 1 }, `${nameSpace_1.gameChannelKeyPrefix.room}${this.roomid}`);
        // 掏出一副牌
        const pokers = new poker_1.Pokers();
        let players = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${this.roomid}${nameSpace_1.redisKeyPrefix.chair}`);
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
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onSendPoker}`, playerPoker, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${this.roomid}`);
        this.grabBanker();
    }
    grabBanker() {
        // 抢庄阶段
        this.step = 2;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 2 }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${this.roomid}`);
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
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 3, banker: this.banker }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${this.roomid}`);
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
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 4, bet: this.betJson }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${this.roomid}`);
        const playerPoker = {};
        this.playersId.forEach((e, i) => {
            playerPoker[e] = this.poker[i];
        });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onSettlement}`, playerPoker, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${this.roomid}`);
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
}
exports.RoomGame = RoomGame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUdhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9yb29tR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVFQUFvRTtBQUNwRSxrREFBK0M7QUFDL0MsdUNBQTBDO0FBQzFDLHVEQUErRTtBQUMvRSx5RUFBNEQ7QUFDNUQseURBQXNEO0FBR3RELHlDQUFzQztBQUN0QyxtQ0FBaUM7QUFFakM7O0dBRUc7QUFDSCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDN0I7O0dBRUc7QUFDSCxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUM7QUFDN0I7O0dBRUc7QUFDSCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDdEI7O0dBRUc7QUFDSCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFFekIsTUFBYSxRQUFRO0lBNkNqQixZQUFtQixJQUFnQixFQUFFLE9BQW9CO1FBeEJ6RCxPQUFPO1FBQ0MsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQWlCakMsNENBQTRDO1FBQ3BDLGdCQUFXLEdBQU8sRUFBRSxDQUFDO1FBQzdCLDJFQUEyRTtRQUNuRSxpQkFBWSxHQUFTLEVBQUUsQ0FBQztRQUk1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFD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