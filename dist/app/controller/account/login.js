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
class Login {
    static login(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // 因为表中没有id
            yield tbl_account_1.tbl_account.removeAttribute('id');
            const userAccount = yield tbl_account_1.tbl_account.findCreateFind({ where: json, defaults: json });
            console.log('********************************************');
            console.log(JSON.stringify(userAccount[0]));
            console.log(userAccount[0].uid);
            console.log(typeof userAccount[0].uid);
            console.log(userAccount[1]);
            console.log(typeof userAccount[1]);
            let user;
            // 这里面从第三方获取
            const num = (Math.random() * 1000).toFixed(0);
            const sdk = {
                usernick: `test${num}`,
                image: `img${num}`,
                sex: parseInt(num),
            };
            if (userAccount[1]) {
                user = yield user_1.User.addUser(Object.assign({}, sdk, { userid: userAccount[0].uid }));
            }
            return user;
        });
    }
    static accountLogin(json) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tbl_account_1.tbl_account.removeAttribute('id');
            const userone = yield tbl_account_1.tbl_account.findOrCreate({ where: { account: json.account }, defaults: json });
            return userone;
        });
    }
    static tokenLogin(json) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tbl_account_1.tbl_account.removeAttribute('id');
            const userone = yield tbl_account_1.tbl_account.findOne({ where: { account: json.token } });
            return userone;
        });
    }
}
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9hY2NvdW50L2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSwwREFBdUQ7QUFFdkQsdUNBQW9DO0FBQ3BDO0lBQ1csTUFBTSxDQUFPLEtBQUssQ0FBQyxJQUFlOztZQUNyQyxXQUFXO1lBQ1gsTUFBTSx5QkFBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxNQUFNLFdBQVcsR0FBNEIsTUFBTSx5QkFBVyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDL0csT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFBO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEMsSUFBSSxJQUFnQixDQUFDO1lBQ3JCLFlBQVk7WUFDWixNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDN0MsTUFBTSxHQUFHLEdBQUc7Z0JBQ1IsUUFBUSxFQUFFLE9BQU8sR0FBRyxFQUFFO2dCQUN0QixLQUFLLEVBQUUsTUFBTSxHQUFHLEVBQUU7Z0JBQ2xCLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDO2FBQ3JCLENBQUE7WUFDRCxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sbUJBQU0sR0FBRyxJQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFHLENBQUM7YUFDckU7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFTSxNQUFNLENBQU8sWUFBWSxDQUFDLElBQWtCOztZQUMvQyxNQUFNLHlCQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sT0FBTyxHQUE0QixNQUFNLHlCQUFXLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM5SCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO0tBQUE7SUFFTSxNQUFNLENBQU8sVUFBVSxDQUFDLElBQWdCOztZQUMzQyxNQUFNLHlCQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sT0FBTyxHQUFpQixNQUFNLHlCQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUYsT0FBTyxPQUFPLENBQUE7UUFDbEIsQ0FBQztLQUFBO0NBQ0o7QUFwQ0Qsc0JBb0NDIn0=