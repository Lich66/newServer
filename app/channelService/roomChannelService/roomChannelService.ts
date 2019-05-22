import { Channel, ChannelService } from 'pinus';
import { IRoomConfig } from '../../interface/room/roomInterfaces';

export class RoomChannelService {
    private channel: Channel;
    public createTime: string;
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

    public userList: string[];
    public onlookerList: string[];

    public constructor(channel: Channel) {
        this.channel = channel;
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
