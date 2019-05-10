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
            const userAccount = yield tbl_account_1.tbl_account.findOne({ where: json });
            if (userAccount) {
                let userModel = yield user_1.User.getUser({ userid: userAccount.uid });
                return assign(userModel.toJSON(), { token: userAccount.token });
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
                        const userModel = yield tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid }, defaultUser_1.defaultUser), { transaction: t });
                        userModel.toJSON();
                        return assign(userModel.toJSON(), { token: userAccount.token });
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
                return assign(userModel.toJSON(), { token: userAccount.token });
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
                        const userModel = yield tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid }, defaultUser_1.defaultUser), { transaction: t });
                        return assign(userModel.toJSON(), { token: userAccount.token });
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
                return assign(userModel.toJSON(), { token: userAccount.token });
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
                        const userModel = yield tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid }, defaultUser_1.defaultUser), { transaction: t });
                        return assign(userModel.toJSON(), { token: userAccount.token });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9hY2NvdW50L2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwwREFBdUQ7QUFDdkQsZ0hBQWdIO0FBQ2hILHVDQUFvQztBQUNwQyx5REFBc0Q7QUFDdEQsb0RBQWlEO0FBR2pELDhEQUEyRDtBQUMzRCxnQkFBbUIsS0FBNkIsRUFBRSxLQUE2QjtJQUMzRSxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDckIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7S0FDSjtJQUNELEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO1FBQ3JCLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO0tBQ0o7SUFDRCxPQUFPLElBQVMsQ0FBQztBQUNyQixDQUFDO0FBQ0Q7SUFDVyxNQUFNLENBQU8sS0FBSyxDQUFDLElBQXNCOztZQUM1QyxNQUFNLFdBQVcsR0FBaUIsTUFBTSx5QkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzdFLElBQUksV0FBVyxFQUFFO2dCQUNiLElBQUksU0FBUyxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDaEUsT0FBTyxNQUFNLENBQWdCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxX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