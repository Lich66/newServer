"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    static login(json) {
        return __awaiter(this, void 0, void 0, function* () {
            let userAccount;
            if (json.token) {
                userAccount = yield tbl_account_1.tbl_account.findOne({
                    where: { token: json.token }
                });
            }
            else if (json.wxopenid) {
                userAccount = yield tbl_account_1.tbl_account.findOne({
                    where: { wxopenid: json.wxopenid, token: { [Op.regexp]: '\.' } }
                });
            }
            else if (json.xlopenid) {
                userAccount = yield tbl_account_1.tbl_account.findOne({
                    where: { xlopenid: json.xlopenid, token: { [Op.regexp]: '\.' } }
                });
            }
            // const userAccount: ITbl_account = await tbl_account.findOne({
            //     where: { ...parms, to }
            // });
            if (userAccount) {
                const userModel = yield user_1.User.getUser({
                    userid: userAccount.uid
                });
                return selfUtils_1.SelfUtils.assign(userModel.toJSON(), {
                    token: userAccount.token
                });
            }
            else {
                try {
                    return sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                        // 这里还要生成一个token 注册时候是没有token的
                        const token = json.token;
                        const account = yield tbl_account_1.tbl_account.create(Object.assign({}, json, { token }), {
                            transaction: t
                        });
                        // 这里面从第三方获取
                        const num = (Math.random() * 1000).toFixed(0);
                        const sdk = {
                            usernick: `test${num}`,
                            image: `img${num}`,
                            sex: Number.parseInt(num, 0)
                        };
                        const userModel = yield tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid }, defaultUser_1.defaultUser), {
                            transaction: t
                        });
                        return selfUtils_1.SelfUtils.assign(userModel.toJSON(), {
                            token
                        });
                    }));
                }
                catch (error) {
                    return null;
                }
            }
        });
    }
    static accountLogin(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAccount = yield tbl_account_1.tbl_account.findOne({
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
                const userModel = yield user_1.User.getUser({
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
                    const element = yield tbl_account_1.tbl_account.findOne({
                        where: {
                            uid: index
                        }
                    });
                    if (!element.password && !element.account) {
                        newIndex = index;
                    }
                }
                const account = yield tbl_account_1.tbl_account.update(json, {
                    where: {
                        uid: newIndex
                    }
                });
                const userModel = yield tbl_user_1.tbl_user.findOne({
                    where: {
                        userid: account[1][0].uid
                    }
                });
                return selfUtils_1.SelfUtils.assign(userModel.toJSON(), {
                    token: ''
                });
            }
        });
    }
    static tokenLogin(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // 功能没写完 是假的
            const userAccount = yield tbl_account_1.tbl_account.findOne({
                where: { token: json.token }
            });
            if (userAccount) {
                const userModel = yield user_1.User.getUser({
                    userid: userAccount.uid
                });
                return selfUtils_1.SelfUtils.assign(userModel.toJSON(), {
                    token: userAccount.token
                });
            }
            else {
                return null;
            }
        });
    }
}
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9hY2NvdW50L2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSx1Q0FBdUM7QUFDdkMsa0RBQStDO0FBQy9DLDhEQUEyRDtBQUkzRCwwREFBdUQ7QUFDdkQsb0RBQWlEO0FBQ2pELG9EQUFpRDtBQUNqRCx1Q0FBb0M7QUFHcEMsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztBQUN4QixNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDeEIsTUFBYSxLQUFLO0lBQ1AsTUFBTSxDQUFPLEtBQUssQ0FBQyxJQUFzQjs7WUFDNUMsSUFBSSxXQUF5QixDQUFDO1lBQzlCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDWixXQUFXLEdBQUcsTUFBTSx5QkFBVyxDQUFDLE9BQU8sQ0FBQztvQkFDcEMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7aUJBQy9CLENBQUMsQ0FBQzthQUNOO2lCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDdEIsV0FBVyxHQUFHLE1BQU0seUJBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ3BDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFO2lCQUNuRSxDQUFDLENBQUM7YUFDTjtpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLFdBQVcsR0FBRyxNQUFNLHlCQUFXLENBQUMsT0FBTyxDQUFDO29CQUNwQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJ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