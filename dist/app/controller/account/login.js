"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize_1 = require("../../db/sequelize");
const defaultUser_1 = require("../../gameConfig/defaultUser");
const tbl_account_1 = require("../../models/tbl_account");
const tbl_user_1 = require("../../models/tbl_user");
const selfUtils_1 = require("../../util/selfUtils");
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
                    const userModel = await tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid }, defaultUser_1.defaultUser), {
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
            for (let index = 0; index < testAccount; index++) {
                const element = await tbl_account_1.tbl_account.findOne({
                    where: {
                        uid: index
                    }
                });
                if (!element.password && !element.account) {
                    newIndex = index;
                }
            }
            const account = await tbl_account_1.tbl_account.update(json, {
                where: {
                    uid: newIndex
                }
            });
            const userModel = await tbl_user_1.tbl_user.findOne({
                where: {
                    userid: account[1][0].uid
                }
            });
            return selfUtils_1.SelfUtils.assign(userModel.toJSON(), {
                token: ''
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9hY2NvdW50L2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsdUNBQXVDO0FBQ3ZDLGtEQUErQztBQUMvQyw4REFBMkQ7QUFJM0QsMERBQXVEO0FBQ3ZELG9EQUFpRDtBQUNqRCxvREFBaUQ7QUFDakQsdUNBQW9DO0FBR3BDLE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDeEIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3hCLE1BQWEsS0FBSztJQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQXNCO1FBQzVDLElBQUksV0FBeUIsQ0FBQztRQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixXQUFXLEdBQUcsTUFBTSx5QkFBVyxDQUFDLE9BQU8sQ0FBQztnQkFDcEMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7YUFDL0IsQ0FBQyxDQUFDO1NBQ047YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdEIsV0FBVyxHQUFHLE1BQU0seUJBQVcsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFO2FBQ25FLENBQUMsQ0FBQztTQUNOO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3RCLFdBQVcsR0FBRyxNQUFNLHlCQUFXLENBQUMsT0FBTyxDQUFDO2dCQUNwQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUs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