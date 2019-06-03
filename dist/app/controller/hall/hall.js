"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../db/redis");
const sequelize_1 = require("../../db/sequelize");
const dataBaseFields_1 = require("../../gameConfig/dataBaseFields");
const nameSpace_1 = require("../../gameConfig/nameSpace");
const userConfig_1 = require("../../gameConfig/userConfig");
const tbl_agent_1 = require("../../models/tbl_agent");
const tbl_realinfo_1 = require("../../models/tbl_realinfo");
const tbl_share_1 = require("../../models/tbl_share");
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
    /**
     * 获取分享信息
     */
    static async getShareData() {
        let result = await tbl_share_1.tbl_share.findAll({ order: [['share_id', 'DESC']], limit: 1 });
        if (!result || !result[0]) {
            return { code: 12141 };
        }
        console.log('获取到分享前信息为: ' + JSON.stringify(result));
        let photoUrl = result[0].photo_url;
        let photoPosition = JSON.parse(result[0].photo_position);
        let photoSize = JSON.parse(result[0].photo_size);
        let codePosition = JSON.parse(result[0].code_position);
        return {
            code: 0, data: {
                photoUrl,
                photoPosition,
                photoSize,
                codePosition
            }
        };
    }
    /**
     * 分享游戏逻辑
     * @param userId 玩家id
     */
    static async shareGame(userId) {
        let user = await tbl_user_1.tbl_user.findOne({ where: { userid: userId } });
        if (!!user.share_time) { // 不是首次分享
            // 今天是否已分享
            // console.log('上次分享的时间是: ' + JSON.stringify(user.share_time));
            // console.log('当前的时间是: ' + JSON.stringify(new Date()));
            let shareDateStr = JSON.stringify(user.share_time).substr(0, 10);
            let nowDateStr = JSON.stringify(new Date()).substr(0, 10);
            if (shareDateStr === nowDateStr) {
                return { code: 12071 };
            }
            let addDiamond = await base_1.Base.getDefaultValueByKey({ key: dataBaseFields_1.DataBaseFields.DailyShareAddGemsNum });
            if (!addDiamond) {
                return { code: 12072 };
            }
            let nowDiamond = user.diamond + parseInt(addDiamond, 0);
            let result = await tbl_user_1.tbl_user.update({ diamond: nowDiamond, share_time: new Date() }, { where: { userid: userId } });
            if (result[0] === 0) {
                return { code: 12072 };
            }
            await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.diamond}`, `${nowDiamond}`);
            return { code: 0, diamond: nowDiamond };
        }
        else { // 首次分享
            let addDiamond = await base_1.Base.getDefaultValueByKey({ key: dataBaseFields_1.DataBaseFields.FirstShareAddGemsNum });
            if (!addDiamond) {
                return { code: 12072 };
            }
            let nowDiamond = user.diamond + parseInt(addDiamond, 0);
            let result = await tbl_user_1.tbl_user.update({ diamond: nowDiamond, first_share: false, share_time: new Date() }, { where: { userid: userId } });
            if (result[0] === 0) {
                return { code: 12072 };
            }
            await redis_1.redisClient.hsetAsync(`${nameSpace_1.redisKeyPrefix.user}${userId}`, `${userConfig_1.userConfig.diamond}`, `${nowDiamond}`);
            return { code: 0, diamond: nowDiamond };
        }
    }
}
exports.Hall = Hall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL2hhbGwvaGFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBDQUE2QztBQUM3QyxrREFBK0M7QUFDL0Msb0VBQWlFO0FBQ2pFLDBEQUE0RDtBQUM1RCw0REFBeUQ7QUFFekQsc0RBQW1EO0FBQ25ELDREQUF5RDtBQUN6RCxzREFBbUQ7QUFDbkQsd0RBQXFEO0FBQ3JELG9EQUFpRDtBQUNqRCxvREFBaUQ7QUFDakQsdUNBQW9DO0FBQ3BDLHVDQUFvQztBQUVwQyxNQUFhLElBQUk7SUFDYjs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUF5QixFQUFFLEtBQXVDO1FBQ25HLHNCQUFzQjtRQUN0QixJQUFJLE1BQU0sR0FBRyxNQUFNLHVCQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUF3QjtRQUN0RCxJQUFJLE1BQU0sR0FBRyxNQUFNLHVCQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0UsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsTUFBYyxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsT0FBZTtRQUM3RixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEcsSUFBSSxXQUF3QixDQUFDO1FBQzdCLElBQUk7WUFDQSxrQkFBa0I7WUFDbEIsV0FBVyxHQUFHLE1BQU0scUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUIsU0FBUztZQUNULE1BQU0sdUJBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNwRixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLFNBQVM7WUFDVCxNQUFNLG1CQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUMvRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLFNBQVM7WUFDVCxNQUFNLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM5QjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1Ysc0RBQXNEO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5QyxNQUFNLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE1BQU0sbUJBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRywwQkFBYyxDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsRUFBRSxHQUFHLHVCQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3RHLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFjO1FBQzFDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJO1lBQ0EsSUFBSSxHQUFHLEdBQUcsTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLDBCQUFjLENBQUMsWUFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDakYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxNQUFNLEdBQUcsTUFBTSxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLDBCQUFjLENBQUMsWUFBWSxHQUFHLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN6RixJQUFJLElBQUksR0FBRyxNQUFNLG1CQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsMEJBQWMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDN0UsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzdDLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxXQUFXLEdBQUcsTUFBTSxtQkFBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLDBCQUFjLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRywwQkFBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQzNHLEtBQUssTUFBTSxHQUFHLElBQUksV0FBVyxFQUFFO29CQUMzQixJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ2pDLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRTs0QkFDM0IsU0FBUyxFQUFFLENBQUM7eUJBQ2Y7cUJBQ0o7aUJBQ0o7Z0JBQ0QsSUFBSSxRQUFRLEdBQUc7b0JBQ1gsTUFBTTtvQkFDTixTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUN0QixLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDcEIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLGVBQWUsRUFBRSxTQUFTO2lCQUM3QixDQUFDO2dCQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0I7WUFDRCxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztTQUNuQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQWM7UUFDMUMsSUFBSSxNQUFNLEdBQUcsTUFBTSwyQkFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBYyxFQUFFLFFBQWdCLEVBQUUsS0FBYTtRQUM3RSxJQUFJLHFCQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUMxQjtTQUNKO2FBQU07WUFDSCxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQzFCO1FBQ0QsZUFBZTtRQUNmLElBQUksUUFBUSxHQUFHLE1BQU0sMkJBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDL0IsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1NBQ3hGO1FBQ0QsSUFBSSxNQUFNLEdBQUcsTUFBTSwyQkFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1RyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUMxQjtRQUNELE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFjLEVBQUUsVUFBa0I7UUFDakUsSUFBSSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbEQsV0FBVztRQUNYLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7U0FDOUQ7UUFDRCxVQUFVO1FBQ1YsSUFBSSxLQUFLLEdBQUcsTUFBTSxxQkFBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDMUI7UUFDRCxLQUFLO1FBQ0wsSUFBSSxVQUFVLEdBQUcsTUFBTSxXQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxHQUFHLEVBQUUsK0JBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDMUI7UUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxNQUFNLEdBQUcsTUFBTSxXQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkcsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2QsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUMxQjtRQUNELE1BQU0sbUJBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRywwQkFBYyxDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsRUFBRSxHQUFHLHVCQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3pHLE1BQU0sbUJBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRywwQkFBYyxDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsRUFBRSxHQUFHLHVCQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEcsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxNQUFjLEVBQUUsS0FBYTtRQUNqRSxJQUFJLE1BQU0sR0FBRyxNQUFNLFdBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JGLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNkLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDMUI7UUFDRCxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWTtRQUM1QixJQUFJLE1BQU0sR0FBRyxNQUFNLHFCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDMUI7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNuQyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxPQUFPO1lBQ0gsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUU7Z0JBQ1gsUUFBUTtnQkFDUixhQUFhO2dCQUNiLFNBQVM7Z0JBQ1QsWUFBWTthQUNmO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFjO1FBQ3hDLElBQUksSUFBSSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxTQUFTO1lBQzlCLFVBQVU7WUFDViwrREFBK0Q7WUFDL0Qsd0RBQXdEO1lBQ3hELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakUsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMxRCxJQUFJLFlBQVksS0FBSyxVQUFVLEVBQUU7Z0JBQzdCLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDMUI7WUFDRCxJQUFJLFVBQVUsR0FBRyxNQUFNLFdBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSwrQkFBYyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztZQUMvRixJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDMUI7WUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxNQUFNLEdBQUcsTUFBTSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbkgsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQzFCO1lBQ0QsTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLDBCQUFjLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxFQUFFLEdBQUcsdUJBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDekcsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO1NBQzNDO2FBQU0sRUFBRSxPQUFPO1lBQ1osSUFBSSxVQUFVLEdBQUcsTUFBTSxXQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxHQUFHLEVBQUUsK0JBQWMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7WUFDL0YsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDYixPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdkksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQzFCO1lBQ0QsTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLDBCQUFjLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxFQUFFLEdBQUcsdUJBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDekcsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztDQUNKO0FBM09ELG9CQTJPQyJ9