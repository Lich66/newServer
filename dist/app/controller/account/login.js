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
            const userAccount = yield tbl_account_1.tbl_account.findOne({ where: json });
            if (userAccount) {
                let userModel = yield user_1.User.getUser({ userid: userAccount.uid });
                return assign(userModel.toJSON(), { token: userAccount.token });
            }
            else {
                try {
                    return sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                        // 这里还要生成一个token 注册时候是没有token的
                        const token = json.token;
                        let account = yield tbl_account_1.tbl_account.create(Object.assign({}, json, { token }), { transaction: t });
                        // 这里面从第三方获取
                        const num = (Math.random() * 1000).toFixed(0);
                        const sdk = {
                            usernick: `test${num}`,
                            image: `img${num}`,
                            sex: parseInt(num),
                        };
                        const userModel = yield tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid }, defaultUser_1.defaultUser), { transaction: t });
                        return assign(userModel.toJSON(), { token: token });
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
            const userAccount = yield tbl_account_1.tbl_account.findOne({ where: { account: json.account } });
            if (userAccount && userAccount.password !== json.password) {
                // 存在   但是账号密码不符  
                return null;
            }
            else if (userAccount && userAccount.password === json.password) {
                // 存在 账号密码相符
                let userModel = yield user_1.User.getUser({ userid: userAccount.uid });
                return assign(userModel.toJSON(), { token: '' });
            }
            else {
                // 不存在 创建一个
                let newIndex = 0;
                for (let index = 0; index < 500; index++) {
                    const element = yield tbl_account_1.tbl_account.findOne({ where: { uid: index } });
                    if (!element.password && !element.account) {
                        newIndex = index;
                    }
                }
                const account = yield tbl_account_1.tbl_account.update(json, { where: { uid: newIndex } });
                const userModel = yield tbl_user_1.tbl_user.findOne({ where: { userid: account[1][0].uid } });
                return assign(userModel.toJSON(), { token: '' });
                ;
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
                return null;
            }
        });
    }
}
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9hY2NvdW50L2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwwREFBdUQ7QUFDdkQsZ0hBQWdIO0FBQ2hILHVDQUFvQztBQUNwQyxrREFBK0M7QUFDL0Msb0RBQWlEO0FBR2pELDhEQUEyRDtBQUMzRCxnQkFBbUIsS0FBNkIsRUFBRSxLQUE2QjtJQUMzRSxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDckIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7S0FDSjtJQUNELEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO1FBQ3JCLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO0tBQ0o7SUFDRCxPQUFPLElBQVMsQ0FBQztBQUNyQixDQUFDO0FBQ0Q7SUFDVyxNQUFNLENBQU8sS0FBSyxDQUFDLElBQXNCOztZQUM1QyxNQUFNLFdBQVcsR0FBaUIsTUFBTSx5QkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzdFLElBQUksV0FBVyxFQUFFO2dCQUNiLElBQUksU0FBUyxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDaEUsT0FBTyxNQUFNLENBQWdCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxX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