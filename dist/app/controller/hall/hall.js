"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../db/redis");
const sequelize_1 = require("../../db/sequelize");
const nameSpace_1 = require("../../gameConfig/nameSpace");
const userConfig_1 = require("../../gameConfig/userConfig");
const tbl_realinfo_1 = require("../../models/tbl_realinfo");
const tbl_signin_1 = require("../../models/tbl_signin");
const tbl_user_1 = require("../../models/tbl_user");
class Hall {
    /**
     * 更新签到表
     * @param ojson 条件
     * @param njson 更新内容
     */
    static async updateSignInInfo(ojson, njson) {
        // {uid:x},{diamond:9}
        let result = await tbl_signin_1.tbl_signin.update(njson, { where: { userid: ojson.userId } });
        return result[0];
    }
    /**
     * 查找或新建签到表
     * @param json 条件
     */
    static async getSignInInfo(json) {
        let result = await tbl_signin_1.tbl_signin.findOrCreate({ where: { userid: json.userId } });
        return result;
    }
    /**
     * 签到事务
     * @param userId 签到玩家id
     * @param form 玩家签到表
     * @param date 签到日期
     * @param diamond 玩家最新钻石数
     */
    static async signInTransaction(userId, form, date, diamond) {
        console.log('签到事务收到的消息=>' + JSON.stringify(userId + ' ; ' + form + ' ; ' + date + ' ; ' + diamond));
        let transaction;
        try {
            // get transaction
            transaction = await sequelize_1.sequelize.transaction();
            console.log('获取到transaction');
            // step 1
            await tbl_signin_1.tbl_signin.update({ date, form }, { where: { userid: userId }, transaction });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2hhbGwvaGFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBDQUE2QztBQUM3QyxrREFBK0M7QUFDL0MsMERBQTREO0FBQzVELDREQUF5RDtBQUV6RCw0REFBeUQ7QUFDekQsd0RBQXFEO0FBQ3JELG9EQUFpRDtBQUVqRCxNQUFhLElBQUk7SUFDYjs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUF5QixFQUFFLEtBQXVDO1FBQ25HLHNCQUFzQjtRQUN0QixJQUFJLE1BQU0sR0FBRyxNQUFNLHVCQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUF3QjtRQUN0RCxJQUFJLE1BQU0sR0FBRyxNQUFNLHVCQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0UsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsTUFBYyxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsT0FBZTtRQUM3RixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7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