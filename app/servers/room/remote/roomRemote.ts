import { Application, RemoterClass, BackendSession } from 'pinus';
import { RoomManager } from '../../../controller/room/roomManager';

export default function (app: Application) {
    return new RoomRemote(app);
}

declare global {
    interface UserRpc {
        room: {
            roomRemote: RemoterClass<BackendSession, RoomRemote>;
        };
    }
}

export class RoomRemote {
    private app: Application;
    private roomManager: RoomManager;
    constructor(app: Application) {
        this.app = app;
        this.roomManager = new RoomManager(app.get('channelService'), this.app);
    }

    public async createRoom(userId: string, roomConfig: number[][]) {
        // let room = await this.roomManager.createRoom(userId, roomConfig);
        // return { code: 200, data: { roomId: room.roomId } }
    }

    public async joinRoom(userId: string, roomId: string) {
        // let session = this.app.get('sessionService').getByUid(userId);
        // console.log('remote中的session = ' + session);
        // let result = await this.roomManager.joinRoom(userId, roomId);

    }
}
