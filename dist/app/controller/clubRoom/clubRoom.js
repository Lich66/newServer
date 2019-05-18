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
    static getAllClubRoom(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_room_1.tbl_room.findAll({ where: json });
        });
    }
    static getClubRoom(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_room_1.tbl_room.findOne({ where: json });
        });
    }
}
exports.ClubRoom = ClubRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9jbHViUm9vbS9jbHViUm9vbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0Esb0RBQWlEO0FBRWpELE1BQWEsUUFBUTtJQUNqQiwrQkFBK0I7SUFDeEIsTUFBTSxDQUFPLFdBQVcsQ0FBQyxJQUFzQjs7WUFDbEQsT0FBTyxNQUFNLG1CQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtJQUNELCtCQUErQjtJQUN4QixNQUFNLENBQU8sY0FBYzs7UUFFbEMsQ0FBQztLQUFBO0lBQ0QsV0FBVztJQUNKLE1BQU0sQ0FBTyxjQUFjLENBQUMsS0FBdUIsRUFBRSxLQUF1Qjs7WUFDL0UsSUFBSSxNQUFNLEdBQUcsTUFBTSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLG9CQUFPLEtBQUssQ0FBRSxFQUFFLENBQUMsQ0FBQztZQUNuRSxlQUFlO1lBQ2YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGNBQWMsQ0FBQyxJQUFzQjs7WUFDckQsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFdBQVcsQ0FBQyxJQUFzQjs7WUFDbEQsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0NBQ0o7QUFyQkQsNEJBcUJDIn0=