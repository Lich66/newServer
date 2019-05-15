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
 * 十六进制转8位二进制
 * @param str 参数
 */
function hex_to_bin(str: string) {
    let binstr = parseInt(str, 16).toString(2);   // 16进制转成2进制
    for (let i = binstr.length; i < 8; i++) {
        binstr = `0${binstr}`;
    }
    return binstr;
}

/**
 * 明牌抢庄经典玩法
 * @param config 二位数组的参数
 */
export function room_1_1(config: number[][]) {
    let specialCardType = [];
    let binstr1 = hex_to_bin(config[1][8].toString());
    for (let i = binstr1.length - 1; i >= 0; i--) {
        let num = parseInt(binstr1.substr(i, 1), 0);
        if (num === 1) {
            specialCardType.push(SpecialCardType[i]);
        }
    }
    console.log(JSON.stringify(specialCardType));
    let advancedOptions = [];
    let binstr2 = hex_to_bin(config[1][9].toString());
    for (let i = binstr2.length - 1; i >= 0; i--) {
        let num = parseInt(binstr2.substr(i, 1), 0);
        if (num === 1) {
            specialCardType.push(AdvancedOptions[i]);
        }
    }
    console.log(JSON.stringify(advancedOptions));
    let roomConfig = {
        gameType: GameType[config[0][0]],
        playType: PlayType[config[0][1]],
        deskType: DeskType[config[1][0]],
        baseScore: BaseScore[config[1][1]],
        roundCount: RoundCount[config[1][2]],
        payType: PayType[config[1][3]],
        startType: StartType[config[1][4]],
        pushWager: PushWager[config[1][5]],
        maxRobBanker: MaxRobBanker[config[1][6]],
        compareAllType: '',
        doubleRule: DoubleRule[config[1][7]],
        specialCardType,
        advancedOptions,
        lazarilloDeTormes: LazarilloDeTormes[config[1][10]]
    };

    return roomConfig;
}
