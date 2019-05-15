import { Channel } from 'pinus';
import { IRoomConfig } from '../../interface/room/roomInterfaces';

export class RoomChannelService {
    private channel: Channel;
    public createTime: string;
    public roomId: number;
    public creatorId: number;
    public roomConfig: number[][];
    public gameType: string;
    public playType: string;
    public deskType: number;
    public baseScore: string;
    public roundCount: number;
    public payType: string;
    public startType: string;
    public pushWager: number;
    public maxRobBanker: number;
    public compareAllType: string;
    public doubleRule: string;
    public specialCardType: string[];
    public advancedOptions: string[];
    public lazarilloDeTormes: string;

    public userList: string[];
    public onlookerList: string[];

    public constructor(channel: Channel) {
        this.channel = channel;
    }

    public initRoom(roomId: number, userId: number, config: number[][], roomConfig: IRoomConfig, createTime: string) {
        this.createTime = createTime;
        this.roomId = roomId;
        this.creatorId = userId;
        this.roomConfig = config;
        this.gameType = roomConfig.gameType;
        this.playType = roomConfig.playType;
        this.deskType = roomConfig.deskType;
        this.baseScore = roomConfig.baseScore;
        this.roundCount = roomConfig.roundCount;
        this.payType = roomConfig.payType;
        this.startType = roomConfig.startType;
        this.pushWager = roomConfig.pushWager;
        this.maxRobBanker = roomConfig.maxRobBanker;
        this.compareAllType = roomConfig.compareAllType;
        this.doubleRule = roomConfig.doubleRule;
        this.specialCardType = roomConfig.specialCardType;
        this.advancedOptions = roomConfig.advancedOptions;
        this.lazarilloDeTormes = roomConfig.lazarilloDeTormes;
    }

    public getChannel(): Channel {
        return this.channel;
    }

    public hasUser(userId: string) {
        for (let item  of this.userList) {
            if (item  === userId) {
                return true;
            }
        }
        return false;
    }
}
