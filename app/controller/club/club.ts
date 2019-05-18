import * as Sequelize from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { defaultClubName } from '../../gameConfig/defaultClubName';
import { IClubRequest } from '../../interface/club/handler/clubInterface';
import { tbl_club } from '../../models/tbl_club';
import { tbl_room } from '../../models/tbl_room';
const Op = Sequelize.Op;
const MAXCLUB = 10;
const MAXCOMPETITIONCLUB = 30;
export class Club {
    public static async createClub(json: IClubRequest, usernick: string): Promise<tbl_club> {
        let result = await tbl_club.findAndCountAll({ where: { uid: json.uid, type: json.type } });
        if ((json.type == 0 && result.count > MAXCLUB) || (json.type == 1 && result.count > MAXCOMPETITIONCLUB)) {
            return null;
        }
        json.name = defaultClubName[json.type];
        try {
            return sequelize.transaction(async (t) => {
                let club = await tbl_club.create(json, { transaction: t });

                let arr: tbl_room[];
                if (club) {
                    arr = await tbl_room.bulkCreate([{
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
            });
        } catch (error) {
            return null;
        }
    }
    public static async deleteClub(json: IClubRequest): Promise<number> {
        try {
            return sequelize.transaction(async (t) => {
                await tbl_room.destroy({ where: { clubid: json.clubid }, transaction: t });
                return await tbl_club.destroy({ where: { clubid: json.clubid }, transaction: t });
            });
        } catch (error) {
            return null;
        }
    }
    public static async updateClub(ojson: IClubRequest, njson: IClubRequest): Promise<tbl_club> {
        let result = await tbl_club.update(njson, { where: ojson });
        // let club = ;
        return result[1][0];
    }
    public static async getAllClub(json: IClubRequest): Promise<tbl_club[]> {
        return await tbl_club.findAll({ where: { uid: json.uid, clubid: { [Op.regexp]: '\.' } } });
    }

    public static async getClub(json: IClubRequest): Promise<tbl_club> {
        return await tbl_club.findOne({ where: { clubid: json.clubid } });
    }
}
