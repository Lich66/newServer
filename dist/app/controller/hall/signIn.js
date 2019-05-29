"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../db/redis");
const sequelize_1 = require("../../db/sequelize");
const nameSpace_1 = require("../../gameConfig/nameSpace");
const userConfig_1 = require("../../gameConfig/userConfig");
const tbl_signIn_1 = require("../../models/tbl_signIn");
const tbl_user_1 = require("../../models/tbl_user");
class SignIn {
    /**
     * 更新签到表
     * @param ojson 条件
     * @param njson 更新内容
     */
    static async updateSignInInfo(ojson, njson) {
        // {uid:x},{diamond:9}
        let result = await tbl_signIn_1.tbl_signIn.update(njson, { where: { userid: ojson.userId } });
        return result[0];
    }
    /**
     * 查找或新建签到表
     * @param json 条件
     */
    static async getSignInInfo(json) {
        let result = await tbl_signIn_1.tbl_signIn.findOrCreate({ where: { userid: json.userId } });
        return result;
    }
    static async signInTransaction(userId, form, date, diamond) {
        console.log('签到事务收到的消息=>' + JSON.stringify(userId + ' ; ' + form + ' ; ' + date + ' ; ' + diamond));
        let transaction;
        try {
            // get transaction
            transaction = await sequelize_1.sequelize.transaction();
            console.log('获取到transaction');
            // step 1
            await tbl_signIn_1.tbl_signIn.update({ date, form }, { where: { userid: userId }, transaction });
            console.log('更新签到表成功');
            // step 2
            await tbl_user_1.tbl_user.update({ diamond }, { where: { userid: userId }, transaction });
            console.log('更新用户表成功');
            // commit
            await transaction.commit();
        }
        catch (err) {
            // Rollback transaction if any errors were encountered
            console.log('签到事务有误=>' + JSON.stringify(err));
            await transaction.rollback();
            return false;
        }
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.diamond}`, `${diamond}`);
        return true;
    }
}
exports.SignIn = SignIn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbkluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vYXBwL2NvbnRyb2xsZXIvaGFsbC9zaWduSW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwwQ0FBNkM7QUFDN0Msa0RBQStDO0FBQy9DLDBEQUE0RDtBQUM1RCw0REFBeUQ7QUFFekQsd0RBQXFEO0FBQ3JELG9EQUFpRDtBQUVqRCxNQUFhLE1BQU07SUFDZjs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUF5QixFQUFFLEtBQXVDO1FBQ25HLHNCQUFzQjtRQUN0QixJQUFJLE1BQU0sR0FBRyxNQUFNLHVCQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUF3QjtRQUN0RCxJQUFJLE1BQU0sR0FBRyxNQUFNLHVCQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0UsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsTUFBYyxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsT0FBZTtRQUM3RixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEcsSUFBSSxXQUF3QixDQUFDO1FBQzdCLElBQUk7WUFDQSxrQkFBa0I7WUFDbEIsV0FBVyxHQUFHLE1BQU0scUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUIsU0FBUztZQUNULE1BQU0sdUJBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNwRixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLFNBQVM7WUFDVCxNQUFNLG1CQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUMvRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLFNBQVM7WUFDVCxNQUFNLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM5QjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1Ysc0RBQXNEO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5QyxNQUFNLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE1BQU0sbUJBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRywwQkFBYyxDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsRUFBRSxHQUFHLHVCQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3RHLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQTVDRCx3QkE0Q0MifQ==