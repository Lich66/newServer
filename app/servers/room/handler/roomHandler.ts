import { Application, BackendSession, ChannelService } from 'pinus';
import { RoomChannelService } from '../../../channelService/roomChannelService/roomChannelService';
import { RoomManager } from '../../../controller/room/roomManager';
import { appKeyPrefix } from '../../../gameConfig/nameSpace';
import { ICreateRoomRequest } from '../../../interface/hall/hallInterface';

export default function (app: Application) {
    return new RoomHandler(app);
}
export class RoomHandler {
    private app: Application;
    private channelService: ChannelService;
    public constructor(app: Application) {
        this.app = app;
        this.channelService = app.get('channelService');
    }

    public async createRoom(msg: ICreateRoomRequest, session: BackendSession) {
        console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
        let userid: number = parseInt(session.uid, 0);
        let result = await RoomManager.createRoom(userid, msg.roomConfig, this.app);
        if (!result.flag) {
            return {
                code: result.code
            };
        }
        let channel = this.channelService.createChannel(result.json.roomId.toString());
        let room = new RoomChannelService(channel, result.json);
        let roomList = this.app.get(appKeyPrefix.roomList);
        roomList[result.json.roomId] = room;
        console.log('roomHandler查看房间是否挂上去了:' + JSON.stringify(Object.keys(this.app.get(appKeyPrefix.roomList))));
        return { code: 0, roomid: result.roomId };
    }

    public async leaveRoom(session: BackendSession) {
        let userId: number = parseInt(session.uid, 0);
        let roomId: number = session.get('roomId');
        console.log('离开房间获取信息: ' + userId + ' : ' + roomId);
        let channel = this.channelService.getChannel(`${roomId}`);
        const user = channel.getMember(`${userId}`);
        if (user) {
            channel.removeMember(`${userId}`);
        }
        channel.pushMessage('onLeaveRoom', userId);
        let roomList = this.app.get(appKeyPrefix.roomList);
        let room = roomList[roomId];
        // todo 删除离开房间玩家 
        for (let i of room.onlookerList) {
        }
    }
}
