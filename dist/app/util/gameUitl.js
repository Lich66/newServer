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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZVVpdGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9nYW1lVWl0bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUEwQztBQUMxQyx5REFBc0Q7QUFDdEQsaURBQXdDO0FBRXhDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBNERwQixNQUFhLFFBQVE7SUFDakI7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLGNBQWM7UUFDeEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDeEIsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsZUFBZTtRQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDO1FBQzVGLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQ2hDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUcsWUFBWTtRQUMxRCxLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUcsWUFBWTtRQUMzRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFpQixFQUFFLEtBQWEsRUFBRSxPQUFlO1FBQ3hFLElBQUksV0FBbUIsQ0FBQztRQUN4QixJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7WUFDZixXQUFXLEdBQUcsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzlDO2FBQU07WUFDSCxXQUFXLEdBQUcsdUJBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQ3RGO1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBaUIsRUFBRSxLQUFhLEVBQUUsT0FBZTtRQUN4RSxJQUFJLFdBQW1CLENBQUM7UUFDeEIsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFO1lBQ2YsV0FBVyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDNUI7YUFBTTtZQUNILFdBQVcsR0FBRyxTQUFTLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQztTQUM5QztRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFHRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQWE7UUFDOUMsNkNBQTZDO1FBQzdDLDRDQUE0QztRQUM1QyxnREFBZ0Q7UUFDaEQsdUNBQXVDO1FBQ3ZDLDhCQUE4QjtRQUM5QixPQUFPO1lBQ0gsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkIsU0FBUyxFQUFFLHVCQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxTQUFTLEVBQUUsdUJBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLEtBQUssRUFBRSx1QkFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsU0FBUyxFQUFFLHVCQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxZQUFZLEVBQUUsdUJBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFCLGFBQWEsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3pCLGFBQWEsRUFBRSx1QkFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekQsV0FBVyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzFCLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzVCLFdBQVcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzdCLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3pCLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzVCLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzFCLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzVCLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQzlCLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFhO1FBQzdDLDZDQUE2QztRQUM3Qyw0Q0FBNEM7UUFDNUMsZ0RBQWdEO1FBQ2hELHVDQUF1QztRQUN2Qyw4Q0FBOEM7UUFDOUMsTUFBTSxtQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQztRQUNsRCxNQUFNLHdCQUF3QixHQUFHLDBCQUEwQixDQUFDO1FBQzVELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLFFBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3RCLEtBQUssQ0FBQztnQkFDRixJQUFJLEdBQUcsTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxxQkFBTSxDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNyRSxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksR0FBRyxNQUFNLG1CQUFXLENBQUMsU0FBUyxDQUFDLHFCQUFNLENBQUMsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUM7Z0JBQzFFLE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7UUFFRCxPQUFPO1lBQ0gsSUFBSTtZQUNKLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLFVBQVUsRUFBRSx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsVUFBVSxFQUFHLHVCQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQixVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QixXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QixpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVCLGVBQWUsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQzNCLGNBQWMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2hDLFlBQVksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzlCLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzNCLFlBQVksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzlCLFlBQVksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzlCLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzFCLFdBQVcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzdCLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzNCLFdBQVcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzdCLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzVCLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ3pCLENBQUM7SUFDTixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBYTtRQUM3QyxXQUFXO1FBQ1gsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxZQUFZO1FBQ1osT0FBTztRQUNQLEtBQUs7UUFDTCxJQUFJO1FBQ0osT0FBTztZQUNILFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDcEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWhNRCw0QkFnTUMifQ==