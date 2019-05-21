"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultClubName_1 = require("../gameConfig/defaultClubName");
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
    static parseCreateConfigInRoom(config) {
        const NUMBER11 = 11;
        const NUMBER12 = 12;
        // [
        //     0,   玩法
        //     0,   人数
        //     0,   底分
        //     0,   局数
        //     0,   房费
        //     0,   游戏开始方式
        //     0,   推注选项
        //     0,   最大抢庄
        //     0,   翻倍规则
        //     0,   特殊牌型 十六进制
        //     0,   高级选项  十六进制
        //     0,   王赖玩法
        //     0,   玩法类型
        // ]
        const type = config[NUMBER12];
        const name = defaultClubName_1.defaultClubName[type];
        return {
            play_setting: config[0],
            person_number: config[1],
            end_points: config[2],
            round_total: config[3],
            pay_type: config[4],
            start_type: config[5],
            bolus_type: config[6],
            max_banker_bet: config[7],
            double_rule: config[8],
            special_card_type: config[9],
            advanced_options: config[10],
            laizi_type: config[NUMBER11],
            type,
            name
        };
    }
    static parseChangeConfigInRoom(config) {
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
        const NUMBER23 = 23;
        const NUMBER24 = 24;
        const NUMBER25 = 25;
        const NUMBER26 = 26;
        // [
        //     0,   玩法 0
        //     0,   人数  1
        //     0,   底分  2
        //     0,   局数  3
        //     0,   房费  4 
        //     0,   游戏开始方式  5
        //     0,   推注选项  6 
        //     0,   最大抢庄  7 
        //     0,   翻倍规则  8
        //     0,   特殊牌型 十六进制  9
        //     0,   高级选项  十六进制  10
        //     0,   王赖玩法  11
        //     0,   玩法类型  12
        //     'string' 茶楼名字 13
        //         审核开关  14
        // 积分是否可查看标识  15 
        // 打烊标志  16
        // 隐私标志  17 
        // 非aa支付开关  18 
        // 参加分数  19 
        // 参加抢庄分数  20 
        // 负分设置    21 
        // 积分调整选项  22
        // 积分权限类型  23
        // 表情赠送对象  24 
        // 表情赠送次数  25 
        // 赠送积分  26
        // ]
        const type = config[NUMBER12];
        const name = defaultClubName_1.defaultClubName[type];
        return {
            play_setting: config[0],
            person_number: config[1],
            end_points: config[2],
            round_total: config[3],
            pay_type: config[4],
            start_type: config[5],
            bolus_type: config[6],
            max_banker_bet: config[7],
            double_rule: config[8],
            special_card_type: config[9],
            advanced_options: config[10],
            laizi_type: config[NUMBER11],
            type: config[NUMBER12],
            name: config[NUMBER13],
            audit_flag: config[NUMBER14],
            integral_flag: config[NUMBER15],
            open_flag: config[NUMBER16],
            privacy_flag: config[NUMBER17],
            pay_flag: config[NUMBER18],
            join_points: config[NUMBER19],
            join_rob_banker: config[NUMBER20],
            point_setflag: config[NUMBER21],
            point_adjustflag: config[NUMBER22],
            point_permission: config[NUMBER23],
            present_target: config[NUMBER24],
            present_times: config[NUMBER25],
            present_points: config[NUMBER26]
        };
    }
}
exports.GameUitl = GameUitl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZVVpdGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9nYW1lVWl0bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1FQUFnRTtBQWlDaEUsTUFBYSxRQUFRO0lBQ2pCOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxjQUFjO1FBQ3hCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLGVBQWU7UUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFH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