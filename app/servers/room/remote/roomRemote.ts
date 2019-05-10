import { Application, ChannelService, RemoterClass, BackendSession } from 'pinus';
import { RoomManager } from '../../../controller/RoomManager';
import { MPQZRoom } from '../../../gameModels/mpqzRoom';

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
        this.roomManager = new RoomManager(app.get('channelService'));
    }

    public async createRoom(userId: string, roomConfig: number[][]) {
        let room = await this.roomManager.createRoom(userId, roomConfig);
        return { code: 200, data: { roomId: room.roomId } }
    }


}