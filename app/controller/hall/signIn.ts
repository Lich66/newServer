import { ITbl_signIn } from '../../interface/models/tbl_signIn';
import { tbl_signIn } from '../../models/tbl_signIn';

export class SignIn {
    /**
     * 更新签到表
     * @param ojson 条件
     * @param njson 更新内容
     */
    public static async updateSignInInfo(ojson: { userId: number }, njson: { date?: number; form?: string }): Promise<number> {
        // {uid:x},{diamond:9}
        let result = await tbl_signIn.update(njson, { where: { userid: ojson.userId } });
        return result[0];
    }
    /**
     * 查找或新建签到表
     * @param json 条件
     */
    public static async getSignInInfo(json: { userId: number }): Promise<[ITbl_signIn, boolean]> {
        let result = await tbl_signIn.findOrCreate({ where: { userid: json.userId } });
        return result;
    }
}
