import { redisClient } from '../db/redis';
import { person_number } from './config';
import { memory } from './memoryConfig';

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
interface ICreateReturn {
    name: string;
    play_type: number;
    player_num: number;
    base_point: number;
    round: number;
    pay_type: number;
    start_type: number;
    bolus_type: number;
    max_banker_bet: number;
    double_rule: number;
    all_contrast_play: number;
    take_turns_play: number;
    up_banker_play: number;
    special_card: string;
    fast_flag: boolean;
    half_way_add: boolean;
    rubbing_flag: boolean;
    item_use: boolean;
    buy_code: boolean;
    bolus_limit: boolean;
    grab_flag: boolean;
    double_flag: boolean;
    laizi_type: number;
    type?: number;

}
interface IChangeReturn {
    audit_flag: boolean;
    integral_flag: boolean;
    open_flag: boolean;
    privacy_flag: boolean;
    name: string;
    notice: string;
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
    public static async parsePlayConfig(config: any[]): Promise<ICreateReturn> {
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
                name = await redisClient.hgetAsync(memory.base, CreateClubStartName);
                break;
            case 1:
                name = await redisClient.hgetAsync(memory.base, CreateClubMatchStartName);
                break;
            default:
                break;
        }

        return {
            name,
            play_type: config[0],
            player_num: person_number[config[1]],
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
    }

    public static async parseInfoConfig(config: any[]): Promise<IChangeReturn> {
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
    }
}
