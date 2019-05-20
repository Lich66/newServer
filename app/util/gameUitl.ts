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
}
