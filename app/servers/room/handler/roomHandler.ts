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
}
