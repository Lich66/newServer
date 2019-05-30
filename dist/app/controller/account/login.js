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
                const diamond = await base_1.Base.getdefaultDiamond();
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