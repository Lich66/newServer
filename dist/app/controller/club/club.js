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
    static createClub(json) {
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
                        arr = yield tbl_room_1.tbl_room.bulkCreate([Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid })], { validate: true, transaction: t });
                    }
                    if (arr.length == 0) {
                        return null;
                    }
                    if (arr.length > 0) {
                        arr.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const json = selfUtils_1.SelfUtils.assign(element.toJSON(), {});
                            const chartnumber = json.player_num;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2NsdWIvY2x1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQXVDO0FBQ3ZDLDBDQUEwQztBQUMxQyxrREFBK0M7QUFDL0Msc0VBQW1FO0FBQ25FLG9FQUFpRTtBQUdqRSxvREFBaUQ7QUFDakQsb0RBQWlEO0FBQ2pELG9EQUFpRDtBQUNqRCxxRUFBa0U7QUFDbEUsd0VBQXFFO0FBQ3JFLDREQUF5RDtBQUV6RCxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNuQixNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUU5Qiw2QkFBNkI7QUFFN0IsTUFBYSxJQUFJO0lBQ04sTUFBTSxDQUFPLFVBQVUsQ0FBQyxJQUFrQjs7WUFDN0MsSUFBSSxNQUFNLEdBQUcsTUFBTSxtQkFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUNyRyxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxpQ0FBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxJQUFJO2dCQUNBLE9BQU8sTUFBTSxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFPLENBQUMsRUFBRSxFQUFFO29CQUMzQyxN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