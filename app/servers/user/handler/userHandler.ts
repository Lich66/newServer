import { Application, BackendSession } from 'pinus';
import { User } from '../../../controller/user/user';



export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    private app: Application;
    public constructor(app: Application) {
        this.app = app;
    }

    public async addDiamond(msg: { diamond: number }, session: BackendSession) {
        const user = await User.getUser({ userid: Number.parseInt(session.uid, 0) });
        const diamond = user.diamond + msg.diamond;
        const nuser = await User.updateUser({ userid: Number.parseInt(session.uid, 0) }, { diamond });
        return {
            code: 0,
            data: nuser
        };
    }

}
