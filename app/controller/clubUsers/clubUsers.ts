import * as Sequelize from 'sequelize';
// const Sequelize = require('sequelize');
import { IClubUserRequest } from '../../interface/clubUsers/clubUsersInterface';
import { tbl_clubuser } from '../../models/tbl_clubuser';
import { tbl_user } from '../../models/tbl_user';


const Op = Sequelize.Op;
const MAXClubUser = 10;
const MAXCOMPETITIONClubUser = 30;

// const CHAIRSTR = 'chair_';

export class ClubUser {
    public static async findClubUser(json: IClubUserRequest): Promise<tbl_clubuser> {
        let result = await tbl_clubuser.findOrCreate({ where: { clubid: json.clubid, userid: json.userid, cid: { [Op.regexp]: '\.' } } });
        return result[0];
    }
    public static async deleteClubUser(json: IClubUserRequest): Promise<number> {
        return await tbl_clubuser.destroy({ where: { clubid: json.clubid, userid: json.userid, cid: { [Op.regexp]: '\.' } } });
    }
    public static async updateClubUser(ojson: IClubUserRequest, njson: IClubUserRequest): Promise<tbl_clubuser> {
        let result = await tbl_clubuser.update(njson, { where: { clubid: ojson.clubid, userid: ojson.userid, cid: { [Op.regexp]: '\.' } } });
        return result[1][0];
    }
    /**
     * 
     * 获取某用户加入的所有茶楼
     */
    public static async getAllClubUserbyUid(json: IClubUserRequest): Promise<tbl_clubuser[]> {
        return await tbl_clubuser.findAll({ where: { userid: json.userid, cid: { [Op.regexp]: '\.' } } });
    }
    /**
     * 
     * 获取某茶楼加入的所有用户
     */
    public static async getAllClubUserbyClubid(json: IClubUserRequest): Promise<tbl_clubuser[]> {
        return await tbl_clubuser.findAll({ where: { clubid: json.clubid, cid: { [Op.regexp]: '\.' } }, include: [tbl_user] });
    }

    // public static async getClubUser(json: IClubUserRequest): Promise<tbl_ClubUser> {
    //     return await tbl_ClubUser.findOne({ where: { ClubUserid: json.ClubUserid } });
    // }

}
