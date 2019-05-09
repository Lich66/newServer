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
const defaultUser_1 = require("../../gameConfig/defaultUser");
class Login {
    static login(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // 因为表中没有id
            yield tbl_account_1.tbl_account.removeAttribute('id');
            const userone = yield tbl_account_1.tbl_account.findOrCreate({ where: json, defaults: Object.assign({}, defaultUser_1.defaultUser, json) });
            return userone;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci91c2VyL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSwwREFBdUQ7QUFDdkQsOERBQTJEO0FBRTNEO0lBQ1csTUFBTSxDQUFPLEtBQUssQ0FBQyxJQUFlOztZQUNyQyxXQUFXO1lBQ1gsTUFBTSx5QkFBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxNQUFNLE9BQU8sR0FBNEIsTUFBTSx5QkFBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxvQkFBTyx5QkFBVyxFQUFLLElBQUksQ0FBRSxFQUFFLENBQUMsQ0FBQztZQUNoSSxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO0tBQUE7SUFFTSxNQUFNLENBQU8sWUFBWSxDQUFDLElBQWtCOztZQUMvQyxNQUFNLHlCQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sT0FBTyxHQUE0QixNQUFNLHlCQUFXLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM5SCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO0tBQUE7SUFFTSxNQUFNLENBQU8sVUFBVSxDQUFDLElBQWdCOztZQUMzQyxNQUFNLHlCQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sT0FBTyxHQUFpQixNQUFNLHlCQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUYsT0FBTyxPQUFPLENBQUE7UUFDbEIsQ0FBQztLQUFBO0NBQ0o7QUFuQkQsc0JBbUJDIn0=