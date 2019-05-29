
import * as Sequelize from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ITbl_account } from '../../interface/models/tbl_account';
import { ITbl_user } from '../../interface/models/tbl_user';
import { IAccountInfoRequest, ITokenInfoRequest, IUserinfoRequest, IUserResponse } from '../../interface/user/userInterface';
import { tbl_account } from '../../models/tbl_account';
import { tbl_user } from '../../models/tbl_user';
import { SelfUtils } from '../../util/selfUtils';
import { Base } from '../base/base';
import { User } from '../user/user';

const Op = Sequelize.Op;
const testAccount = 500;
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
            return SelfUtils.assign<IUserResponse>(userModel.toJSON(), {
                token: userAccount.token
            });
        } else {
            try {
                const diamond = Base.getdefaultDiamond();
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
                        diamond
                    }, {
                            transaction: t
                        });
                    return SelfUtils.assign<IUserResponse>(userModel.toJSON(), {
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
        const defaultDiamond = await Base.getdefaultDiamond();
        if (userAccount && userAccount.password !== json.password) {
            // 存在   但是账号密码不符
            return null;
        } else if (userAccount && userAccount.password === json.password) {
            // 存在 账号密码相符
            const userModel = await User.getUser({
                userid: userAccount.uid
            });
            return SelfUtils.assign<IUserResponse>(userModel.toJSON(), {
                token: ''
            });
        } else {
            // 不存在 创建一个
            let newIndex = 0;
            for (let index = 1; index < testAccount; index++) {
                const element = await tbl_account.findOne({
                    where: {
                        uid: index
                    }
                });
                if (!element.password && !element.account) {
                    newIndex = index;
                    break;
                }
            }
            let c: [number, number];
            try {
                c = await sequelize.transaction(async (t) => {
                    const a = await tbl_account.update(json, {
                        where: {
                            uid: newIndex
                        },
                        transaction: t
                    });
                    const b = await tbl_user.update({
                        image: 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%A3%8B%E7%89%8C%E6%B8%B8%E6%88%8F%E4%BA%BA%E7%89%A9%E5%A4%B4%E5%83%8F&step_word=&hs=2&pn=1010&spn=0&di=33220&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=1844002122%2C2059185862&os=3619222530%2C1361906225&simid=0%2C0&adpicid=0&lpn=0&ln=1479&fr=&fmq=1559112788045_R&fm=result&ic=&s=undefined&hd=&latest=&copyright=&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fimgup04.iefans.net%2Fiefans%2F2019-03%2F13%2F12%2F15524501156315_0.png&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Btjuwgf_z%26e3BgjpAzdH3FxtwzwtAzdH3Fenc8888_z%26e3Bip4s&gsm=3c0&rpstart=0&rpnum=0&islist=&querylist=&force=undefined',
                        usernick: `用户${newIndex}`,
                        diamond: defaultDiamond
                    }, {
                            where: {
                                userid: newIndex
                            },
                            transaction: t
                        });
                    return [a[0], b[0]];
                });

            } catch (error) {
                return null;
            }
            if (c[0] > 0 && c[1] > 0) {
                const userModel = await tbl_user.findOne({
                    where: {
                        userid: newIndex
                    }
                });
                return SelfUtils.assign<IUserResponse>(userModel.toJSON(), {
                    token: ''
                });
            } else {
                return null;
            }


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
            return SelfUtils.assign<IUserResponse>(userModel.toJSON(), {
                token: userAccount.token
            });
        } else {
            return null;
        }
    }
}
