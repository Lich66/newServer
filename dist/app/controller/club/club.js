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
// const Sequelize = require('sequelize');
const sequelize_1 = require("../../db/sequelize");
const defaultClubName_1 = require("../../gameConfig/defaultClubName");
const redisKeyPrefix_1 = require("../../gameConfig/redisKeyPrefix");
const tbl_club_1 = require("../../models/tbl_club");
const tbl_room_1 = require("../../models/tbl_room");
const selfUtils_1 = require("../../util/selfUtils");
const clubRoomList_1 = require("../redis/clubRoomList/clubRoomList");
const clubRoomState_1 = require("../redis/clubRoomState/clubRoomState");
const redisKeys_1 = require("../redis/redisKeys/redisKeys");
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
                return yield sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    const club = yield tbl_club_1.tbl_club.create(json, { transaction: t });
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
                    if (arr.length > 0) {
                        arr.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const json = selfUtils_1.SelfUtils.assign(element.toJSON(), {});
                            // 这里假设是4
                            const chartnumber = 4;
                            let index = 0;
                            do {
                                yield clubRoomState_1.ClubRoomState.setClubRoomState({ redisRoomId: `${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${json.roomid}`, chairIndex: index, state: 0 });
                                index++;
                            } while (index < chartnumber);
                        }));
                        let redisarr = arr.map((item) => {
                            return `${item.roomid}`;
                        });
                        yield clubRoomList_1.ClubRoomList.setClubRoomList({ redisClubId: `${redisKeyPrefix_1.redisKeyPrefix.club}${club.clubid}`, List: redisarr });
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
                const number = yield sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    yield tbl_room_1.tbl_room.destroy({ where: { clubid: json.clubid, roomid: { [Op.regexp]: '\.' } }, transaction: t });
                    return yield tbl_club_1.tbl_club.destroy({ where: { clubid: json.clubid }, transaction: t });
                }));
                let arr = yield clubRoomList_1.ClubRoomList.getClubRoomList({ redisClubId: `${redisKeyPrefix_1.redisKeyPrefix.club}${json.clubid}` });
                for (const iterator of arr) {
                    console.log(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${iterator}`);
                    yield redisKeys_1.RedisKeys.delAsync(`${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${iterator}`);
                }
                if (number > 0) {
                    yield redisKeys_1.RedisKeys.delAsync(`${redisKeyPrefix_1.redisKeyPrefix.club}${json.clubid}`);
                }
                return number;
            }
            catch (error) {
                return null;
            }
        });
    }
    static updateClub(ojson, njson) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield tbl_club_1.tbl_club.update(njson, { where: { clubid: ojson.clubid, uid: ojson.uid } });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2NsdWIvY2x1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQXVDO0FBQ3ZDLDBDQUEwQztBQUMxQyxrREFBK0M7QUFDL0Msc0VBQW1FO0FBQ25FLG9FQUFpRTtBQUdqRSxvREFBaUQ7QUFDakQsb0RBQWlEO0FBQ2pELG9EQUFpRDtBQUNqRCxxRUFBa0U7QUFDbEUsd0VBQXFFO0FBQ3JFLDREQUF5RDtBQUV6RCxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNuQixNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUM5QixNQUFhLElBQUk7SUFDTixNQUFNLENBQU8sVUFBVSxDQUFDLElBQWtCLEVBQUUsUUFBZ0I7O1lBQy9ELElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsRUFBRTtnQkFDckcsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsaUNBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsSUFBSTtnQkFDQSxPQUFPLE1BQU0scUJBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBTyxDQUFDLEVBQUUsRUFBRTtvQkFDM0MsTUFB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