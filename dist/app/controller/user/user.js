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
const tbl_user_1 = require("../../models/tbl_user");
class User {
    static addUser(json) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tbl_user_1.tbl_user.removeAttribute('id');
            const user = yield tbl_user_1.tbl_user.create(json);
            return user;
        });
    }
    static deleteUser() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static updateUser() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static getUser() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL3VzZXIvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0RBQWlEO0FBR2pEO0lBQ1csTUFBTSxDQUFPLE9BQU8sQ0FBQyxJQUFVOztZQUNsQyxNQUFNLG1CQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sSUFBSSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLENBQWEsSUFBSSxDQUFDLENBQUM7WUFDckQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFVBQVU7O1FBRTlCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxVQUFVOztRQUU5QixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sT0FBTzs7UUFFM0IsQ0FBQztLQUFBO0NBQ0o7QUFmRCxvQkFlQyJ9