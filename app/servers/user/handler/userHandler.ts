import { Application, BackendSession } from 'pinus';
import { Recharge } from '../../../controller/recharge/recharge';
import { SelfUtils } from '../../../util/selfUtils';


export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    private app: Application;
    public constructor(app: Application) {
        this.app = app;
    }

    public async addDiamond(msg: { diamond: number }, session: BackendSession) {
        const resiult = Recharge.recharge({ userid: Number.parseInt(session.uid, 0) });
        const bool = await SelfUtils.timeout();

        return {
            code: 0,
            data: resiult
        };
    }
}
