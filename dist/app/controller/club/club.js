"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
// const Sequelize = require('sequelize');
const sequelize_1 = require("../../db/sequelize");
const nameSpace_1 = require("../../gameConfig/nameSpace");
const tbl_club_1 = require("../../models/tbl_club");
const tbl_room_1 = require("../../models/tbl_room");
const selfUtils_1 = require("../../util/selfUtils");
const base_1 = require("../base/base");
const clubRoomList_1 = require("../redis/clubRoomList/clubRoomList");
const clubRoomState_1 = require("../redis/clubRoomState/clubRoomState");
const redisKeys_1 = require("../redis/redisKeys/redisKeys");
const Op = Sequelize.Op;
const MAXCLUB = 10;
const MAXCOMPETITIONCLUB = 30;
// const CHAIRSTR = 'chair_';
class Club {
    static async createClub(json) {
        let result = await tbl_club_1.tbl_club.findAndCountAll({ where: { uid: json.uid, type: json.type } });
        if ((json.type == 0 && result.count > MAXCLUB) || (json.type == 1 && result.count > MAXCOMPETITIONCLUB)) {
            return null;
        }
        json.name = base_1.Base.getDefaultClubName()[json.type];
        try {
            return await sequelize_1.sequelize.transaction(async (t) => {
                const club = await tbl_club_1.tbl_club.create(json, { transaction: t });
                let arr;
                if (club) {
                    arr = await tbl_room_1.tbl_room.bulkCreate([Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid }), Object.assign({}, json, { clubid: club.clubid, owner: json.uid })], { validate: true, transaction: t });
                }
                if (arr.length == 0) {
                    return null;
                }
                if (arr.length > 0) {
                    arr.forEach(async (element) => {
                        const json = selfUtils_1.SelfUtils.assign(element.toJSON(), {});
                        const chartnumber = json.player_num;
                        let index = 0;
                        do {
                            await clubRoomState_1.ClubRoomState.setClubRoomChairState({ clubid: club.clubid, roomid: json.roomid, chairIndex: index, state: -1 });
                            index++;
                        } while (index < chartnumber);
                    });
                    let redisarr = arr.map((item) => {
                        return `${item.roomid}`;
                    });
                    await clubRoomList_1.ClubRoomList.pushClubRoomList({ clubid: club.clubid, List: redisarr });
                }
                return club;
            });
        }
        catch (error) {
            return null;
        }
    }
    static async deleteClub(json) {
        try {
            const number = await sequelize_1.sequelize.transaction(async (t) => {
                await tbl_room_1.tbl_room.destroy({ where: { clubid: json.clubid, roomid: { [Op.regexp]: '\.' } }, transaction: t });
                return await tbl_club_1.tbl_club.destroy({ where: { clubid: json.clubid }, transaction: t });
            });
            let arr = await clubRoomList_1.ClubRoomList.getClubRoomList({ clubid: json.clubid });
            for (const iterator of arr) {
                console.log(`${nameSpace_1.redisKeyPrefix.clubRoom}${iterator}`);
                await redisKeys_1.RedisKeys.delAsync(`${nameSpace_1.redisKeyPrefix.clubRoom}${iterator}`);
            }
            if (number > 0) {
                await redisKeys_1.RedisKeys.delAsync(`${nameSpace_1.redisKeyPrefix.club}${json.clubid}`);
            }
            return number;
        }
        catch (error) {
            return null;
        }
    }
    static async updateClub(ojson, njson) {
        const clubList = await tbl_club_1.tbl_club.findAll({ where: { clubid: ojson.clubid, uid: ojson.uid } });
        if (clubList.length == 0) {
            return null;
        }
        let res;
        try {
            sequelize_1.sequelize.transaction(async (t) => {
                const clubUpdate = await tbl_club_1.tbl_club.update(njson, { where: { clubid: ojson.clubid, uid: ojson.uid }, transaction: t });
                const roomUpdate = await tbl_room_1.tbl_room.update(njson, { where: { clubid: ojson.clubid, roomid: { [Op.regexp]: '\.' } }, transaction: t });
                res = [clubUpdate.length, roomUpdate.length];
            });
        }
        catch (error) {
            return null;
        }
        if (res[0] == 0 || res[1] == 0) {
            return null;
        }
        let result = await tbl_club_1.tbl_club.update(njson, { where: { clubid: ojson.clubid, uid: ojson.uid } });
        return result[1][0];
    }
    static async getAllClub(json) {
        return await tbl_club_1.tbl_club.findAll({ where: { uid: json.uid, clubid: { [Op.regexp]: '\.' } } });
    }
    static async getClub(json) {
        return await tbl_club_1.tbl_club.findOne({ where: { clubid: json.clubid } });
    }
}
exports.Club = Club;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2NsdWIvY2x1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF1QztBQUN2QywwQ0FBMEM7QUFDMUMsa0RBQStDO0FBQy9DLDBEQUE0RDtBQUc1RCxvREFBaUQ7QUFDakQsb0RBQWlEO0FBQ2pELG9EQUFpRDtBQUNqRCx1Q0FBb0M7QUFDcEMscUVBQWtFO0FBQ2xFLHdFQUFxRTtBQUNyRSw0REFBeUQ7QUFHekQsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztBQUN4QixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbkIsTUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFFOUIsNkJBQTZCO0FBRTdCLE1BQWEsSUFBSTtJQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQWtCO1FBQzdDLElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsRUFBRTtZQUNyRyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSTtZQUNBLE9BQU8sTUFBTSxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNDLE1BQU0sSUFBSSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzdELElBQUksR0FBZSxDQUFDO2dCQUNwQixJQUFJLElBQUksRUFBRTtvQkFDTixHQUFHLEdBQUcsTUFBTSxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxtQkFDekIsSUFBSSxJQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsdUJBRVosSUFBSSxJQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsdUJBRVosSUFBSSxJQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsdUJBRVosSUFBSSxJQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsdUJBRVosSUFBSSxJQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsdUJBRVosSUFBSSxJQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsdUJBRVosSUFBSSxJQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsdUJBRVosSUFBSSxJQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsdUJBRVosSUFBSSxJQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsdUJBRVosSUFBSSxJQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixLQUFLLEVBQUUsSUFB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