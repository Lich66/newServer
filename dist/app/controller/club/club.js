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
const tbl_room_1 = require("../../models/tbl_room");
const sequelize_1 = require("../../db/sequelize");
class Club {
    static createClub(json, usernick) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield tbl_club_1.tbl_club.findAndCountAll({ where: { uid: json.uid, type: json.type } });
            if ((json.type == 0 && result.count > 10) || (json.type == 1 && result.count > 30)) {
                return null;
            }
            json.name = defaultClubName_1.defaultClubName[json.type];
            try {
                return sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    let club = yield tbl_club_1.tbl_club.create(json, { transaction: t });
                    let arr;
                    if (club) {
                        arr = yield tbl_room_1.tbl_room.bulkCreate([{
                                clubid: club.clubid,
                                owner: usernick
                            }, {
                                clubid: club.clubid,
                                owner: usernick
                            }, {
                                clubid: club.clubid,
                                owner: usernick
                            }, {
                                clubid: club.clubid,
                                owner: usernick
                            }, {
                                clubid: club.clubid,
                                owner: usernick
                            }, {
                                clubid: club.clubid,
                                owner: usernick
                            }, {
                                clubid: club.clubid,
                                owner: usernick
                            }, {
                                clubid: club.clubid,
                                owner: usernick
                            }, {
                                clubid: club.clubid,
                                owner: usernick
                            }, {
                                clubid: club.clubid,
                                owner: usernick
                            },], { validate: true, transaction: t });
                    }
                    if (arr.length == 0) {
                        return null;
                    }
                    return club;
                }));
            }
            catch (error) {
                return null;
            }
        });
    }
    static deleteClub(json) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    yield tbl_room_1.tbl_room.destroy({ where: { clubid: json.clubid }, transaction: t });
                    return yield tbl_club_1.tbl_club.destroy({ where: { clubid: json.clubid }, transaction: t });
                }));
            }
            catch (error) {
                return null;
            }
        });
    }
    static updateClub(ojson, njson) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield tbl_club_1.tbl_club.update(njson, { where: Object.assign({}, ojson) });
            // let club = ;
            return result[1][0];
        });
    }
    static getClub(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_club_1.tbl_club.findAll({ where: json });
        });
    }
}
exports.Club = Club;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2NsdWIvY2x1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0RBQWlEO0FBRWpELHNFQUFtRTtBQUNuRSxvREFBaUQ7QUFDakQsa0RBQStDO0FBRS9DO0lBQ1csTUFBTSxDQUFPLFVBQVUsQ0FBQyxJQUFrQixFQUFFLFFBQWdCOztZQUMvRCxJQUFJLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDMUYsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFO2dCQUNoRixPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxpQ0FBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxJQUFJO2dCQUNBLE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBTyxDQUFDLEVBQUUsRUFBRTtvQkFDckMsSUFBSSxJQUFJLEdBQUcsTUFBTSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFFM0QsSUFBSSxHQUFlLENBQUE7b0JBQ25CLElBQUksSUFBSSxFQUFFO3dCQUNOLEdBQUcsR0FBRyxNQUFNLG1CQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0NBQzdCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQ0FDbkIs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