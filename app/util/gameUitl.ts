import { defaultClubName } from '../gameConfig/defaultClubName';
interface ICreate {
    play_setting: string;
    person_number: number;
    end_points: number;
    round_total: number;
    pay_type: number;
    start_type: number;
    bolus_type: number;
    max_banker_bet: number;
    double_rule: number;
    special_card_type: number;
    advanced_options: number;
    laizi_type: number;
    type: number;
    name: string;
}
interface IChange extends ICreate {
    audit_flag: boolean;
    integral_flag: boolean;
    open_flag: boolean;
    privacy_flag: boolean;
    pay_flag: boolean;
    join_points: number;
    join_rob_banker: number;
    point_setflag: boolean;
    point_adjustflag: boolean;
    point_permission: number;
    present_target: number;
    present_times: number;
    present_points: number;

}
export class GameUitl {
    /**
     * 获取6位的房间ID
     * @return number 
     */
    public static generateRoomId(): number {
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
    public static getLocalDateStr(): string {
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
    public static hex_to_bin(str: string) {
        let binstr = parseInt(str, 16).toString(2);   // 16进制转成2进制
        for (let i = binstr.length; i < 8; i++) {
            binstr = `0${binstr}`;
        }
        return binstr;
    }

    /**
     * 
     * @param str 二进制转十六进制
     */
    public static bin_to_hex(str: string) {
        const num = 16;
        let hexstr = parseInt(str, 2).toString(num);   // 2进制转成16进制
        return hexstr;
    }

    /**
     * parsePlayConfig
     */
    public static parseCreateConfigInRoom(config: ICreate) {
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
        const name = defaultClubName[type];
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

    public static parseChangeConfigInRoom(config: IChange) {
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
        const name = defaultClubName[type];
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
