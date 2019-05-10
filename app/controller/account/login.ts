
import { ITbl_account } from '../../interface/models/tbl_account';
import { tbl_account } from '../../models/tbl_account';
// import { IUserinfo, IAccountInfo, ITokenInfo, IUserModel } from '../../interface/user/handler/userInterface';
import { User } from '../user/user';
import { sequelize } from '../../sequelize/sequelize';
import { tbl_user } from '../../models/tbl_user';
import { IUserResponse, IUserinfoRequest, IAccountInfoRequest, ITokenInfoRequest } from '../../interface/user/handler/userInterface';
import { ITbl_user } from '../../interface/models/tbl_user';
export class Login {
    public static async login(json: IUserinfoRequest): Promise<IUserResponse> {
        const userAccount: ITbl_account = await tbl_account.findOne({ where: json });
        if (userAccount) {
            let user = await User.getUser({ userid: userAccount.uid });
            return { ...user, token: userAccount.token }
        } else {
            try {
                return sequelize.transaction(async (t) => {
                    // 这里还要生成一个token 注册时候是没有token的
                    let token = 'xxxxxxxxxxx'
                    let account = await tbl_account.create<ITbl_account>({ ...json, token }, { transaction: t });
                    // 这里面从第三方获取
                    const num = (Math.random() * 1000).toFixed(0)
                    const sdk = {
                        usernick: `test${num}`,
                        image: `img${num}`,
                        sex: parseInt(num),
                    }
                    const user = await tbl_user.create<ITbl_user>({ ...sdk, userid: account.uid }, { transaction: t })
                    return { ...user, token }
                });
            } catch (error) {
                return null
            }
        }
    }

    public static async accountLogin(json: IAccountInfoRequest): Promise<[ITbl_account, boolean]> {
        // await tbl_account.removeAttribute('id');
        return await tbl_account.findOrCreate({ where: { account: json.account }, defaults: json });
    }

    public static async tokenLogin(json: ITokenInfoRequest): Promise<ITbl_account> {
        // await tbl_account.removeAttribute('id');
        return await tbl_account.findOne({ where: { account: json.token } });
    }
}
