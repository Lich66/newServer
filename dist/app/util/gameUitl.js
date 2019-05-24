"use strict";
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
        for (let i = 0; i < 6; i++) {
            let num = Math.floor(Math.random() * 10);
            if (i === 0 && num === 0) {
                i--;
                continue;
            }
            roomId += num;
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
    static async parsePRoomConfig(config) {
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
    }
    /**
     * parsePlayConfig
     */
    static async parsePlayConfig(config) {
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
                name = await redis_1.redisClient.hgetAsync(memoryConfig_1.memory.base, CreateClubStartName);
                break;
            case 1:
                name = await redis_1.redisClient.hgetAsync(memoryConfig_1.memory.base, CreateClubMatchStartName);
                break;
            default:
                break;
        }
        return {
            name,
            play_type: config[0],
            player_num: roomConfig_1.RoomConfig.playerNum[config[1]],
            base_point: roomConfig_1.RoomConfig.round[config[2]],
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
    }
    static async parseInfoConfig(config) {
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
    }
}
exports.GameUitl = GameUitl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZVVpdGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9nYW1lVWl0bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUEwQztBQUMxQyx5REFBc0Q7QUFDdEQsaURBQXdDO0FBR3hDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBNERwQixNQUFhLFFBQVE7SUFDakI7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLGNBQWM7UUFDeEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLENBQUMsRUFBRSxDQUFDO2dCQUNKLFNBQVM7YUFDWjtZQUNELE1BQU0sSUFBSSxHQUFHLENBQUM7U0FDakI7UUFDRCxPQUFPLFFBQVEsQ0FB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