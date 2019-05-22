import * as Sequelize from 'sequelize';
// const Sequelize = require('sequelize');
import { sequelize } from '../../db/sequelize';
import { defaultClubName } from '../../gameConfig/defaultClubName';
import { redisKeyPrefix } from '../../gameConfig/nameSpace';
import { IClubRequest } from '../../interface/club/clubInterface';
import { IRoom } from '../../interface/models/tbl_room';
import { tbl_club } from '../../models/tbl_club';
import { tbl_room } from '../../models/tbl_room';
import { SelfUtils } from '../../util/selfUtils';
import { ClubRoomList } from '../redis/clubRoomList/clubRoomList';
import { ClubRoomState } from '../redis/clubRoomState/clubRoomState';
import { RedisKeys } from '../redis/redisKeys/redisKeys';

const Op = Sequelize.Op;
const MAXCLUB = 10;
const MAXCOMPETITIONCLUB = 30;

// const CHAIRSTR = 'chair_';

export class Club {
    public static async createClub(json: IClubRequest): Promise<tbl_club> {
        let result = await tbl_club.findAndCountAll({ where: { uid: json.uid, type: json.type } });
        if ((json.type == 0 && result.count > MAXCLUB) || (json.type == 1 && result.count > MAXCOMPETITIONCLUB)) {
            return null;
        }
        json.name = defaultClubName[json.type];
        try {
            return await sequelize.transaction(async (t) => {
                const club = await tbl_club.create(json, { transaction: t });
                let arr: tbl_room[];
                if (club) {
                    arr = await tbl_room.bulkCreate([{
                        ...json,
                        clubid: club.clubid,
                        owner: json.uid
                    }, {
                        ...json,
                        clubid: club.clubid,
                        owner: json.uid
                    }, {
                        ...json,
                        clubid: club.clubid,
                        owner: json.uid
                    }, {
                        ...json,
                        clubid: club.clubid,
                        owner: json.uid
                    }, {
                        ...json,
                        clubid: club.clubid,
                        owner: json.uid
                    }, {
                        ...json,
                        clubid: club.clubid,
                        owner: json.uid
                    }, {
                        ...json,
                        clubid: club.clubid,
                        owner: json.uid
                    }, {
                        ...json,
                        clubid: club.clubid,
                        owner: json.uid
                    }, {
                        ...json,
                        clubid: club.clubid,
                        owner: json.uid
                    }, {
                        ...json,
                        clubid: club.clubid,
                        owner: json.uid
                    }], { validate: true, transaction: t });
                }
                if (arr.length == 0) {
                    return null;
                }
                if (arr.length > 0) {
                    arr.forEach(async (element) => {
                        const json = SelfUtils.assign<IRoom>(element.toJSON(), {});
                        const chartnumber = json.player_num;
                        let index = 0;
                        do {
                            await ClubRoomState.setClubRoomState({ redisRoomId: `${redisKeyPrefix.clubRoom}${json.roomid}`, chairIndex: `${redisKeyPrefix.chair}${index}`, state: '-1' });
                            index++;
                        } while (index < chartnumber);

                    });
                    let redisarr: string[] = arr.map((item) => {
                        return `${item.roomid}`;
                    });
                    await ClubRoomList.setClubRoomList({ redisClubId: `${redisKeyPrefix.club}${club.clubid}`, List: redisarr });
                }
                return club;
            });
        } catch (error) {
            return null;
        }
    }
    public static async deleteClub(json: IClubRequest): Promise<number> {
        try {
            const number = await sequelize.transaction(async (t) => {
                await tbl_room.destroy({ where: { clubid: json.clubid, roomid: { [Op.regexp]: '\.' } }, transaction: t });
                return await tbl_club.destroy({ where: { clubid: json.clubid }, transaction: t });
            });
            let arr = await ClubRoomList.getClubRoomList({ redisClubId: `${redisKeyPrefix.club}${json.clubid}` });
            for (const iterator of arr) {
                console.log(`${redisKeyPrefix.clubRoom}${iterator}`);
                await RedisKeys.delAsync(`${redisKeyPrefix.clubRoom}${iterator}`);
            }
            if (number > 0) {
                await RedisKeys.delAsync(`${redisKeyPrefix.club}${json.clubid}`);
            }
            return number;
        } catch (error) {
            return null;
        }
    }
    public static async updateClub(ojson: IClubRequest, njson: IClubRequest): Promise<tbl_club> {
        let result = await tbl_club.update(njson, { where: { clubid: ojson.clubid, uid: ojson.uid } });
        return result[1][0];
    }
    public static async getAllClub(json: IClubRequest): Promise<tbl_club[]> {
        return await tbl_club.findAll({ where: { uid: json.uid, clubid: { [Op.regexp]: '\.' } } });
    }

    public static async getClub(json: IClubRequest): Promise<tbl_club> {
        return await tbl_club.findOne({ where: { clubid: json.clubid } });
    }

}
