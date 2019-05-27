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
     * 4房费 
     */
    payType: ['房主支付', 'AA支付'],
    /**
     * 5游戏开始 
     */
    startType: ['首位开始', '准备开始', '房主开始', '满4人开始', '满5人开始', '满6人开始', '满7人开始', '满8人开始', '满9人开始', '满10人开始'],
    /**
     * 6推注选项
     */
    bolusType: [0, 5, 10, num_15, num_20],
    /**
     * 7最大抢庄 --'1倍', '2倍', '3倍', '4倍'
     */
    maxBankerBet: [1, 2, 3, 4],
    /**
     * 8翻倍规则 
     */
    doubleRule: ['牛牛x3牛九x2牛八x2牛七x1', '牛牛x3牛九x2牛八x2牛七x2', '牛牛x4牛九x3牛八x2牛七x2', '牛牛×5牛九×4牛八×3牛七×2', '牛一~牛牛 分别对应1~10倍'],
    /**
     * 9通比玩法
     */
    allContrastPlay: ['普通玩法', '全比玩法'],
    /**
     * 10轮庄玩法
     */
    takeTurnsPlay: ['牛牛上庄', '轮流做庄', '没牛下庄'],
    /**
     * 11上庄分数 --'无', '200', '300', '400'
     */
    upBankerScore: [0, num_300, num_450, num_600],
    /**
     * 12特殊牌型
     */
    specialCard: ['顺子牛', '五花牛', '同花牛', '葫芦牛', '炸弹牛', '五小牛', '同花顺', '四十牛'],
    /** 
     * 13快速模式 -- -1:未选中,1:选中
     */
    fastFlag: [0, 1],
    /**
     * 14中途禁入 -- -1:未选中,1:选中
     */
    halfWayAdd: [0, 1],
    /**
     * 15禁止搓牌 -- -1:未选中,1:选中
     */
    rubbingFlag: [0, 1],
    /**
     * 16禁用道具 -- -1:未选中,1:选中
     */
    itemUse: [0, 1],
    /**
     * 17闲家买码 -- -1:未选中,1:选中
     */
    buyCode: [0, 1],
    /**
     * 18推注限制 -- -1:未选中,1:选中
     */
    bolusLimit: [0, 1],
    /**
     * 19暗抢庄家 -- -1:未选中,1:选中
     */
    grabFlag: [0, 1],
    /**
     * 20下注加倍 -- -1:未选中,1:选中
     */
    doubleFlag: [0, 1],
    /**
     * 21王癞玩法
     */
    laiziType: ['无', '经典王癞', '疯狂王癞']
};

/**
 * 房间字段名
 */
export const RoomFields = {
    sid: 'sid',
    roomConfig: 'roomConfig',
    roomId: 'roomId',
    creatorId: 'creatorId',
    createTime: 'createTime',
    playType: 'playType',
    playerNum: 'playerNum',
    basePoint: 'basePoint',
    round: 'round',
    payType: 'payType',
    startType: 'startType',
    bolusType: 'bolusType',
    maxBankerBet: 'maxBankerBet',
    doubleRule: 'doubleRule',
    allContrastPlay: 'allContrastPlay',
    takeTurnsPlay: 'takeTurnsPlay',
    upBankerScore: 'upBankerScore',
    specialCard: 'specialCard',
    fastFlag: 'fastFlag',
    halfWayAdd: 'halfWayAdd',
    rubbingFlag: 'rubbingFlag',
    itemUse: 'itemUse',
    buyCode: 'buyCode',
    bolusLimit: 'bolusLimit',
    grabFlag: 'grabFlag',
    doubleFlag: 'doubleFlag',
    laiziType: 'laiziType',
    onlookerList: 'onlookerList',
    userList: 'userList'
};
