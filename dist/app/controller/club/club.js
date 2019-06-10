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
        const namearr = await base_1.Base.getDefaultClubName();
        json.name = namearr[json.type];
        try {
            return await sequelize_1.sequelize.transaction(async (t) => {
                const club = await tbl_club_1.tbl_club.create(json, { transaction: t });
                let arr;
                if (club) {
                    arr = await tbl_room_1.tbl_room.bulkCreate([Object.assign({}, json, { clubid: club.clubid }), Object.assign({}, json, { clubid: club.clubid }), Object.assign({}, json, { clubid: club.clubid }), Object.assign({}, json, { clubid: club.clubid }), Object.assign({}, json, { clubid: club.clubid }), Object.assign({}, json, { clubid: club.clubid }), Object.assign({}, json, { clubid: club.clubid }), Object.assign({}, json, { clubid: club.clubid }), Object.assign({}, json, { clubid: club.clubid }), Object.assign({}, json, { clubid: club.clubid })], { validate: true, transaction: t });
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
        const clubid = ojson.clubid;
        const uid = ojson.uid;
        const clubnumber = await tbl_club_1.tbl_club.count({ where: { clubid, uid } });
        const noClubCode = 140300;
        if (clubnumber == 0) {
            return noClubCode;
        }
        const roomIdList = await clubRoomList_1.ClubRoomList.getClubRoomList({ clubid });
        for (const iterator of roomIdList) {
            const json = {};
            json.roomid = iterator;
            json.userlist = {};
            // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${iterator}`);
            const state = await clubRoomState_1.ClubRoomState.getClubRoomAllUsersState({ clubid, roomid: Number.parseInt(iterator, 0) });
            for (const key in state) {
                if (state.hasOwnProperty(key)) {
                    const hasUser = 140301;
                    return hasUser;
                }
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2NsdWIvY2x1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF1QztBQUN2QywwQ0FBMEM7QUFDMUMsa0RBQStDO0FBQy9DLDBEQUE0RDtBQUc1RCxvREFBaUQ7QUFDakQsb0RBQWlEO0FBQ2pELG9EQUFpRDtBQUNqRCx1Q0FBb0M7QUFDcEMscUVBQWtFO0FBQ2xFLHdFQUFxRTtBQUNyRSw0REFBeUQ7QUFHekQsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztBQUN4QixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbkIsTUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFFOUIsNkJBQTZCO0FBRTdCLE1BQWEsSUFBSTtJQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQWtCO1FBQzdDLElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsRUFBRTtZQUNyRyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxXQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsSUFBSTtZQUNBLE9BQU8sTUFB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