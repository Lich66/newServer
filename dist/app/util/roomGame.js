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
        this.room = room;
        this.roomid = parseInt(room.roomId, 0);
        this.globalChannelStatus = handler.getGlobalChannelServiceStatus();
        this.round = parseInt(room.round, 0);
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
        console.log('清除定时器!');
        clearInterval(this.timer);
    }
    start() {
        this.stopTimer();
        this.nextRound();
        this.timer = setInterval(() => {
            this.nextRound();
        }, entireTime);
    }
    nextRound() {
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
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 0 }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${this.roomid}`);
    }
    async sendPoker() {
        this.step = 1;
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 1 }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${this.roomid}`);
        // 掏出一副牌
        const pokers = new poker_1.Pokers();
        this.players = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${this.roomid}${nameSpace_1.redisKeyPrefix.roomUsers}`);
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
}
exports.RoomGame = RoomGame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUdhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9yb29tR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVFQUFvRTtBQUNwRSxrREFBK0M7QUFDL0MsdUNBQTBDO0FBQzFDLHVEQUErRTtBQUMvRSx5RUFBNEQ7QUFDNUQseURBQXNEO0FBR3RELHlDQUFzQztBQUN0QyxtQ0FBaUM7QUFFakM7O0dBRUc7QUFDSCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDN0I7O0dBRUc7QUFDSCxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUM7QUFDN0I7O0dBRUc7QUFDSCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDdEI7O0dBRUc7QUFDSCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFFekIsTUFBYSxRQUFRO0lBa0NqQixZQUFtQixJQUFnQixFQUFFLE9BQW9CO1FBQ3JELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsNENBQTRDO1lBQzVDLElBQUksT0FBTyxHQUFHLE1BQU0sbUJBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyww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