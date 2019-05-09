import { ITbl_account } from '../../interface/models/tbl_account';
import { tbl_account } from '../../models/tbl_account';
import { IUserinfo, IAccountInfo, ITokenInfo, IUserModel } from '../../interface/user/handler/userInterface';
import { User } from '../user/user';
export class Login {
    public static async login(json: IUserinfo): Promise<IUserModel> {
        // 因为表中没有id
        await tbl_account.removeAttribute('id');
        const userAccount: [ITbl_account, boolean] = await tbl_account.findOrCreate({ where: json, defaults: json });
        console.log('********************************************')
        console.log(JSON.stringify(userAccount[0]));
        console.log(userAccount[0].uid);
        console.log(typeof userAccount[0].uid)
        console.log(userAccount[1])
        console.log(typeof userAccount[1])
        let user: IUserModel;
        // 这里面从第三方获取
        const num = (Math.random() * 1000).toFixed(0)
        const sdk = {
            usernick: `test${num}`,
            image: `img${num}`,
            sex: parseInt(num),
        }
        if (userAccount[1]) {
            user = await User.addUser({ ...sdk, userid: userAccount[0].uid });
        }
        return user;
    }

    public static async accountLogin(json: IAccountInfo): Promise<[ITbl_account, boolean]> {
        await tbl_account.removeAttribute('id');
        const userone: [ITbl_account, boolean] = await tbl_account.findOrCreate({ where: { account: json.account }, defaults: json });
        return userone;
    }

    public static async tokenLogin(json: ITokenInfo): Promise<ITbl_account> {
        await tbl_account.removeAttribute('id');
        const userone: ITbl_account = await tbl_account.findOne({ where: { account: json.token } });
        return userone
    }
}
