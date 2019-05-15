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
const tbl_account_1 = require("../../models/tbl_account");
const user_1 = require("../user/user");
const sequelize_1 = require("../../db/sequelize");
const tbl_user_1 = require("../../models/tbl_user");
const defaultUser_1 = require("../../gameConfig/defaultUser");
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
                where: json,
            });
            if (userAccount) {
                const userModel = yield user_1.User.getUser({
                    userid: userAccount.uid,
                });
                return assign(userModel.toJSON(), {
                    token: userAccount.token,
                });
            }
            else {
                try {
                    return sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                        // 这里还要生成一个token 注册时候是没有token的
                        const token = json.token;
                        const account = yield tbl_account_1.tbl_account.create(Object.assign({}, json, { token }), {
                            transaction: t,
                        });
                        // 这里面从第三方获取
                        const num = (Math.random() * 1000).toFixed(0);
                        const sdk = {
                            usernick: `test${num}`,
                            image: `img${num}`,
                            sex: Number.parseInt(num, 0),
                        };
                        const userModel = yield tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid }, defaultUser_1.defaultUser), {
                            transaction: t,
                        });
                        return assign(userModel.toJSON(), {
                            token,
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
                    account: json.account,
                },
            });
            if (userAccount && userAccount.password !== json.password) {
                // 存在   但是账号密码不符
                return null;
            }
            else if (userAccount && userAccount.password === json.password) {
                // 存在 账号密码相符
                const userModel = yield user_1.User.getUser({
                    userid: userAccount.uid,
                });
                return assign(userModel.toJSON(), {
                    token: '',
                });
            }
            else {
                // 不存在 创建一个
                let newIndex = 0;
                for (let index = 0; index < 500; index++) {
                    const element = yield tbl_account_1.tbl_account.findOne({
                        where: {
                            uid: index,
                        },
                    });
                    if (!element.password && !element.account) {
                        newIndex = index;
                    }
                }
                const account = yield tbl_account_1.tbl_account.update(json, {
                    where: {
                        uid: newIndex,
                    },
                });
                const userModel = yield tbl_user_1.tbl_user.findOne({
                    where: {
                        userid: account[1][0].uid,
                    },
                });
                return assign(userModel.toJSON(), {
                    token: '',
                });
            }
        });
    }
    static tokenLogin(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // 功能没写完 是假的
            const userAccount = yield tbl_account_1.tbl_account.findOne({
                where: json,
            });
            if (userAccount) {
                const userModel = yield user_1.User.getUser({
                    userid: userAccount.uid,
                });
                return assign(userModel.toJSON(), {
                    token: userAccount.token,
                });
            }
            else {
                return null;
            }
        });
    }
}
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9hY2NvdW50L2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSwwREFFa0M7QUFDbEMsdUNBRXNCO0FBQ3RCLGtEQUU0QjtBQUM1QixvREFFK0I7QUFVL0IsOERBRXNDO0FBRXRDLGdCQUFtQixLQUE2QixFQUFFLEtBQTZCO0lBQzNFLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNoQixLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtRQUNyQixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMxQjtLQUNKO0lBQ0QsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDckIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7S0FDSjtJQUNELE9BQU8sSUFBUyxDQUFDO0FBQ3JCLENBQUM7QUFDRDtJQUNXLE1BQU0sQ0FBTyxLQUFLLENBQUMsSUFBc0I7O1lBQzVDLE1BQU0sV0FBVyxHQUFpQixNQUFNLHlCQUFXLENBQUMsT0FBTyxDQUFDO2dCQUN4RCxLQUFLLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQztZQUNILElBQUksV0FBVyxFQUFFO2dCQUNiLE1BQU0sU0FBUyxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDakMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxHQUFHO2lCQUMxQixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxNQUFNLENBQWdCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDN0MsS0FBSyxFQUFFLFdBQVcsQ0FB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