import { Application, BackendSession } from 'pinus';
import { tbl_signIn } from '../../../models/tbl_signIn';

export default function (app: Application) {
    return new HallHandler(app);
}

export class HallHandler {
    public constructor(private app: Application) {
    }

    /**
     * 获取签到信息
     * @param obj xx
     * @param session xx
     */
    public async signInInfo(obj: any, session: BackendSession) {
        let userId: number = parseInt(session.uid, 0);
        let signInInfo = await tbl_signIn.findOrCreate({ where: { userid: userId } });
        console.log('获取到的签到信息: ' + JSON.stringify(signInInfo));
        return { code: 0, data: { signInInfo } };
    }

}
