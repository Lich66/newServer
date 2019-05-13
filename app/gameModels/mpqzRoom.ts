import { Channel } from "pinus";
import { IRoomConfig } from "../interface/room/roomInterfaces";

export class MPQZRoom {
    private channel: Channel;
    createTime: string;
    roomId: string;
    creatorId: string;
    roomConfig: number[][];
    gameType: string;
    playType: string;
    deskType: number;
    baseScore: string;
    roundCount: number;
    payType: string;
    startType: string;
    pushWager: number;
    maxRobBanker: number;
    compareAllType: string;
    doubleRule: string;
    specialCardType: string[];
    advancedOptions: string[];
    lazarilloDeTormes: string;

    userList: string[];
    onlookerList: string[];

    constructor(channel: Channel) {
        this.channel = channel;
    }

    initRoom(roomId: string, userId: string, config: number[][], roomConfig: IRoomConfig, createTime: string) {
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

    getChannel(): Channel {
        return this.channel;
    }

    hasUser(userId: string) {
        for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i] === userId) {
                return true;
            }
        }
        return false;
    }
}