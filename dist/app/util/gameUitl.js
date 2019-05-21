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
}
exports.GameUitl = GameUitl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZVVpdGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvdXRpbC9nYW1lVWl0bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1FQUFnRTtBQWlDaEUsTUFBYSxRQUFRO0lBQ2pCOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxjQUFjO1FBQ3hCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLGVBQWU7UUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFH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