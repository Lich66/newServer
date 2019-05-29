import { Channel, ChannelService } from 'pinus';
import { IRoomConfig } from '../../interface/room/roomInterfaces';

export class RoomChannelService {
    public channel: Channel;
    public createTime: number;
    public roomId: number;
    public creatorId: number;
    public roomConfig: Array<number | string>;
    public playType: string;
    public playerNum: number;
    public basePoint: string;
    public round: number;
    public payType: number;
    public startType: number;
    public bolusType: number;
    public maxBankerBet: number;
    public doubleRule: number;
    public allContrastPlay: number;
    public takeTurnsPlay: number;
    public upBankerScore: number;
    public specialCard: string;
    public fastFlag: boolean;
    public halfWayAdd: boolean;
    public rubbingFlag: boolean;
    public itemUse: boolean;
    public buyCode: boolean;
    public bolusLimit: boolean;
    public grabFlag: boolean;
    public doubleFlag: boolean;
    public laiziType: number;

    public userList: any[];
    public onlookerList: any[];

    public constructor(channel: Channel, configJson: IRoomConfig) {
        this.channel = channel;
        this.roomConfig = configJson.roomConfig;
        this.createTime = this.createTime;
        this.roomId = configJson.roomId;
        this.creatorId = configJson.creatorId;
        this.playType = configJson.playType;
        this.playerNum = configJson.playerNum;
        this.basePoint = configJson.basePoint;
        this.round = configJson.round;
        this.payType = configJson.payType;
        this.startType = configJson.startType;
        this.bolusType = configJson.bolusType;
        this.maxBankerBet = configJson.maxBankerBet;
        this.doubleRule = configJson.doubleRule;
        this.allContrastPlay = configJson.allContrastPlay;
        this.takeTurnsPlay = configJson.takeTurnsPlay;
        this.upBankerScore = configJson.upBankerScore;
        this.specialCard = configJson.specialCard;
        this.fastFlag = configJson.fastFlag;
        this.halfWayAdd = configJson.halfWayAdd;
        this.rubbingFlag = configJson.rubbingFlag;
        this.itemUse = configJson.itemUse;
        this.buyCode = configJson.buyCode;
        this.bolusLimit = configJson.bolusLimit;
        this.grabFlag = configJson.grabFlag;
        this.doubleFlag = configJson.doubleFlag;
        this.laiziType = configJson.laiziType;
        this.onlookerList = [];
        this.userList = [];
    }

    public hasUser(userId: string) {
        for (let item of this.userList) {
            if (item === userId) {
                return true;
            }
        }
        return false;
    }


}
