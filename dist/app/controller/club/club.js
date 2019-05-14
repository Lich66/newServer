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
                    let club = yield tbl_club_1.tbl_club.create(json);
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
                            },], { validate: true });
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
            return yield tbl_club_1.tbl_club.destroy({ where: Object.assign({}, json) });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2NsdWIvY2x1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0RBQWlEO0FBRWpELHNFQUFtRTtBQUNuRSxvREFBaUQ7QUFDakQsa0RBQStDO0FBRS9DO0lBQ1csTUFBTSxDQUFPLFVBQVUsQ0FBQyxJQUFrQixFQUFDLFFBQWU7O1lBQzdELElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMxRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUU7Z0JBQ2hGLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLGlDQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLElBQUk7Z0JBQ0EsT0FBTyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFPLENBQUMsRUFBQyxFQUFFO29CQUNwQyxJQUFJLElBQUksR0FBSSxNQUFNLG1CQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QyxJQUFJLEdBQWUsQ0FBQTtvQkFDbkIsSUFBRyxJQUFJLEVBQUM7d0JBQ0osR0FBRyxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDN0IsTUFBTSxFQUFDLElBQUksQ0FBQyxNQUFNO2dDQUNsQixLQUFLLEVBQUMsUUFBUTs2QkFDakIsRUFBQztnQ0FDRSxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU07Z0NBQ2xCLEtBQUssRUFBQyxRQUFROzZCQUNqQixFQUFDO2dDQUNFLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTTtnQ0FDbEIsS0FBSyxFQUFDLFFBQVE7NkJBQ2pCLEVBQUM7Z0NBQ0UsTUFBTSxFQUFDLElBQUksQ0FBQyxNQUFNO2dDQUNsQixLQUFLLEVBQUMsUUFBUTs2QkFDakIsRUFBQztnQ0FDRSxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU07Z0NBQ2xCLEtBQUssRUFBQyxRQUFROzZCQUNqQixFQUFDO2dDQUNFLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTTtnQ0FDbEIsS0FBSyxFQUFDLFFBQVE7NkJBQ2pCLEVBQUM7Z0NBQ0UsTUFBTSxFQUFDLElBQUksQ0FBQyxNQUFNO2dDQUNsQixLQUFLLEVBQUMsUUFBUTs2QkFDakIsRUFBQztnQ0FDRSxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU07Z0NBQ2xCLEtBQUssRUFBQyxRQUFROzZCQUNqQixFQUFDO2dDQUNFLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTTtnQ0FDbEIsS0FBSyxFQUFDLFFBQVE7NkJBQ2pCLEVBQUM7Z0NBQ0UsTUFBTSxFQUFDLElBQUksQ0FBQyxNQUFNO2dDQUNsQixLQUFLLEVBQUMsUUFBUTs2QkFDakIsRUFBRSxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUE7cUJBQ3ZCO29CQUNELElBQUcsR0FBRyxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUM7d0JBQ2IsT0FBTyxJQUFJLENBQUM7cUJBQ2Y7b0JBQ0QsT0FBTyxJQUFJLENBQUE7Z0JBQ2YsQ0FBQyxDQUFBLENBQUMsQ0FBQTthQUNMO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ1osT0FBTyxJQUFJLENBQUE7YUFDZDtRQUNMLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxVQUFVLENBQUMsSUFBa0I7O1lBQzdDLE9BQU8sTUFBTSxtQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssb0JBQU8sSUFBSSxDQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxVQUFVLENBQUMsS0FBbUIsRUFBRSxLQUFtQjs7WUFDbkUsSUFBSSxNQUFNLEdBQUcsTUFBTSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLG9CQUFPLEtBQUssQ0FBRSxFQUFFLENBQUMsQ0FBQztZQUNuRSxlQUFlO1lBQ2YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdkIsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLE9BQU8sQ0FBQyxJQUFrQjs7WUFDMUMsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDbEQsQ0FBQztLQUFBO0NBQ0o7QUFoRUQsb0JBZ0VDIn0=