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
const Sequelize = require("sequelize");
const sequelize_1 = require("../../db/sequelize");
const defaultClubName_1 = require("../../gameConfig/defaultClubName");
const tbl_club_1 = require("../../models/tbl_club");
const tbl_room_1 = require("../../models/tbl_room");
const Op = Sequelize.Op;
const MAXCLUB = 10;
const MAXCOMPETITIONCLUB = 30;
class Club {
    static createClub(json, usernick) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield tbl_club_1.tbl_club.findAndCountAll({ where: { uid: json.uid, type: json.type } });
            if ((json.type == 0 && result.count > MAXCLUB) || (json.type == 1 && result.count > MAXCOMPETITIONCLUB)) {
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
                            }], { validate: true, transaction: t });
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
            let result = yield tbl_club_1.tbl_club.update(njson, { where: ojson });
            // let club = ;
            return result[1][0];
        });
    }
    static getAllClub(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_club_1.tbl_club.findAll({ where: { uid: json.uid, clubid: { [Op.regexp]: '\.' } } });
        });
    }
    static getClub(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_club_1.tbl_club.findOne({ where: { clubid: json.clubid } });
        });
    }
}
exports.Club = Club;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2NsdWIvY2x1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQXVDO0FBQ3ZDLGtEQUErQztBQUMvQyxzRUFBbUU7QUFFbkUsb0RBQWlEO0FBQ2pELG9EQUFpRDtBQUNqRCxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNuQixNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUM5QixNQUFhLElBQUk7SUFDTixNQUFNLENBQU8sVUFBVSxDQUFDLElBQWtCLEVBQUUsUUFBZ0I7O1lBQy9ELElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsRUFBRTtnQkFDckcsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsaUNBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsSUFBSTtnQkFDQSxPQUFPLHFCQUFTLENBQUMsV0FBVyxDQUFDLENBQU8sQ0FBQyxFQUFFLEVBQUU7b0JBQ3JDLElBQUksSUFBSSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRTNELElBQUksR0FBZSxDQUFDO29CQUNwQixJQUFJLElBQUksRUFBRTt3QkFDTixHQUFHLEdBQUcsTUFBTSxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dDQUM3QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0NBQ25CLEtBQUssRUFBRSxRQUFROzZCQUNsQixFQUFFO2dDQUNDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQ0FDbkIsS0FBSyxFQUFFLFFBQVE7NkJBQ2xCLEVBQUU7Z0NBQ0MsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dDQUNuQixLQUFLLEVBQUUsUUFBUTs2QkFDbEIsRUFBRTtnQ0FDQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0NBQ25CLEtBQUssRUFBRSxRQUFROzZCQUNsQixFQUFFO2dDQUNDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQ0FDbkIsS0FBSyxFQUFFLFFBQVE7NkJBQ2xCLEVBQUU7Z0NBQ0MsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dDQUNuQixLQUFLLEVBQUUsUUFBUTs2QkFDbEIsRUFBRTtnQ0FDQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0NBQ25CLEtBQUssRUFBRSxRQUFROzZCQUNsQixFQUFFO2dDQUNDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQ0FDbkIsS0FBSyxFQUFFLFFBQVE7NkJBQ2xCLEVBQUU7Z0NBQ0MsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dDQUNuQixLQUFLLEVBQUUsUUFBUTs2QkFDbEIsRUFBRTtnQ0FDQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0NBQ25CLEtBQUssRUFBRSxRQUFROzZCQUNsQixDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUMzQztvQkFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO3dCQUNqQixPQUFPLElBQUksQ0FBQztxQkFDZjtvQkFDRCxPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQzthQUNOO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ1osT0FBTyxJQUFJLENBQUM7YUFDZjtRQUNMLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxVQUFVLENBQUMsSUFBa0I7O1lBQzdDLElBQUk7Z0JBQ0EsT0FBTyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFPLENBQUMsRUFBRSxFQUFFO29CQUNyQyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDM0UsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEYsQ0FBQyxDQUFBLENBQUMsQ0FBQzthQUNOO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ1osT0FBTyxJQUFJLENBQUM7YUFDZjtRQUNMLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxVQUFVLENBQUMsS0FBbUIsRUFBRSxLQUFtQjs7WUFDbkUsSUFBSSxNQUFNLEdBQUcsTUFBTSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM1RCxlQUFlO1lBQ2YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFVBQVUsQ0FBQyxJQUFrQjs7WUFDN0MsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0YsQ0FBQztLQUFBO0lBRU0sTUFBTSxDQUFPLE9BQU8sQ0FBQyxJQUFrQjs7WUFDMUMsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEUsQ0FBQztLQUFBO0NBQ0o7QUE1RUQsb0JBNEVDIn0=