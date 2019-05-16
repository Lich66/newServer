import { Application, BackendSession } from 'pinus';
import { ICreateRoomRequest, IJoinRoomRequest } from '../../../interface/hall/handler/hallInterfaces';
// import { roomManager } from '../../../../app';

export default function (app: Application) {
    return new RoomHandler(app);
}
export class RoomHandler {
    private app: Application;
    public constructor(app: Application) {
        this.app = app;
    }


    public async createRoom(msg: ICreateRoomRequest, session: BackendSession) {
        // console.log('大厅服务器收到创建房间消息:' + JSON.stringify(msg));
        // console.log('=======================:' + session.uid);
        // let userid: number = parseInt(session.uid);
        // let result = await roomManager.createRoom(userid, msg.roomConfig);
        // return result;
        return null;
    }

    public async joinRoom(msg: IJoinRoomRequest, session: BackendSession) {
        // console.log('大厅服务器收到加入房间消息:' + JSON.stringify(msg));
        // let userid: number = parseInt(session.uid);
        // let result = await roomManager.joinRoom(userid, msg.roomid);
        // return result;
        return null;
    }
    
}
