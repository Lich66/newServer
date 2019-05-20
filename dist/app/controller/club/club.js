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
// const CHAIRSTR = 'chair_';
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
                                yield clubRoomState_1.ClubRoomState.setClubRoomState({ redisRoomId: `${redisKeyPrefix_1.redisKeyPrefix.clubRoom}${json.roomid}`, chairIndex: `${redisKeyPrefix_1.redisKeyPrefix.chair}${index}`, state: '-1' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2NsdWIvY2x1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQXVDO0FBQ3ZDLDBDQUEwQztBQUMxQyxrREFBK0M7QUFDL0Msc0VBQW1FO0FBQ25FLG9FQUFpRTtBQUdqRSxvREFBaUQ7QUFDakQsb0RBQWlEO0FBQ2pELG9EQUFpRDtBQUNqRCxxRUFBa0U7QUFDbEUsd0VBQXFFO0FBQ3JFLDREQUF5RDtBQUV6RCxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNuQixNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUU5Qiw2QkFBNkI7QUFFN0IsTUFBYSxJQUFJO0lBQ04sTUFBTSxDQUFPLFVBQVUsQ0FBQyxJQUFrQixFQUFFLFFBQWdCOztZQUMvRCxJQUFJLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3JHLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLGlDQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLElBQUk7Z0JBQ0EsT0FBTyxNQUFNLHFCQUFTLENBQUMsV0FBVyxDQUFDLENBQU8sQ0FBQyxFQUFFLEVB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