import { Application, BackendSession } from 'pinus';

export default function (app: Application) {
    return new HallHandler(app);
}

export class HallHandler {
    public constructor(private app: Application) {
    }

}
