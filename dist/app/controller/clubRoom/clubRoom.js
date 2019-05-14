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
const tbl_room_1 = require("../../models/tbl_room");
class User {
    // 实际上没这个方法 创建用户永远是和account里面一起创建的
    static addUser(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_room_1.tbl_room.create(json);
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
    static getUser(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_room_1.tbl_room.findOne({ where: json });
        });
    }
}
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9jbHViUm9vbS9jbHViUm9vbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0Esb0RBQWlEO0FBRWpEO0lBQ0ksa0NBQWtDO0lBQzNCLE1BQU0sQ0FBTyxPQUFPLENBQUMsSUFBc0I7O1lBQzlDLE9BQU8sTUFBTSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sVUFBVTs7UUFFOUIsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFVBQVU7O1FBRTlCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxPQUFPLENBQUMsSUFBc0I7O1lBQzlDLE9BQU8sTUFBTSxtQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ2xELENBQUM7S0FBQTtDQUNKO0FBZEQsb0JBY0MifQ==