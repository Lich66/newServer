"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clubRoomState_1 = require("../controller/redis/clubRoomState/clubRoomState");
const nameSpace_1 = require("../gameConfig/nameSpace");
const socketRouterConfig_1 = require("../gameConfig/socketRouterConfig");
const poker_1 = require("./poker");
const grabBankerTime = 10000;
const betTime = 10000;
const entireTime = 45000;
class Game {
    constructor(clubroom, handler, clubid, roomid) {
        this.clubroom = clubroom;
        this.roomid = roomid;
        this.clubid = clubid;
        this.globalChannelStatus = handler.getGlobalChannelServiceStatus();
        this.round = clubroom.round;
        this.step = 0;
    }
    start() {
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
        // 掏出一副牌
        const pokers = new poker_1.Pokers();
        this.players = await clubRoomState_1.ClubRoomState.getClubRoomAllChairsState({ clubid: this.clubid, roomid: this.roomid });
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
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 1, playerPoker }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${this.roomid}`);
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
        const playerPoker = {};
        this.playersId.forEach((e, i) => {
            playerPoker[e] = this.poker[i];
        });
        this.globalChannelStatus.pushMessageByChannelName('connector', `${socketRouterConfig_1.default.onStep}`, { step: 4, bet: this.betJson, playerPoker }, `${nameSpace_1.gameChannelKeyPrefix.clubRoom}${this.roomid}`);
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
exports.Game = Game;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC91dGlsL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtRkFBZ0Y7QUFDaEYsdURBQStEO0FBQy9ELHlFQUE0RDtBQUc1RCxtQ0FBaUM7QUFHakMsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBRTdCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQztBQUV0QixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFHekIsTUFBYSxJQUFJO0lBbUNiLFlBQW1CLFFBQW1CLEVBQUUsT0FBZ0IsRUFBRSxNQUFjLEVBQUUsTUFBYztRQUNwRixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFDTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUMxQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFHTSxTQUFTO1FBQ1osTUFBTTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FB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