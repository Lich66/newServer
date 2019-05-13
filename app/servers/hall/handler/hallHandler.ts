import { Application, BackendSession } from 'pinus';
import { ICreateRoomRequest, IJoinRoomRequest } from '../../../interface/hall/handler/hallInterfaces';

export default function (app: Application) {
    return new HallHandler(app);
}

export class HallHandler {
    constructor(private app: Application) {
    }


    async createRoom(msg: ICreateRoomRequest, session: BackendSession) {
        console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
        //todo 判断用户的合法性,在判断参数的合法性
        let result = await this.app.rpc.room.roomRemote.createRoom.route(session)(msg.uid, msg.roomConfig);
        return result;
    }

    async joinRoom(msg: IJoinRoomRequest, session: BackendSession) {
        console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
        let result = await this.app.rpc.room.roomRemote.joinRoom.route(session)(msg.uid, msg.roomId);
        return result;
    }
}