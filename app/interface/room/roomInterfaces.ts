export interface IRoomConfig {
    roomConfig: Array<number | string>;
    roomId: number;
    creatorId: number;
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
