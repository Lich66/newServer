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
class ClubRoom {
    // 实际上没这个方法 创建房间永远是和创建茶楼里面一起创建的
    static addClubRoom(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_room_1.tbl_room.create(json);
        });
    }
    // 实际上没这个方法 删除房间永远是和删除茶楼里面一起创建的
    static deleteClubRoom() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    // 好像房间也不能改
    static updateClubRoom(ojson, njson) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield tbl_room_1.tbl_room.update(njson, { where: Object.assign({}, ojson) });
            // let club = ;
            return result[1][0];
        });
    }
    static getClubRoom(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_room_1.tbl_room.findAll({ where: json });
        });
    }
}
exports.ClubRoom = ClubRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9jbHViUm9vbS9jbHViUm9vbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0Esb0RBQWlEO0FBRWpEO0lBQ0ksK0JBQStCO0lBQ3hCLE1BQU0sQ0FBTyxXQUFXLENBQUMsSUFBc0I7O1lBQ2xELE9BQU8sTUFBTSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO0tBQUE7SUFDRCwrQkFBK0I7SUFDeEIsTUFBTSxDQUFPLGNBQWM7O1FBRWxDLENBQUM7S0FBQTtJQUNELFdBQVc7SUFDSixNQUFNLENBQU8sY0FBYyxDQUFDLEtBQXVCLEVBQUUsS0FBdUI7O1lBQy9FLElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxvQkFBTyxLQUFLLENBQUUsRUFBRSxDQUFDLENBQUM7WUFDbkUsZUFBZTtZQUNmLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxXQUFXLENBQUMsSUFBc0I7O1lBQ2xELE9BQU8sTUFBTSxtQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtDQUNKO0FBbEJELDRCQWtCQyJ9