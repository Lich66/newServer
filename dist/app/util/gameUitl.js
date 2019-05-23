"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../db/redis");
const roomConfig_1 = require("../gameConfig/roomConfig");
const memoryConfig_1 = require("./memoryConfig");
const NUMBER11 = 11;
const NUMBER12 = 12;
const NUMBER13 = 13;
const NUMBER14 = 14;
const NUMBER15 = 15;
const NUMBER16 = 16;
const NUMBER17 = 17;
const NUMBER18 = 18;
const NUMBER19 = 19;
const NUMBER20 = 20;
const NUMBER21 = 21;
const NUMBER22 = 22;
class GameUitl {
    /**
     * 获取6位的房间ID
     * @return number
     */
    static generateRoomId() {
        let roomId = '';
        for (let i = 0; i < 6; ++i) {
            roomId += Math.floor(Math.random() * 10);
        }
        return parseInt(roomId, 0);
    }
    /**
     * 获取本地时间
     * @returns string    xxxx.xx.xx xx:xx:xx
     */
    static getLocalDateStr() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let dateStr = year + '/' + month + '/' + day + '  ' + hours + ':' + minutes + ':' + seconds;
        return dateStr;
    }
    /**
     * 十六进制转8位二进制
     * @param str 十六进制字符串
     * @return 8位的二进制字符串
     */
    static hex_to_bin(str) {
        let binstr = parseInt(str, 16).toString(2); // 16进制转成2进制
        for (let i = binstr.length; i < 8; i++) {
            binstr = `0${binstr}`;
        }
        return binstr;
    }
    /**
     * 二进制转十六进制
     * @param str 二进制字符串
     * * @return 16进制字符串
     */
    static bin_to_hex(str) {
        const num = 16;
        let hexstr = parseInt(str, 2).toString(num); // 2进制转成16进制
        return hexstr;
    }
    /**
     * 计算房费(房间规则解析前)
     * @param playerNum 几人桌 config[1]
     * @param round 局数 config[3]
     * @param payType 支付方式 config[4]
     * @returns 房费
     */
    static getRoomRate1(playerNum, round, payType) {
        let needDiamond;
        if (payType === 0) {
            needDiamond = roomConfig_1.RoomConfig.round[round] / 10;
        }
        else {
            needDiamond = roomConfig_1.RoomConfig.playerNum[playerNum] * roomConfig_1.RoomConfig.round[round] / NUMBER20;
        }
        return needDiamond;
    }
    /**
     * 计算房费(房间规则解析后)
     * @param playerNum 几人桌
     * @param round 局数
     * @param payType 支付方式
     * @returns 房费
     */
    static getRoomRate2(playerNum, round, payType) {
        let needDiamond;
        if (payType === 0) {
            needDiamond = round / 10;
        }
        else {
            needDiamond = playerNum * round / NUMBER20;
        }
        return needDiamond;
    }
    /**
     * 解析房间配置
     * @param config 房间参数
     */
    static parsePRoomConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            // 0:玩法类型, 1:开桌, 2:底分, 3:总回合数, 4:支付方式, 5:开始方式
            // 6:推注方式, 7:最大抢庄倍数, 8:翻倍规则, 9:通比玩法, 10:轮庄玩法
            // 11:上庄玩法, 12:特殊牌型(16进制), 13:快速模式标志位, 14:中途禁入标志
            // 15:搓牌标志, 16:道具禁用标志, 17:闲家买码, 18:表情禁用
            // 19:暗抢庄家标志, 20:加倍标志, 21:王癞玩法
            return {
                playType: config[0],
                playerNum: roomConfig_1.RoomConfig.playerNum[config[1]],
                basePoint: roomConfig_1.RoomConfig.basePoint[config[2]],
                round: roomConfig_1.RoomConfig.round[config[3]],
                payType: config[4],
                startType: config[5],
                bolusType: roomConfig_1.RoomConfig.bolusType[config[6]],
                maxBankerBet: roomConfig_1.RoomConfig.bolusType[config[7]],
                doubleRule: config[8],
                allContrastPlay: config[9],
                takeTurnsPlay: config[10],
                upBankerScore: roomConfig_1.RoomConfig.upBankerScore[config[NUMBER11]],
                specialCard: GameUitl.hex_to_bin(config[NUMBER12]),
                fastFlag: config[NUMBER13],
                halfWayAdd: config[NUMBER14],
                rubbingFlag: config[NUMBER15],
                itemUse: config[NUMBER16],
                buyCode: config[NUMBER17],
                bolusLimit: config[NUMBER18],
                grabFlag: config[NUMBER19],
                doubleFlag: config[NUMBER20],
                laiziType: config[NUMBER21]
            };
        });
    }
    /**
     * parsePlayConfig
     */
    static parsePlayConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            // 0:玩法类型, 1:开桌, 2:底分, 3:总回合数, 4:支付方式, 5:开始方式
            // 6:推注方式, 7:最大抢庄倍数, 8:翻倍规则, 9:通比玩法, 10:轮庄玩法
            // 11:上庄玩法, 12:特殊牌型(16进制), 13:快速模式标志位, 14:中途禁入标志
            // 15:搓牌标志, 16:道具禁用标志, 17:闲家买码, 18:表情禁用
            // 19:暗抢庄家标志, 20:加倍标志, 21:王癞玩法, 22:茶楼类型,普通还是比赛
            const CreateClubStartName = 'CreateClubStartName';
            const CreateClubMatchStartName = 'CreateClubMatchStartName';
            let name = '';
            switch (config[NUMBER22]) {
                case 0:
                    name = yield redis_1.redisClient.hgetAsync(memoryConfig_1.memory.base, CreateClubStartName);
                    break;
                case 1:
                    name = yield redis_1.redisClient.hgetAsync(memoryConfig_1.memory.base, CreateClubMatchStartName);
                    break;
                default:
                    break;
            }
            return {
                name,
                play_type: config[0],
                player_num: roomConfig_1.RoomConfig.playerNum[config[1]],
                base_point: config[2],
                round: config[3],
                pay_type: config[4],
                start_type: config[5],
                bolus_type: config[6],
                max_banker_bet: config[7],
                double_rule: config[8],
                all_contrast_play: config[9],
                take_turns_play: config[10],
                up_banker_play: config[NUMBER11],
                special_card: config[NUMBER12],
                fast_flag: config[NUMBER13],
                half_way_add: config[NUMBER14],
                rubbing_flag: config[NUMBER15],
                item_use: config[NUMBER16],
                buy_code: config[NUMBER17],
                bolus_limit: config[NUMBER18],
                grab_flag: config[NUMBER19],
                double_flag: config[NUMBER20],
                laizi_type: config[NUMBER21],
                type: config[NUMBER22]
            };
        });
    }
    static parseInfoConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            // 审核开关  14
            // 积分是否可查看标识  15 
            // 打烊标志  16
            // 隐私标志  17 
            // name
            // 公告
            // ]
            return {
                audit_flag: config[0],
                integral_flag: config[1],
                open_flag: config[2],
                privacy_flag: config[3],
                name: config[4],
                notice: config[5]
            };
        });
    }
}
exports.GameUitl = GameUitl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZVVpdGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9nYW1lVWl0bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQTBDO0FBQzFDLHlEQUFzRDtBQUN0RCxpREFBd0M7QUFFeEMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUE0RHBCLE1BQWEsUUFBUTtJQUNqQjs7O09BR0c7SUFDSSxNQUFNLENBQUMsY0FBYztRQUN4QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUN4QixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxlQUFlO1FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7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