const num_12 = 12;
const num_15 = 15;
const num_20 = 20;
const num_30 = 30;
const num_300 = 300;
const num_450 = 450;
const num_600 = 600;
export const RoomConfig = {
    /**
     * 0游戏类型 
     */
    playType: ['明牌抢庄', '明牌通比'],
    /**
     * 1桌子人数 --6人桌 , 8人桌 , 10人桌
     */
    playerNum: [6, 8, 10],
    /**
     * 2底分
     */
    basePoint: ['1/2', '2/4', '3/6', '4/8', '5/10', '10/20', '1/2/4', '2/4/8', '3/6/12', '4/8/16', '5/10/20', '10/20/40', '1/2/10', '2/4/20', '3/6/30', '4/8/40', '5/10/50', '10/20/100', '1', '2', '3', '4', '5'],
    /**
     * 3局数 --10局 , 20局 , 30局
     */
    round: [10, num_20, num_30],
    /**
     * 4房费 --'AA支付1', 'AA支付2', 'AA支付3', '房主支付3', '房主支付4', '房主支付5', '房主支付6', '房主支付8', '房主支付9', '房主支付10', '房主支付12', '房主支付15'
     */
    payType: [1, 2, 3, 3, 4, 5, 6, 8, 9, 10, num_12, num_15],
    /**
     * 5游戏开始 
     */
    startType: ['首位开始', '准备开始', '房主开始', '满4人开始', '满5人开始', '满6人开始', '满7人开始', '满8人开始', '满9人开始', '满10人开始'],
    /**
     * 推注选项
     */
    bolusType: [0, 5, 10, num_15, num_20],
    /**
     * 最大抢庄 --'1倍', '2倍', '3倍', '4倍'
     */
    maxBankerBet: [1, 2, 3, 4],
    /**
     * 通比玩法
     */
    allContrastPlay: ['普通玩法', '全比玩法'],
    /**
     * 轮庄玩法
     */
    takeTurnsPlay: ['牛牛上庄', '轮流做庄', '没牛下庄'],
    /**
     * 上庄分数 --'无', '200', '300', '400'
     */
    upBankerScore: [0, num_300, num_450, num_600],
    /**
     * 翻倍规则 
     */
    doubleRule: ['牛牛x3牛九x2牛八x2牛七x1', '牛牛x3牛九x2牛八x2牛七x2', '牛牛x4牛九x3牛八x2牛七x2', '牛牛×5牛九×4牛八×3牛七×2', '牛一~牛牛 分别对应1~10倍'],
    /**
     * 特殊牌型
     */
    specialCard: ['顺子牛', '五花牛', '同花牛', '葫芦牛', '炸弹牛', '五小牛', '同花顺', '四十牛'],
    /**
     * 中途禁入 -- -1:未选中,1:选中
     */
    halfWayAdd: [-1, 1],
    /**
     * 禁止搓牌 -- -1:未选中,1:选中
     */
    rubbingFlag: [-1, 1],
    /**
     * 禁用道具 -- -1:未选中,1:选中
     */
    itemUse: [-1, 1],
    /** 
     * 快速模式 -- -1:未选中,1:选中
     */
    fastFlag: [-1, 1],
    /**
     * 闲家买码 -- -1:未选中,1:选中
     */
    buyCode: [-1, 1],
    /**
     * 推注限制 -- -1:未选中,1:选中
     */
    bolusLimit: [-1, 1],
    /**
     * 暗抢庄家 -- -1:未选中,1:选中
     */
    grabFlag: [-1, 1],
    /**
     * 下注加倍 -- -1:未选中,1:选中
     */
    doubleFlag: [-1, 1],
    /**
     * 王癞玩法
     */
    laiziType: ['无', '经典王癞', '疯狂王癞']
};
