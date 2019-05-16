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
    // 实际上没这个方法 创建用户永远是和account里面一起创建的
    static addUser(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_user_1.tbl_user.create(json);
        });
    }
    static deleteUser() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static updateUser(ojson, njson) {
        return __awaiter(this, void 0, void 0, function* () {
            // {uid:x},{diamond:9}
            let result = yield tbl_user_1.tbl_user.update(njson, { where: Object.assign({}, ojson) });
            return result[0];
            // let result = await tbl_club.update(njson, { where: { ...ojson } });
        });
    }
    static getUser(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_user_1.tbl_user.findOne({ where: json });
        });
    }
}
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL3VzZXIvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsb0RBQWlEO0FBQ2pEO0lBQ0ksa0NBQWtDO0lBQzNCLE1BQU0sQ0FBTyxPQUFPLENBQUMsSUFBa0I7O1lBQzFDLE9BQU8sTUFBTSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sVUFBVTs7UUFFOUIsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFVBQVUsQ0FBQyxLQUFtQixFQUFFLEtBQW1COztZQUNuRSxzQkFBc0I7WUFDdEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLG9CQUFPLEtBQUssQ0FBRSxFQUFFLENBQUMsQ0FBQztZQUNuRSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixzRUFBc0U7UUFDMUUsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLE9BQU8sQ0FBQyxJQUFrQjs7WUFDMUMsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0NBQ0o7QUFqQkQsb0JBaUJDIn0=