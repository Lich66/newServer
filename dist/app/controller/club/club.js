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
const tbl_club_1 = require("../../models/tbl_club");
const defaultClubName_1 = require("../../gameConfig/defaultClubName");
class Club {
    // 实际上没这个方法 创建用户永远是和account里面一起创建的
    static createClub(json) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield tbl_club_1.tbl_club.findAndCountAll({ where: { uid: json.uid, type: json.type } });
            if ((json.type == 0 && result.count > 10) || (json.type == 1 && result.count > 30)) {
                return null;
            }
            json.name = defaultClubName_1.defaultClubName[json.type];
            return yield tbl_club_1.tbl_club.create(json);
        });
    }
    static deleteClub(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_club_1.tbl_club.destroy({ where: Object.assign({}, json) });
        });
    }
    static updateClub(njson, ojson) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_club_1.tbl_club.update(njson, { where: Object.assign({}, ojson) });
        });
    }
    static getClub(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_club_1.tbl_club.findAll({ where: json });
        });
    }
}
exports.Club = Club;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2NsdWIvY2x1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0RBQWlEO0FBR2pELHNFQUFtRTtBQUVuRTtJQUNJLGtDQUFrQztJQUMzQixNQUFNLENBQU8sVUFBVSxDQUFDLElBQWtCOztZQUM3QyxJQUFJLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDMUYsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFO2dCQUNoRixPQUFPLElBQUksQ0FBQzthQUNmO1lBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxpQ0FBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxPQUFPLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFVBQVUsQ0FBQyxJQUFrQjs7WUFDN0MsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxvQkFBTyxJQUFJLENBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUQsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFVBQVUsQ0FBQyxLQUFtQixFQUFFLEtBQW1COztZQUNuRSxPQUFPLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxvQkFBTyxLQUFLLENBQUUsRUFBRSxDQUFDLENBQUE7UUFDaEUsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLE9BQU8sQ0FBQyxJQUFrQjs7WUFDMUMsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDbEQsQ0FBQztLQUFBO0NBQ0o7QUFwQkQsb0JBb0JDIn0=