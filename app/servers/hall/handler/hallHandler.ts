import { Application, BackendSession } from 'pinus';
import { SignIn } from '../../../controller/hall/signIn';
import { User } from '../../../controller/user/user';
import { ITbl_signIn } from '../../../interface/models/tbl_signIn';

export default function (app: Application) {
    return new HallHandler(app);
}

export class HallHandler {
    public constructor(private app: Application) {
    }

    /**
     * 获取签到信息
     * @param obj 客户端发送的参数
     * @param session session
     */
    public async signInInfo(obj: any, session: BackendSession) {
        let userId: number = parseInt(session.uid, 0);
        let signInInfo = await SignIn.getSignInInfo({ userId });
        console.log('1获取到的签到信息: ' + JSON.stringify(signInInfo));
        if (!signInInfo) {
            console.log('1');
            return { code: 12041 };
        }
        let newDate = new Date();
        let form: Array<number> = [];
        if (signInInfo[1]) {    // 为true时是新建的,直接返回
            console.log('新建玩家签到表');
            let result = await SignIn.updateSignInInfo({ userId }, { form: JSON.stringify(form) });
            if (!result || result === 0) {
                console.log('2');
                return { code: 12041 };
            }
            return { code: 0, data: { date: newDate.valueOf(), form } };
        }
        let info: ITbl_signIn = signInInfo[0];
        if (info.date) {
            console.log('玩家曾经签到过');
            let oldDate = new Date(info.date);
            if (oldDate.getMonth() !== newDate.getMonth() || oldDate.getFullYear() !== newDate.getFullYear()) {
                console.log('签到表过期,重新生成');
                // 月份或年份不一致,清空数据库签到表
                let result = await SignIn.updateSignInInfo({ userId }, { form: JSON.stringify(form) });
                if (!result || result === 0) {
                    console.log('3');
                    return { code: 12041 };
                }
            } else {
                console.log('签到表没有过期');
                form = JSON.parse(info.form);
            }
        }
        return { code: 0, data: { date: (new Date()).valueOf(), form } };

    }
    /**
     * 签到
     * @param obj 客户端发送的参数
     * @param session xx
     */
    public async signIn(obj: any, session: BackendSession) {
        let userId: number = parseInt(session.uid, 0);
        let signInInfo = await SignIn.getSignInInfo({ userId });
        console.log('2获取到的签到信息: ' + JSON.stringify(signInInfo));
        if (!signInInfo) {
            console.log('4');
            return { code: 12041 };
        }

        let info: ITbl_signIn = signInInfo[0];
        let newDate = new Date();
        let form: Array<number> = JSON.parse(info.form);
        if (info.date) {
            let oldDate = new Date(info.date);
            if (oldDate.getDate() === newDate.getDate() && oldDate.getMonth() === newDate.getMonth() && oldDate.getFullYear() === newDate.getFullYear()) {
                return { code: 12042 };
            }
        }
        form.push(newDate.getDate());
        let user = await User.getUser({ userid: userId });
        if (!user) {
            return { code: 12043 };
        }
        let result = await SignIn.signInTransaction(userId, JSON.stringify(form), newDate.valueOf(), (user.diamond + 1));
        if (result) {
            return { code: 0, data: { diamond: user.diamond + 1 } };
        } else {
            return { code: 12043 };
        }
    }

    /**
     * 获取房间列表
     * @param obj xx
     * @param session session
     */
    public async roomList(obj: any, session: BackendSession) {
        
    }
}
