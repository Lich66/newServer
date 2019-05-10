
import { ITbl_account } from '../../interface/models/tbl_account';
import { tbl_account } from '../../models/tbl_account';
// import { IUserinfo, IAccountInfo, ITokenInfo, IUserModel } from '../../interface/user/handler/userInterface';
import { User } from '../user/user';
import { sequelize } from '../../sequelize/sequelize';
import { tbl_user } from '../../models/tbl_user';
import { IUserResponse, IUserinfoRequest, IAccountInfoRequest, ITokenInfoRequest } from '../../interface/user/handler/userInterface';
import { ITbl_user, IUser } from '../../interface/models/tbl_user';
function model2Json<T, J>(model: T, parms: string[], add: { [key: string]: any }): J {
    const json = {};
    for (const iterator of parms) {
        json[iterator] = model[iterator]
    }
    for (const key in add) {
        if (add.hasOwnProperty(key)) {
            json[key] = add[key];
        }
    }
    return json as J;
}
export class Login {
    public static async login(json: IUserinfoRequest): Promise<IUserResponse> {
        const userAccount: ITbl_account = await tbl_account.findOne({ where: json });
        if (userAccount) {
            let userModel = await User.getUser({ userid: userAccount.uid });
            return model2Json<ITbl_user, IUserResponse>(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
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
                    const userModel = await tbl_user.create<ITbl_user>({ ...sdk, userid: account.uid }, { transaction: t })
                    return model2Json<ITbl_user, IUserResponse>(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
                });
            } catch (error) {
                return null
            }
        }
    }

    public static async accountLogin(json: IAccountInfoRequest): Promise<IUserResponse> {
        // 功能没写完 是假的

        const userAccount: ITbl_account = await tbl_account.findOne({ where: json });
        if (userAccount) {
            let userModel = await User.getUser({ userid: userAccount.uid });
            return model2Json<ITbl_user, IUserResponse>(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
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
                    const userModel = await tbl_user.create<ITbl_user>({ ...sdk, userid: account.uid }, { transaction: t })
                    return model2Json<ITbl_user, IUserResponse>(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
                });
            } catch (error) {
                return null
            }
        }
    }

    public static async tokenLogin(json: ITokenInfoRequest): Promise<IUserResponse> {
        // 功能没写完 是假的

        const userAccount: ITbl_account = await tbl_account.findOne({ where: json });
        if (userAccount) {
            const userModel = await User.getUser({ userid: userAccount.uid });
            return model2Json<ITbl_user, IUserResponse>(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
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
                    const userModel = await tbl_user.create<ITbl_user>({ ...sdk, userid: account.uid }, { transaction: t })
                    return model2Json<ITbl_user, IUserResponse>(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
                });
            } catch (error) {
                return null
            }
        }
    }
}
