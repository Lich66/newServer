
import * as Sequelize from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { defaultUser } from '../../gameConfig/defaultUser';
import { ITbl_account } from '../../interface/models/tbl_account';
import { ITbl_user } from '../../interface/models/tbl_user';
import { IAccountInfoRequest, ITokenInfoRequest, IUserinfoRequest, IUserResponse } from '../../interface/user/remote/userInterface';
import { tbl_account } from '../../models/tbl_account';
import { tbl_user } from '../../models/tbl_user';
import { User } from '../user/user';

const Op = Sequelize.Op;
const testAccount = 500;
function assign<T>(json1: { [key: string]: any }, json2: { [key: string]: any }): T {
    const json = {};
    for (const key in json1) {
        if (json1.hasOwnProperty(key)) {
            json[key] = json1[key];
        }
    }
    for (const key in json2) {
        if (json2.hasOwnProperty(key)) {
            json[key] = json2[key];
        }
    }
    return json as T;
}
export class Login {
    public static async login(json: IUserinfoRequest): Promise<IUserResponse> {
        let userAccount: ITbl_account;
        if (json.token) {
            userAccount = await tbl_account.findOne({
                where: { token: json.token }
            });
        } else if (json.wxopenid) {
            userAccount = await tbl_account.findOne({
                where: { wxopenid: json.wxopenid, token: { [Op.regexp]: '\.' } }
            });
        } else if (json.xlopenid) {
            userAccount = await tbl_account.findOne({
                where: { xlopenid: json.xlopenid, token: { [Op.regexp]: '\.' } }
            });
        }
        // const userAccount: ITbl_account = await tbl_account.findOne({
        //     where: { ...parms, to }
        // });
        if (userAccount) {
            const userModel = await User.getUser({
                userid: userAccount.uid
            });
            return assign<IUserResponse>(userModel.toJSON(), {
                token: userAccount.token
            });
        } else {
            try {
                return sequelize.transaction(async (t) => {
                    // 这里还要生成一个token 注册时候是没有token的
                    const token = json.token;
                    const account = await tbl_account.create<ITbl_account>({
                        ...json,
                        token
                    }, {
                            transaction: t
                        });
                    // 这里面从第三方获取
                    const num = (Math.random() * 1000).toFixed(0);
                    const sdk = {
                        usernick: `test${num}`,
                        image: `img${num}`,
                        sex: Number.parseInt(num, 0)
                    };
                    const userModel = await tbl_user.create<ITbl_user>({
                        ...sdk,
                        userid: account.uid,
                        ...defaultUser
                    }, {
                            transaction: t
                        });
                    return assign<IUserResponse>(userModel.toJSON(), {
                        token
                    });
                });
            } catch (error) {
                return null;
            }
        }
    }

    public static async accountLogin(json: IAccountInfoRequest): Promise<IUserResponse> {

        const userAccount: ITbl_account = await tbl_account.findOne({
            where: {
                account: json.account
            }
        });
        if (userAccount && userAccount.password !== json.password) {
            // 存在   但是账号密码不符
            return null;
        } else if (userAccount && userAccount.password === json.password) {
            // 存在 账号密码相符
            const userModel = await User.getUser({
                userid: userAccount.uid
            });
            return assign<IUserResponse>(userModel.toJSON(), {
                token: ''
            });
        } else {
            // 不存在 创建一个
            let newIndex = 0;
            for (let index = 0; index < testAccount; index++) {
                const element = await tbl_account.findOne({
                    where: {
                        uid: index
                    }
                });
                if (!element.password && !element.account) {
                    newIndex = index;
                }
            }
            const account = await tbl_account.update(json, {
                where: {
                    uid: newIndex
                }
            });
            const userModel = await tbl_user.findOne({
                where: {
                    userid: account[1][0].uid
                }
            });
            return assign<IUserResponse>(userModel.toJSON(), {
                token: ''
            });
        }
    }

    public static async tokenLogin(json: ITokenInfoRequest): Promise<IUserResponse> {
        // 功能没写完 是假的

        const userAccount: ITbl_account = await tbl_account.findOne({
            where: { token: json.token }
        });
        if (userAccount) {
            const userModel = await User.getUser({
                userid: userAccount.uid
            });
            return assign<IUserResponse>(userModel.toJSON(), {
                token: userAccount.token
            });
        } else {
            return null;
        }
    }
}
