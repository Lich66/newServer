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
// import { IUserinfo, IAccountInfo, ITokenInfo, IUserModel } from '../../interface/user/handler/userInterface';
const user_1 = require("../user/user");
const sequelize_1 = require("../../sequelize/sequelize");
const tbl_user_1 = require("../../models/tbl_user");
function model2Json(model, parms, add) {
    const json = {};
    for (const iterator of parms) {
        json[iterator] = model[iterator];
    }
    for (const key in add) {
        if (add.hasOwnProperty(key)) {
            json[key] = add[key];
        }
    }
    return json;
}
class Login {
    static login(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAccount = yield tbl_account_1.tbl_account.findOne({ where: json });
            if (userAccount) {
                let userModel = yield user_1.User.getUser({ userid: userAccount.uid });
                return model2Json(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
            }
            else {
                try {
                    return sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                        // 这里还要生成一个token 注册时候是没有token的
                        let token = 'xxxxxxxxxxx';
                        let account = yield tbl_account_1.tbl_account.create(Object.assign({}, json, { token }), { transaction: t });
                        // 这里面从第三方获取
                        const num = (Math.random() * 1000).toFixed(0);
                        const sdk = {
                            usernick: `test${num}`,
                            image: `img${num}`,
                            sex: parseInt(num),
                        };
                        const userModel = yield tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid }), { transaction: t });
                        return model2Json(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
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
            // 功能没写完 是假的
            const userAccount = yield tbl_account_1.tbl_account.findOne({ where: json });
            if (userAccount) {
                let userModel = yield user_1.User.getUser({ userid: userAccount.uid });
                return model2Json(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
            }
            else {
                try {
                    return sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                        // 这里还要生成一个token 注册时候是没有token的
                        let token = 'xxxxxxxxxxx';
                        let account = yield tbl_account_1.tbl_account.create(Object.assign({}, json, { token }), { transaction: t });
                        // 这里面从第三方获取
                        const num = (Math.random() * 1000).toFixed(0);
                        const sdk = {
                            usernick: `test${num}`,
                            image: `img${num}`,
                            sex: parseInt(num),
                        };
                        const userModel = yield tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid }), { transaction: t });
                        return model2Json(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
                    }));
                }
                catch (error) {
                    return null;
                }
            }
        });
    }
    static tokenLogin(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // 功能没写完 是假的
            const userAccount = yield tbl_account_1.tbl_account.findOne({ where: json });
            if (userAccount) {
                const userModel = yield user_1.User.getUser({ userid: userAccount.uid });
                return model2Json(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
            }
            else {
                try {
                    return sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                        // 这里还要生成一个token 注册时候是没有token的
                        let token = 'xxxxxxxxxxx';
                        let account = yield tbl_account_1.tbl_account.create(Object.assign({}, json, { token }), { transaction: t });
                        // 这里面从第三方获取
                        const num = (Math.random() * 1000).toFixed(0);
                        const sdk = {
                            usernick: `test${num}`,
                            image: `img${num}`,
                            sex: parseInt(num),
                        };
                        const userModel = yield tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid }), { transaction: t });
                        return model2Json(userModel, ['userid', 'usernick', 'image', 'regtime', 'diamond', 'region', 'ip', 'sex', 'invite_code', 'inviter', 'logintime'], { token: userAccount.token });
                    }));
                }
                catch (error) {
                    return null;
                }
            }
        });
    }
}
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9hY2NvdW50L2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwwREFBdUQ7QUFDdkQsZ0hBQWdIO0FBQ2hILHVDQUFvQztBQUNwQyx5REFBc0Q7QUFDdEQsb0RBQWlEO0FBR2pELG9CQUEwQixLQUFRLEVBQUUsS0FBZSxFQUFFLEdBQTJCO0lBQzVFLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNoQixLQUFLLE1BQU0sUUFBUSxJQUFJLEtBQUssRUFBRTtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ25DO0lBQ0QsS0FBSyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUU7UUFDbkIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7S0FDSjtJQUNELE9BQU8sSUFBUyxDQUFDO0FBQ3JCLENBQUM7QUFDRDtJQUNXLE1BQU0sQ0FBTyxLQUFLLENBQUMsSUFBc0I7O1lBQzVDLE1BQU0sV0FBVyxHQUFpQixNQUFNLHlCQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDN0UsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsSUFBSSxTQUFTLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLFVBQVUsQ0FBMkIsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxh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