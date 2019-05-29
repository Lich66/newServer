"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAXUSERSNUMBER = 50;
const num_15 = 15;
const num_20 = 20;
const num_30 = 30;
const num_300 = 300;
const num_450 = 450;
const num_600 = 600;
exports.RoomConfig = {
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
exports.RoomFields = {
    sid: 'sid',
    state: 'state',
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
    userList: 'userList' // 游戏玩家
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9nYW1lQ29uZmlnL3Jvb21Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFFakMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNsQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ3BCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNwQixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDUCxRQUFBLFVBQVUsR0FBRztJQUN0Qjs7T0FFRztJQUNILFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDMUI7O09BRUc7SUFDSCxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNyQjs7T0FFRztJQUNILFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDOU07O09BRUc7SUFDSCxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUMzQjs7T0FFRztJQUNILE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDekI7O09BRUc7SUFDSCxTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFB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