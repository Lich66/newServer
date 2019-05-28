"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clubRoomState_1 = require("../controller/redis/clubRoomState/clubRoomState");
const nameSpace_1 = require("../gameConfig/nameSpace");
const socketRouterConfig_1 = require("../gameConfig/socketRouterConfig");
const poker_1 = require("./poker");
const grabBankerTime = 3000;
const betTime = 2000;
const entireTime = 8000;
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
exports.Game = Game;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC91dGlsL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtRkFBZ0Y7QUFDaEYsdURBQStEO0FBQy9ELHlFQUE0RDtBQUc1RCxtQ0FBaUM7QUFHakMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBRTVCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztBQUVyQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFHeEIsTUFBYSxJQUFJO0lBbUNiLFlBQW1CLFFBQW1CLEVBQUUsT0FBZ0IsRUFBRSxNQUFjLEVBQUUsTUFBYztRQUNwRixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFDTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUdNLFNBQVM7UUFDWixNQUFNO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FB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