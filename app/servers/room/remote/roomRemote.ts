import { Application, BackendSession, RemoterClass } from 'pinus';

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
    public constructor(app: Application) {
        this.app = app;
    }
    
}
