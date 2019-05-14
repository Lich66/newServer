import { tbl_club } from "../../models/tbl_club";
import { IClubRequest } from "../../interface/club/handler/clubInterface";
import { ITbl_club } from "../../interface/models/tbl_club";
import { defaultClubName } from "../../gameConfig/defaultClubName";

export class Club {
    // 实际上没这个方法 创建用户永远是和account里面一起创建的
    public static async createClub(json: IClubRequest): Promise<tbl_club> {
        let result = await tbl_club.findAndCountAll({ where: { uid: json.uid, type: json.type } })
        if ((json.type == 0 && result.count > 10) || (json.type == 1 && result.count > 30)) {
            return null;
        }

        json.name = defaultClubName[json.type];
        return await tbl_club.create(json);
    }
    public static async deleteClub(json: IClubRequest): Promise<number> {
        return await tbl_club.destroy({ where: { ...json } });
    }
    public static async updateClub(njson: IClubRequest, ojson: IClubRequest): Promise<tbl_club> {
        let result = await tbl_club.update(njson, { where: { ...ojson } });
        // let club = ;
        return result[1][0]
    }
    public static async getClub(json: IClubRequest): Promise<tbl_club[]> {
        return await tbl_club.findAll({ where: json })
    }
}