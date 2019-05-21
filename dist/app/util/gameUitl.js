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