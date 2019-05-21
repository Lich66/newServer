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
     * 解析创建房间的参数方法
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
                player_num: config[1],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZVVpdGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9nYW1lVWl0bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQTBDO0FBQzFDLGlEQUF3QztBQUV4QyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQW9DcEIsTUFBYSxRQUFRO0lBQ2pCOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxjQUFjO1FBQ3hCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLGVBQWU7UUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLElB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