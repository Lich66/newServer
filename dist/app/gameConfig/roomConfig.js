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
    playType: ['明牌抢庄', '无花抢庄', '明牌通比', '牛牛轮庄', '固定庄家', '自由抢庄', '通比牛牛'],
    /**
     * 1桌子人数 --6人桌 , 8人桌 , 10人桌
     */
    playerNum: [6, 8, 10],
    /**
     * 2底分
     */
    basePoint: ['1', '2', '3', '4', '5', '1/2', '2/4', '3/6', '4/8', '5/10', '10/20', '1/2/4', '2/4/8', '3/6/12', '4/8/16', '5/10/20', '10/20/40', '1/2/10', '2/4/20', '3/6/30', '4/8/40', '5/10/50', '10/20/100'],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbUNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9nYW1lQ29uZmlnL3Jvb21Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFFakMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNsQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ3BCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNwQixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDUCxRQUFBLFVBQVUsR0FBRztJQUN0Qjs7T0FFRztJQUNILFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUNsRTs7T0FFRztJQUNILFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3JCOztPQUVHO0lBQ0gsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQztJQUM5TTs7T0FFRztJQUNILEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO0lBQzNCOztPQUVHO0lBQ0gsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0s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