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
        const bool = await this.timeout();
        if (bool) {
            const nuser = await User.updateUser({ userid: Number.parseInt(session.uid, 0) }, { diamond });
            return {
                code: 0,
                data: nuser
            };
        } else {
            return {
                code: 165165816
                // data: nuser
            };
        }

    }

    public async timeout() {
        const time = 5000;
        return new Promise(function (resolve, reject) {
            // ... some code

            if (true) {
                setTimeout(() => {
                    resolve(true);
                }, time);

            } else {
            }
        });
    }
}
