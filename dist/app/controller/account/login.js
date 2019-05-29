"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("../../db/sequelize");
const tbl_account_1 = require("../../models/tbl_account");
const tbl_user_1 = require("../../models/tbl_user");
const selfUtils_1 = require("../../util/selfUtils");
const base_1 = require("../base/base");
const user_1 = require("../user/user");
const Op = Sequelize.Op;
const testAccount = 500;
class Login {
    static async login(json) {
        let userAccount;
        if (json.token) {
            userAccount = await tbl_account_1.tbl_account.findOne({
                where: { token: json.token }
            });
        }
        else if (json.wxopenid) {
            userAccount = await tbl_account_1.tbl_account.findOne({
                where: { wxopenid: json.wxopenid, token: { [Op.regexp]: '\.' } }
            });
        }
        else if (json.xlopenid) {
            userAccount = await tbl_account_1.tbl_account.findOne({
                where: { xlopenid: json.xlopenid, token: { [Op.regexp]: '\.' } }
            });
        }
        // const userAccount: ITbl_account = await tbl_account.findOne({
        //     where: { ...parms, to }
        // });
        if (userAccount) {
            const userModel = await user_1.User.getUser({
                userid: userAccount.uid
            });
            return selfUtils_1.SelfUtils.assign(userModel.toJSON(), {
                token: userAccount.token
            });
        }
        else {
            try {
                const diamond = base_1.Base.getdefaultDiamond();
                return sequelize_1.sequelize.transaction(async (t) => {
                    // 这里还要生成一个token 注册时候是没有token的
                    const token = json.token;
                    const account = await tbl_account_1.tbl_account.create(Object.assign({}, json, { token }), {
                        transaction: t
                    });
                    // 这里面从第三方获取
                    const num = (Math.random() * 1000).toFixed(0);
                    const sdk = {
                        usernick: `test${num}`,
                        image: `img${num}`,
                        sex: Number.parseInt(num, 0)
                    };
                    const userModel = await tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid, diamond }), {
                        transaction: t
                    });
                    return selfUtils_1.SelfUtils.assign(userModel.toJSON(), {
                        token
                    });
                });
            }
            catch (error) {
                return null;
            }
        }
    }
    static async accountLogin(json) {
        const userAccount = await tbl_account_1.tbl_account.findOne({
            where: {
                account: json.account
            }
        });
        const defaultDiamond = await base_1.Base.getdefaultDiamond();
        if (userAccount && userAccount.password !== json.password) {
            // 存在   但是账号密码不符
            return null;
        }
        else if (userAccount && userAccount.password === json.password) {
            // 存在 账号密码相符
            const userModel = await user_1.User.getUser({
                userid: userAccount.uid
            });
            return selfUtils_1.SelfUtils.assign(userModel.toJSON(), {
                token: ''
            });
        }
        else {
            // 不存在 创建一个
            let newIndex = 0;
            for (let index = 1; index < testAccount; index++) {
                const element = await tbl_account_1.tbl_account.findOne({
                    where: {
                        uid: index
                    }
                });
                if (!element.password && !element.account) {
                    newIndex = index;
                    break;
                }
            }
            let c;
            try {
                c = await sequelize_1.sequelize.transaction(async (t) => {
                    const a = await tbl_account_1.tbl_account.update(json, {
                        where: {
                            uid: newIndex
                        },
                        transaction: t
                    });
                    const b = await tbl_user_1.tbl_user.update({
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
            }
            catch (error) {
                return null;
            }
            if (c[0] > 0 && c[1] > 0) {
                const userModel = await tbl_user_1.tbl_user.findOne({
                    where: {
                        userid: newIndex
                    }
                });
                return selfUtils_1.SelfUtils.assign(userModel.toJSON(), {
                    token: ''
                });
            }
            else {
                return null;
            }
        }
    }
    static async tokenLogin(json) {
        // 功能没写完 是假的
        const userAccount = await tbl_account_1.tbl_account.findOne({
            where: { token: json.token }
        });
        if (userAccount) {
            const userModel = await user_1.User.getUser({
                userid: userAccount.uid
            });
            return selfUtils_1.SelfUtils.assign(userModel.toJSON(), {
                token: userAccount.token
            });
        }
        else {
            return null;
        }
    }
}
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9hY2NvdW50L2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsdUNBQXVDO0FBQ3ZDLGtEQUErQztBQUkvQywwREFBdUQ7QUFDdkQsb0RBQWlEO0FBQ2pELG9EQUFpRDtBQUNqRCx1Q0FBb0M7QUFDcEMsdUNBQW9DO0FBRXBDLE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDeEIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3hCLE1BQWEsS0FBSztJQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQXNCO1FBQzVDLElBQUksV0FBeUIsQ0FBQztRQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixXQUFXLEdBQUcsTUFBTSx5QkFBVyxDQUFDLE9BQU8sQ0FBQztnQkFDcEMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7YUFDL0IsQ0FBQyxDQUFDO1NBQ047YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdEIsV0FBVyxHQUFHLE1BQU0seUJBQVcsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFO2FBQ25FLENBQUMsQ0FBQztTQUNOO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3RCLFdBQVcsR0FBRyxNQUFNLHlCQUFXLENBQUMsT0FBTyxDQUFDO2dCQUNwQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUs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