import { ChannelService, Channel } from "pinus";
import { MPQZRoom } from "../gameModels/mpqzRoom";
import { room_1_1 } from "../gameConfig/room";
import { IRoomConfig } from "../interface/room/roomInterfaces";

export class RoomManager {

    roomList = {};
    private channelService: ChannelService;

    constructor(channelService: ChannelService) {
        this.channelService = channelService;
    }

    /**
     * 获取6位的房间ID
     */
    generateRoomId() {
        var roomId = "";
        for (var i = 0; i < 6; ++i) {
            roomId += Math.floor(Math.random() * 10);
        }
        return roomId;
    }

    /**
     * 获取本地时间
     * @returns {string}    xxxx.xx.xx xx:xx:xx
     */
    getLocalDateStr(): string {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let dateStr = year + '.' + month + '.' + day + '  ' + hours + ':' + minutes + ':' + seconds;
        return dateStr;
    };

    public async createRoom(userId: string, config: number[][]) {
        let roomId: string = undefined;
        {
            roomId = this.generateRoomId();
        } while (this.roomList[roomId]);
        let channel = this.channelService.createChannel(roomId);
        console.log('房间管理器中房间通道为：' + channel.name);
        let roomConfig:IRoomConfig = room_1_1(config);
        let room = new MPQZRoom(channel);
        room.initRoom(roomId, userId, config, roomConfig);
        return room;
    }
}