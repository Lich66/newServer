"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../db/redis");
const sequelize_1 = require("../../db/sequelize");
const dataBaseFields_1 = require("../../gameConfig/dataBaseFields");
const nameSpace_1 = require("../../gameConfig/nameSpace");
const userConfig_1 = require("../../gameConfig/userConfig");
const tbl_agent_1 = require("../../models/tbl_agent");
const tbl_realinfo_1 = require("../../models/tbl_realinfo");
const tbl_signin_1 = require("../../models/tbl_signin");
const tbl_user_1 = require("../../models/tbl_user");
const selfUtils_1 = require("../../util/selfUtils");
const base_1 = require("../base/base");
const user_1 = require("../user/user");
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
                let gamingNum = 0;
                let gamingUsers = await redis_1.redisClient.hgetallAsync(`${nameSpace_1.redisKeyPrefix.room}${roomId}${nameSpace_1.redisKeyPrefix.chair}`);
                for (const key in gamingUsers) {
                    if (gamingUsers.hasOwnProperty(key)) {
                        if (gamingUsers[key] !== '-1') {
                            gamingNum++;
                        }
                    }
                }
                let roomData = {
                    roomId,
                    basePoint: roomConfig[2],
                    playType: roomConfig[0],
                    payType: roomConfig[4],
                    round: roomConfig[3],
                    playerNum: roomConfig[1],
                    gamingPlayerNum: gamingNum
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
        if (selfUtils_1.SelfUtils.checkID(idNum)) {
            if (!selfUtils_1.SelfUtils.checkName(realName)) {
                return { code: 12022 };
            }
        }
        else {
            return { code: 12022 };
        }
        // todo 判断是否已绑定
        let realInfo = await tbl_realinfo_1.tbl_realinfo.findOne({ where: { userid: userId } });
        if (realInfo && realInfo.realname) {
            return { code: 12024, data: { realName: realInfo.realname, idNum: realInfo.idnum } };
        }
        let result = await tbl_realinfo_1.tbl_realinfo.update({ realname: realName, idnum: idNum }, { where: { userid: userId } });
        console.log('从数据库获取的玩家实名信息为：' + JSON.stringify(result));
        if (result[0] !== 1) {
            return { code: 12023 };
        }
        return { code: 0 };
    }
    /**
     * 绑定邀请码逻辑
     * @param userId 绑定邀请码玩家id
     * @param inviteCode 绑定的邀请码
     */
    static async bindInviteCode(userId, inviteCode) {
        let user = await user_1.User.getUser({ userid: userId });
        // 是否绑定过邀请码
        if (!!user.inviter) {
            console.log('已绑定邀请码!');
            return { code: 12061, data: { inviteCode: user.inviter } };
        }
        // 邀请码是否存在
        let agent = await tbl_agent_1.tbl_agent.findOne({ where: { invite_code: inviteCode } });
        if (!agent) {
            return { code: 12063 };
        }
        // 绑定
        let addDiamond = await base_1.Base.getDefaultValueByKey({ key: dataBaseFields_1.DataBaseFields.BindingAddGemsNum });
        if (!addDiamond) {
            return { code: 12062 };
        }
        let nowDiamond = user.diamond + parseInt(addDiamond, 0);
        let result = await user_1.User.updateUser({ userid: userId }, { inviter: inviteCode, diamond: (nowDiamond) });
        if (result === 0) {
            return { code: 12062 };
        }
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.diamond}`, `${nowDiamond}`);
        await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.inviter}`, inviteCode);
        return { code: 0, diamond: nowDiamond };
    }
    /**
     * 设置邀请状态(接收/拒收)逻辑
     * @param userId 玩家id
     * @param state 状态(接收:0/拒收:1)
     */
    static async setInvitationStatus(userId, state) {
        let result = await user_1.User.updateUser({ userid: userId }, { invitation_status: state });
        if (result === 0) {
            return { code: 12081 };
        }
        return { code: 0 };
    }
}
exports.Hall = Hall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2hhbGwvaGFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBDQUE2QztBQUM3QyxrREFBK0M7QUFDL0Msb0VBQWlFO0FBQ2pFLDBEQUE0RDtBQUM1RCw0REFBeUQ7QUFFekQsc0RBQW1EO0FBQ25ELDREQUF5RDtBQUN6RCx3REFBcUQ7QUFDckQsb0RBQWlEO0FBQ2pELG9EQUFpRDtBQUNqRCx1Q0FBb0M7QUFDcEMsdUNBQW9DO0FBRXBDLE1BQWEsSUFBSTtJQUNiOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQXlCLEVBQUUsS0FBdUM7UUFDbkcsc0JBQXNCO1FBQ3RCLElBQUksTUFBTSxHQUFHLE1BQU0sdUJBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakYsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQXdCO1FBQ3RELElBQUksTUFBTSxHQUFHLE1BQU0sdUJBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvRSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxPQUFlO1FBQzdGLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUss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