import { Application, BackendSession } from 'pinus';

export default function (app: Application) {
    return new RoomHandler(app);
}
export class RoomHandler {
    private app: Application;
    public constructor(app: Application) {
        this.app = app;
    }
    
}
