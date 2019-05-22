import { ITbl_user } from '../../interface/models/tbl_user';
import { IUserRequest } from '../../interface/user/userInterface';
import { tbl_user } from '../../models/tbl_user';
export class User {
    // 实际上没这个方法 创建用户永远是和account里面一起创建的
    public static async addUser(json: IUserRequest): Promise<ITbl_user> {
        return await tbl_user.create(json);
    }
    public static async deleteUser() {

    }
    public static async updateUser(ojson: IUserRequest, njson: IUserRequest): Promise<number> {
        // {uid:x},{diamond:9}
        let result = await tbl_user.update(njson, { where: { userid: ojson.userid } });
        return result[0];
        // let result = await tbl_club.update(njson, { where: { ...ojson } });
    }
    public static async getUser(json: IUserRequest): Promise<ITbl_user> {
        return await tbl_user.findOne({ where: { userid: json.userid } });
    }
}
