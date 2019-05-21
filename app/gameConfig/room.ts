import { GameUitl } from '../util/gameUitl';

const round20 = 20;
const round30 = 30;

const PushWager15 = 15;
const PushWager20 = 20;
// 游戏类型
export enum GameType { '明牌抢庄', '明牌通比' }
// 玩法类型
export enum PlayType { '经典玩法', '疯狂玩法', '红牛玩法' }
// 开桌  
export const DeskType: Array<number> = [6, 8, 10];
// 底分
export enum BaseScore { '1/2', '2/4', '3/6', '4/8', '5/10', '10/20', '1/2/4', '2/4/8', '3/6/12', '4/8/16', '5/10/20', '10/20/40', '1/2/10', '2/4/20', '3/6/30', '4/8/40', '5/10/50', '10/20/100' }
// 底分：通比专用
export const BaseScore2: Array<number> = [1, 2, 3, 4, 5];
// 局数
export const RoundCount: Array<number> = [10, round20, round30];
// 支付方式
export enum PayType { '房主支付3', '房主支付4', '房主支付5', '房主支付6', '房主支付8', '房主支付9', '房主支付10', '房主支付12', '房主支付15', 'AA支付1', 'AA支付2', 'AA支付3' }
// 游戏开始
export enum StartType { '首位开始', '准备开始', '房主开始', '满4人开始', '满5人开始', '满6人开始' }
// 推注选项
export const PushWager: Array<number> = [0, 5, 10, PushWager15, PushWager20];
// 最大抢庄    
export const MaxRobBanker: Array<number> = [1, 2, 3, 4];
// 通比玩法     
export enum CompareAllType { '普通玩法', '全比玩法' }
// 翻倍规则   
export enum DoubleRule { '牛牛×4牛九×3牛八×2牛七×2', '牛牛×3牛九×2牛八×2牛七×1', '牛牛×3牛九×2牛八×2牛七×2', '牛牛×5牛九×4牛八×3牛七×2', '牛一到牛牛分别对应1到10倍' }
// 特殊牌型
export enum SpecialCardType { '顺子牛(5倍)', '五花牛(5倍)', '同花牛(6倍)', '葫芦牛(7倍)', '炸弹牛(8倍)', '五小牛(10倍)', '同花顺(10倍)', '四十牛(7倍)' }
// 高级选项
export enum AdvancedOptions { '中途禁入', '禁止搓牌', '禁用道具', '快速模式', '闲家买码', '推注限制', '暗抢庄家', '下注加倍 ' }
// 王癞玩法 
export enum LazarilloDeTormes { '无', '经典王癞', '疯狂王癞' }

/**
 * 明牌抢庄经典玩法
 * @param config 二位数组的参数
 */
export function room_0_0(config: number[][]) {
    let specialCardType = GameUitl.hex_to_bin(config[1][8].toString());
    let advancedOptions = GameUitl.hex_to_bin(config[1][9].toString());
    console.log('特殊牌型: ' + specialCardType + ' ; 高级选项: ' + advancedOptions);
    let roomConfig = {
        gameType: config[0][0],
        playType: config[0][1],
        deskType: config[1][0],
        baseScore: config[1][1],
        roundCount: config[1][2],
        payType: config[1][3],
        startType: config[1][4],
        pushWager: config[1][5],
        maxRobBanker: config[1][6],
        doubleRule: config[1][7],
        specialCardType,
        advancedOptions,
        lazarilloDeTormes: config[1][10]
    };
    return roomConfig;
}
