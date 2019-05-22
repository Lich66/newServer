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
const config_1 = require("./config");
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
     *
     * @param str 十六进制转8位二进制
     */
    static hex_to_bin(str) {
        let binstr = parseInt(str, 16).toString(2); // 16进制转成2进制
        for (let i = binstr.length; i < 8; i++) {
            binstr = `0${binstr}`;
        }
        return binstr;
    }
    /**
     *
     * @param str 二进制转十六进制
     */
    static bin_to_hex(str) {
        const num = 16;
        let hexstr = parseInt(str, 2).toString(num); // 2进制转成16进制
        return hexstr;
    }
    /**
     * parsePlayConfig
     */
    static parsePlayConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            // 玩法类型
            // 开桌
            // 底分
            // 总回合数
            // 支付方式
            // 开始方式
            // 推注方式
            // 最大抢庄倍数
            // 翻倍规则
            // 通比玩法
            // 轮庄玩法
            // 上庄玩法
            // 特殊牌型
            // 快速模式标志位
            // 中途禁入标志
            // 搓牌标志
            // 道具禁用标志
            // 闲家买码
            // 表情禁用
            // 暗抢庄家标志
            // 加倍标志
            // 王癞玩法
            // 茶楼类型,普通还是比赛
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
                player_num: config_1.person_number[config[1]],
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
            //         审核开关  14
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZVVpdGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9nYW1lVWl0bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQTBDO0FBQzFDLHFDQUF5QztBQUN6QyxpREFBd0M7QUFFeEMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFvQ3BCLE1BQWEsUUFBUTtJQUNqQjs7O09BR0c7SUFDSSxNQUFNLENBQUMsY0FBYztRQUN4QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUN4QixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxlQUFlO1FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7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