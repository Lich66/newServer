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
const sequelize_1 = require("../../db/sequelize");
const defaultUser_1 = require("../../gameConfig/defaultUser");
const tbl_account_1 = require("../../models/tbl_account");
const tbl_user_1 = require("../../models/tbl_user");
const user_1 = require("../user/user");
const testAccount = 500;
function assign(json1, json2) {
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
    return json;
}
class Login {
    static login(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAccount = yield tbl_account_1.tbl_account.findOne({
                where: json
            });
            if (userAccount) {
                const userModel = yield user_1.User.getUser({
                    userid: userAccount.uid
                });
                return assign(userModel.toJSON(), {
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
                        return assign(userModel.toJSON(), {
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
                return assign(userModel.toJSON(), {
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
                return assign(userModel.toJSON(), {
                    token: ''
                });
            }
        });
    }
    static tokenLogin(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // 功能没写完 是假的
            const userAccount = yield tbl_account_1.tbl_account.findOne({
                where: json
            });
            if (userAccount) {
                const userModel = yield user_1.User.getUser({
                    userid: userAccount.uid
                });
                return assign(userModel.toJSON(), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9hY2NvdW50L2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxrREFBK0M7QUFDL0MsOERBQTJEO0FBSTNELDBEQUF1RDtBQUN2RCxvREFBaUQ7QUFDakQsdUNBQW9DO0FBRXBDLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUN4QixnQkFBbUIsS0FBNkIsRUFBRSxLQUE2QjtJQUMzRSxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDckIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7S0FDSjtJQUNELEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO1FBQ3JCLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO0tBQ0o7SUFDRCxPQUFPLElBQVMsQ0FBQztBQUNyQixDQUFDO0FBQ0Q7SUFDVyxNQUFNLENBQU8sS0FBSyxDQUFDLElBQXNCOztZQUM1QyxNQUFNLFdBQVcsR0FBaUIsTUFBTSx5QkFBVyxDQUFDLE9BQU8sQ0FBQztnQkFDeEQsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7WUFDSCxJQUFJLFdBQVcsRUFBRTtnQkFDYixNQUFNLFNBQVMsR0FBRyxNQUFNLFdBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ2pDLE1BQU0sRUFBRSxXQUFXLENBQUMsR0FBRztpQkFDMUIsQ0FBQyxDQUFDO2dCQUNILE9BQU8sTUFBTSxDQUFnQixTQUFTLENBQUMsTUFBTSxFQUFF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