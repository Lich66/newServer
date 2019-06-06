import * as Sequelize from 'sequelize';
// const Sequelize = require('sequelize');
import { sequelize } from '../../db/sequelize';
import { redisKeyPrefix } from '../../gameConfig/nameSpace';
import { IClubRequest } from '../../interface/club/clubInterface';
import { IRoom } from '../../interface/models/tbl_room';
import { tbl_club } from '../../models/tbl_club';
import { tbl_room } from '../../models/tbl_room';
import { SelfUtils } from '../../util/selfUtils';
import { Base } from '../base/base';
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
        const namearr = await Base.getDefaultClubName();

        json.name = namearr[json.type];

        try {
            return await sequelize.transaction(async (t) => {
                const club = await tbl_club.create(json, { transaction: t });
                let arr: tbl_room[];
                if (club) {
                    arr = await tbl_room.bulkCreate([{
                        ...json,
                        clubid: club.clubid
                    }, {
                        ...json,
                        clubid: club.clubid

                    }, {
                        ...json,
                        clubid: club.clubid

                    }, {
                        ...json,
                        clubid: club.clubid

                    }, {
                        ...json,
                        clubid: club.clubid

                    }, {
                        ...json,
                        clubid: club.clubid

                    }, {
                        ...json,
                        clubid: club.clubid

                    }, {
                        ...json,
                        clubid: club.clubid

                    }, {
                        ...json,
                        clubid: club.clubid

                    }, {
                        ...json,
                        clubid: club.clubid

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
                            await ClubRoomState.setClubRoomChairState({ clubid: club.clubid, roomid: json.roomid, chairIndex: index, state: -1 });
                            index++;
                        } while (index < chartnumber);

                    });
                    let redisarr: string[] = arr.map((item) => {
                        return `${item.roomid}`;
                    });
                    await ClubRoomList.pushClubRoomList({ clubid: club.clubid, List: redisarr });
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
            let arr = await ClubRoomList.getClubRoomList({ clubid: json.clubid });
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
    public static async updateClub(ojson: IClubRequest, njson: IClubRequest): Promise<tbl_club | number> {
        const clubid = ojson.clubid;
        const uid = ojson.uid;
        const clubnumber = await tbl_club.count({ where: { clubid, uid } });
        const noClubCode = 140300;
        if (clubnumber == 0) {
            return noClubCode;
        }

        const roomIdList = await ClubRoomList.getClubRoomList({ clubid });
        for (const iterator of roomIdList) {
            const json: any = {};
            json.roomid = iterator;
            json.userlist = {};
            // const state = await redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${iterator}`);
            const state = await ClubRoomState.getClubRoomAllUsersState({ clubid, roomid: Number.parseInt(iterator, 0) });
            for (const key in state) {
                if (state.hasOwnProperty(key)) {
                    const hasUser = 140301;
                    return hasUser;
                }
            }
        }


        let res: [number, number];
        try {
            sequelize.transaction(async (t) => {
                const clubUpdate = await tbl_club.update(njson, { where: { clubid: ojson.clubid, uid: ojson.uid }, transaction: t });
                const roomUpdate = await tbl_room.update(njson, { where: { clubid: ojson.clubid, roomid: { [Op.regexp]: '\.' } }, transaction: t });
                res = [clubUpdate.length, roomUpdate.length];
            });
        } catch (error) {
            return null;
        }
        if (res[0] == 0 || res[1] == 0) {
            return null;
        }
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
