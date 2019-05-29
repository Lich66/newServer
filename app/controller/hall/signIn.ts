import { Transaction } from 'sequelize/types';
import { redisClient } from '../../db/redis';
import { sequelize } from '../../db/sequelize';
import { redisKeyPrefix } from '../../gameConfig/nameSpace';
import { userConfig } from '../../gameConfig/userConfig';
import { ITbl_signIn } from '../../interface/models/tbl_signIn';
import { tbl_signIn } from '../../models/tbl_signIn';
import { tbl_user } from '../../models/tbl_user';

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

    public static async signInTransaction(userId: number, form: string, date: number, diamond: number) {
        console.log('签到事务收到的消息=>' + JSON.stringify(userId + ' ; ' + form + ' ; ' + date + ' ; ' + diamond));
        let transaction: Transaction;
        try {
            // get transaction
            transaction = await sequelize.transaction();
            console.log('获取到transaction');
            // step 1
            await tbl_signIn.update({ date, form }, { where: { userid: userId }, transaction });
            console.log('更新签到表成功');
            // step 2
            await tbl_user.update({ diamond }, { where: { userid: userId }, transaction });
            console.log('更新用户表成功');
            // commit
            await transaction.commit();
        } catch (err) {
            // Rollback transaction if any errors were encountered
            console.log('签到事务有误=>' + JSON.stringify(err));
            await transaction.rollback();
            return false;
        }
        await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.diamond}`, `${diamond}`);
        return true;
    }
}
