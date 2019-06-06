export interface IRoomConfig {
    sid?: string;
    state: number;  // 0:未开始;1:开始
    roomConfig: Array<number | string>;
    roomId: number;
    creatorId: number;
    createTime: number;
    playType: string;
    playerNum: number;
    basePoint: string;
    round: number;
    payType: number;
    startType: number;
    bolusType: number;
    maxBankerBet: number;
    doubleRule: number;
    allContrastPlay: number;
    takeTurnsPlay: number;
    upBankerScore: number;
    specialCard: string;
    fastFlag: boolean;
    halfWayAdd: boolean;
    rubbingFlag: boolean;
    itemUse: boolean;
    buyCode: boolean;
    bolusLimit: boolean;
    grabFlag: boolean;
    doubleFlag: boolean;
    laiziType: number;
}

export interface IRoomRedis {
    'sid'?: string;
    'state'?: string;  // 0:未开始;1:开始
    'roomConfig'?: string;
    'roomId'?: string;
    'creatorId'?: string;
    'createTime'?: string;
    'playType'?: string;
    'playerNum'?: string;
    'basePoint'?: string;
    'round'?: string;
    'payType'?: string;
    'startType'?: string;
    'bolusType'?: string;
    'maxBankerBet'?: string;
    'doubleRule'?: string;
    'allContrastPlay'?: string;
    'takeTurnsPlay'?: string;
    'upBankerScore'?: string;
    'specialCard'?: string;
    'fastFlag'?: string;
    'halfWayAdd'?: string;
    'rubbingFlag'?: string;
    'itemUse'?: string;
    'buyCode'?: string;
    'bolusLimit'?: string;
    'grabFlag'?: string;
    'doubleFlag'?: string;
    'laiziType'?: string;
    [key: string]: string;
}
