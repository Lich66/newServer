"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../db/redis");
const nameSpace_1 = require("../../gameConfig/nameSpace");
// import { ITbl_signIn } from '../../interface/models/tbl_signin';
const tbl_realinfo_1 = require("../../models/tbl_realinfo");
class Hall {
    // /**
    //  * 更新签到表
    //  * @param ojson 条件
    //  * @param njson 更新内容
    //  */
    // public static async updateSignInInfo(ojson: { userId: number }, njson: { date?: number; form?: string }): Promise<number> {
    //     // {uid:x},{diamond:9}
    //     let result = await tbl_signin.update(njson, { where: { userid: ojson.userId } });
    //     return result[0];
    // }
    // /**
    //  * 查找或新建签到表
    //  * @param json 条件
    //  */
    // public static async getSignInInfo(json: { userId: number }): Promise<[ITbl_signIn, boolean]> {
    //     let result = await tbl_signin.findOrCreate({ where: { userid: json.userId } });
    //     return result;
    // }
    // /**
    //  * 签到事务
    //  * @param userId 签到玩家id
    //  * @param form 玩家签到表
    //  * @param date 签到日期
    //  * @param diamond 玩家最新钻石数
    //  */
    // public static async signInTransaction(userId: number, form: string, date: number, diamond: number) {
    //     console.log('签到事务收到的消息=>' + JSON.stringify(userId + ' ; ' + form + ' ; ' + date + ' ; ' + diamond));
    //     let transaction: Transaction;
    //     try {
    //         // get transaction
    //         transaction = await sequelize.transaction();
    //         console.log('获取到transaction');
    //         // step 1
    //         await tbl_signin.update({ date, form }, { where: { userid: userId }, transaction });
    //         console.log('更新签到表成功');
    //         // step 2
    //         await tbl_user.update({ diamond }, { where: { userid: userId }, transaction });
    //         console.log('更新用户表成功');
    //         // commit
    //         await transaction.commit();
    //     } catch (err) {
    //         // Rollback transaction if any errors were encountered
    //         console.log('签到事务有误=>' + JSON.stringify(err));
    //         await transaction.rollback();
    //         return false;
    //     }
    //     await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.diamond}`, `${diamond}`);
    //     return true;
    // }
    /**
     * 获取玩家房间列表
     * @param userId 玩家id
     */
    static async getRoomList(userId) {
        let roomList = [];
        try {
            let len = await redis_1.redisClient.llenAsync(`${nameSpace_1.redisKeyPrefix.userRoomList}${userId}`);
            for (let i = 0; i < len; i++) {
                let roomId = await redis_1.redisClient.lindexAsync(`${nameSpace_1.redisKeyPrefix.userRoomList}${userId}`, i);
                let room = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}`);
                let roomConfig = JSON.parse(room.roomConfig);
                let userList = JSON.parse(room.userList);
                let roomData = {
                    roomId,
                    basePoint: roomConfig[2],
                    playType: roomConfig[0],
                    payType: roomConfig[4],
                    round: roomConfig[3],
                    playerNum: roomConfig[1],
                    gamingPlayerNum: userList.length
                };
                roomList.push(roomData);
            }
            return { flag: true, roomList };
        }
        catch (error) {
            return { flag: false, code: 12121 };
        }
    }
    /**
     * 获取玩家的实名认证信息
     * @param userId 玩家id
     */
    static async getRealInfo(userId) {
        let result = await tbl_realinfo_1.tbl_realinfo.findOrCreate({ where: { userid: userId } });
        console.log('从数据库获取的玩家实名信息为：' + JSON.stringify(result));
        return result[0];
    }
    /**
     * 实名认证
     * @param userId 玩家id
     * @param realName 玩家真实姓名
     * @param idNum 玩家身份证id
     */
    static async certification(userId, realName, idNum) {
        // todo 参数验证（实名+身份证验证）
        // todo 判断是否已绑定
        let result = await tbl_realinfo_1.tbl_realinfo.update({ realname: realName, idnum: idNum }, { where: { userid: userId } });
        console.log('从数据库获取的玩家实名信息为：' + JSON.stringify(result));
        return result[1][0];
    }
}
exports.Hall = Hall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2hhbGwvaGFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBDQUE2QztBQUU3QywwREFBNEQ7QUFFNUQsbUVBQW1FO0FBQ25FLDREQUF5RDtBQUl6RCxNQUFhLElBQUk7SUFDYixNQUFNO0lBQ04sV0FBVztJQUNYLHFCQUFxQjtJQUNyQix1QkFBdUI7SUFDdkIsTUFBTTtJQUNOLDhIQUE4SDtJQUM5SCw2QkFBNkI7SUFDN0Isd0ZBQXdGO0lBQ3hGLHdCQUF3QjtJQUN4QixJQUFJO0lBQ0osTUFBTTtJQUNOLGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIsTUFBTTtJQUNOLGlHQUFpRztJQUNqRyxzRkFBc0Y7SUFDdEYscUJBQXFCO0lBQ3JCLElBQUk7SUFFSixNQUFNO0lBQ04sVUFBVTtJQUNWLDBCQUEwQjtJQUMxQix1QkFBdUI7SUFDdkIsc0JBQXNCO0lBQ3RCLDRCQUE0QjtJQUM1QixNQUFNO0lBQ04sdUdBQXVHO0lBQ3ZHLDJHQUEyRztJQUMzRyxvQ0FBb0M7SUFDcEMsWUFBWTtJQUNaLDZCQUE2QjtJQUM3Qix1REFBdUQ7SUFDdkQseUNBQXlDO0lBQ3pDLG9CQUFvQjtJQUNwQiwrRkFBK0Y7SUFDL0Ysa0NBQWtDO0lBQ2xDLG9CQUFvQjtJQUNwQiwwRkFBMEY7SUFDMUYsa0NBQWtDO0lBQ2xDLG9CQUFvQjtJQUNwQixzQ0FBc0M7SUFDdEMsc0JBQXNCO0lBQ3RCLGlFQUFpRTtJQUNqRSx5REFBeUQ7SUFDekQsd0NBQXdDO0lBQ3hDLHdCQUF3QjtJQUN4QixRQUFRO0lBQ1IsNkdBQTZHO0lBQzdHLG1CQUFtQjtJQUNuQixJQUFJO0lBRUo7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBYztRQUMxQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSTtZQUNBLElBQUksR0FBRyxHQUFH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