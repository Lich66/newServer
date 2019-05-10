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
const sequelize_1 = require("../../sequelize/sequelize");
const tbl_user_1 = require("../../models/tbl_user");
class Login {
    static login(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAccount = yield tbl_account_1.tbl_account.findOne({ where: json });
            if (userAccount) {
                return yield user_1.User.getUser({ userid: userAccount.uid });
            }
            else {
                try {
                    let user = sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                        let account = yield tbl_account_1.tbl_account.create(json, { transaction: t });
                        // 这里面从第三方获取
                        const num = (Math.random() * 1000).toFixed(0);
                        const sdk = {
                            usernick: `test${num}`,
                            image: `img${num}`,
                            sex: parseInt(num),
                        };
                        let user = yield tbl_user_1.tbl_user.create(Object.assign({}, sdk, { userid: account.uid }), { transaction: t });
                        return user;
                    }));
                    return user;
                }
                catch (error) {
                    return null;
                }
            }
            // const userAccount: [ITbl_account, boolean] = await tbl_account.findOrCreate({ where: json, defaults: json });
            console.log('********************************************');
            console.log(JSON.stringify(userAccount[0]));
            console.log(userAccount[0].uid);
            console.log(typeof userAccount[0].uid);
            console.log(userAccount[1]);
            console.log(typeof userAccount[1]);
            sequelize_1.sequelize.transaction();
            // if (userAccount[1]) {
            //     user = await User.addUser({ ...sdk, userid: userAccount[0].uid });
            // }
            // return user;
        });
    }
    static accountLogin(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // await tbl_account.removeAttribute('id');
            const userone = yield tbl_account_1.tbl_account.findOrCreate({ where: { account: json.account }, defaults: json });
            return userone;
        });
    }
    static tokenLogin(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // await tbl_account.removeAttribute('id');
            const userone = yield tbl_account_1.tbl_account.findOne({ where: { account: json.token } });
            return userone;
        });
    }
}
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9hY2NvdW50L2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwwREFBdUQ7QUFFdkQsdUNBQW9DO0FBQ3BDLHlEQUFzRDtBQUN0RCxvREFBaUQ7QUFDakQ7SUFDVyxNQUFNLENBQU8sS0FBSyxDQUFDLElBQWU7O1lBQ3JDLE1BQU0sV0FBVyxHQUFpQixNQUFNLHlCQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDN0UsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsT0FBTyxNQUFNLFdBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7YUFDekQ7aUJBQU07Z0JBQ0gsSUFBSTtvQkFDQSxJQUFJLElBQUksR0FBRyxxQkFBUyxDQUFDLFdBQVcsQ0FBTSxDQUFPLENBQUMsRUFBRSxFQUFFO3dCQUM5QyxJQUFJLE9BQU8sR0FBRyxNQUFNLHlCQUFXLENBQUMsTUFBTSxDQUFlLElBQUksRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUMvRSxZQUFZO3dCQUNaLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTt3QkFDN0MsTUFBTSxHQUFHLEdBQUc7NEJBQ1IsUUFBUSxFQUFFLE9BQU8sR0FBRyxFQUFFOzRCQUN0QixLQUFLLEVBQUUsTUFBTSxHQUFHLEVBQUU7NEJBQ2xCLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDO3lCQUNyQixDQUFBO3dCQUNELElBQUksSUFBSSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLG1CQUFrQixHQUFHLElBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEtBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTt3QkFDakcsT0FBTyxJQUFJLENBQUE7b0JBRWYsQ0FBQyxDQUFBLENBQUMsQ0FBQztvQkFDSCxPQUFPLElBQUksQ0FBQTtpQkFDZDtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDWixPQUFPLElBQUksQ0FBQTtpQkFDZDthQUNKO1lBRUQsZ0hBQWdIO1lBQ2hILE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQThDLENBQUMsQ0FBQTtZQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xDLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7WUFFdkIsd0JBQXdCO1lBQ3hCLHlFQUF5RTtZQUN6RSxJQUFJO1lBQ0osZUFBZTtRQUNuQixDQUFDO0tBQUE7SUFFTSxNQUFNLENBQU8sWUFBWSxDQUFDLElBQWtCOztZQUMvQywyQ0FBMkM7WUFDM0MsTUFBTSxPQUFPLEdBQTRCLE1BQU0seUJBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzlILE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7S0FBQTtJQUVNLE1BQU0sQ0FBTyxVQUFVLENBQUMsSUFBZ0I7O1lBQzNDLDJDQUEyQztZQUMzQyxNQUFNLE9BQU8sR0FBaUIsTUFBTSx5QkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzVGLE9BQU8sT0FBTyxDQUFBO1FBQ2xCLENBQUM7S0FBQTtDQUNKO0FBcERELHNCQW9EQyJ9