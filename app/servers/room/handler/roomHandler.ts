import { Application, BackendSession, ChannelService } from 'pinus';
import { GlobalChannelServiceStatus } from 'pinus-global-channel-status';
import { RoomChannelService } from '../../../channelService/roomChannelService/roomChannelService';
import { RoomManager } from '../../../controller/room/roomManager';
import { appKeyPrefix, redisKeyPrefix } from '../../../gameConfig/nameSpace';
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

    /**
     * 创建房间
     * @param msg 房间配置信息
     * @param session  xx
     */
    public async createRoom(msg: ICreateRoomRequest, session: BackendSession) {
        console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
        let userid: number = parseInt(session.uid, 0);
        if (!userid) {
            return {
                code: 10004
            };
        }
        let result = await RoomManager.createRoom(userid, msg.roomConfig);
        if (!result.flag) {
            return {
                code: result.code
            };
        }
        let returnData = {
            roomId: result.json.roomId
            // playType: result.json.roomConfig[0],
            // playerNum: result.json.roomConfig[1],
            // basePoint: result.json.roomConfig[2],
            // round: result.json.roomConfig[3],
            // payType: result.json.roomConfig[4]
        };
        return { code: 0, data: returnData };
    }

    /**
     * 离开房间
     * @param obj  xx
     * @param session   xx 
     */
    public async leaveRoom(obj: any, session: BackendSession) {
        // todo 先判断房间是否已开始游戏
        let userId: number = parseInt(session.uid, 0);
        let roomId: number = parseInt(session.get('roomId'), 0);
        console.log('离开房间获取信息: ' + userId + ' : ' + roomId);
        let channel = this.channelService.getChannel(`${roomId}`);
        const user = channel.getMember(`${userId}`);
        if (user) {
            channel.removeMember(`${userId}`);
        }
        channel.pushMessage('onLeaveRoom', { userId });
        let roomList = this.app.get(appKeyPrefix.roomList);
        let room = roomList[roomId];
        // todo 删除离开房间玩家 
        for (let i of room.onlookerList) {
            let index = 0;
            if (i.userId === userId) {
                room.onlookerList.splice(index, 1);
                break;
            }
            index++;
        }
        for (let i of room.userList) {
            let index = 0;
            if (i.userId === userId) {
                room.userList.splice(index, 1);
                break;
            }
            index++;
        }
        return { code: 0 };
    }

    
}
