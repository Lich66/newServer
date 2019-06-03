import * as Sequelize from 'sequelize';
import { Transaction } from 'sequelize/types';
import { redisClient } from '../../db/redis';
import { sequelize } from '../../db/sequelize';
import { DataBaseFields } from '../../gameConfig/dataBaseFields';
import { redisKeyPrefix } from '../../gameConfig/nameSpace';
import { userConfig } from '../../gameConfig/userConfig';
import { ITbl_signIn } from '../../interface/models/tbl_signin';
import { tbl_agent } from '../../models/tbl_agent';
import { tbl_notice } from '../../models/tbl_notice';
import { tbl_realinfo } from '../../models/tbl_realinfo';
import { tbl_share } from '../../models/tbl_share';
import { tbl_signin } from '../../models/tbl_signin';
import { tbl_user } from '../../models/tbl_user';
import { SelfUtils } from '../../util/selfUtils';
import { Base } from '../base/base';
import { User } from '../user/user';
const Op = Sequelize.Op;

export class Hall {
    /**
     * 更新签到表
     * @param ojson 条件
     * @param njson 更新内容
     */
    public static async updateSignInInfo(ojson: { userId: number }, njson: { date?: number; form?: string }): Promise<number> {
        // {uid:x},{diamond:9}
        let result = await tbl_signin.update(njson, { where: { userid: ojson.userId } });
        return result[0];
    }
    /**
     * 查找或新建签到表
     * @param json 条件
     */
    public static async getSignInInfo(json: { userId: number }): Promise<[ITbl_signIn, boolean]> {
        let result = await tbl_signin.findOrCreate({ where: { userid: json.userId } });
        return result;
    }

    /**
     * 签到事务
     * @param userId 签到玩家id
     * @param form 玩家签到表
     * @param date 签到日期
     * @param diamond 玩家最新钻石数
     */
    public static async signInTransaction(userId: number, form: string, date: number, diamond: number) {
        console.log('签到事务收到的消息=>' + JSON.stringify(userId + ' ; ' + form + ' ; ' + date + ' ; ' + diamond));
        let transaction: Transaction;
        try {
            // get transaction
            transaction = await sequelize.transaction();
            console.log('获取到transaction');
            // step 1
            await tbl_signin.update({ date, form }, { where: { userid: userId }, transaction });
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

    /**
     * 获取玩家房间列表
     * @param userId 玩家id
     */
    public static async getRoomList(userId: number) {
        let roomList = [];
        try {
            let len = await redisClient.llenAsync(`${redisKeyPrefix.userRoomList}${userId}`);
            for (let i = 0; i < len; i++) {
                let roomId = await redisClient.lindexAsync(`${redisKeyPrefix.userRoomList}${userId}`, i);
                let room = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}`);
                let roomConfig = JSON.parse(room.roomConfig);
                let gamingNum = 0;
                let gamingUsers = await redisClient.hgetallAsync(`${redisKeyPrefix.room}${roomId}${redisKeyPrefix.chair}`);
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
        } catch (error) {
            return { flag: false, code: 12121 };
        }
    }

    /**
     * 获取玩家的实名认证信息
     * @param userId 玩家id
     */
    public static async getRealInfo(userId: number) {
        let result = await tbl_realinfo.findOrCreate({ where: { userid: userId } });
        console.log('从数据库获取的玩家实名信息为：' + JSON.stringify(result));
        return result[0];
    }

    /**
     * 实名认证
     * @param userId 玩家id
     * @param realName 玩家真实姓名
     * @param idNum 玩家身份证id
     */
    public static async certification(userId: number, realName: string, idNum: string) {
        if (SelfUtils.checkID(idNum)) {
            if (!SelfUtils.checkName(realName)) {
                return { code: 12022 };
            }
        } else {
            return { code: 12022 };
        }
        // todo 判断是否已绑定
        let realInfo = await tbl_realinfo.findOne({ where: { userid: userId } });
        if (realInfo && realInfo.realname) {
            return { code: 12024, data: { realName: realInfo.realname, idNum: realInfo.idnum } };
        }
        let result = await tbl_realinfo.update({ realname: realName, idnum: idNum }, { where: { userid: userId } });
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
    public static async bindInviteCode(userId: number, inviteCode: string) {
        let user = await User.getUser({ userid: userId });
        // 是否绑定过邀请码
        if (!!user.inviter) {
            console.log('已绑定邀请码!');
            return { code: 12061, data: { inviteCode: user.inviter } };
        }
        // 邀请码是否存在
        let agent = await tbl_agent.findOne({ where: { invite_code: inviteCode } });
        if (!agent) {
            return { code: 12063 };
        }
        // 绑定
        let addDiamond = await Base.getDefaultValueByKey({ key: DataBaseFields.BindingAddGemsNum });
        if (!addDiamond) {
            return { code: 12062 };
        }
        let nowDiamond = user.diamond + parseInt(addDiamond, 0);
        let result = await User.updateUser({ userid: userId }, { inviter: inviteCode, diamond: (nowDiamond) });
        if (result === 0) {
            return { code: 12062 };
        }
        await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.diamond}`, `${nowDiamond}`);
        await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.inviter}`, inviteCode);
        return { code: 0, diamond: nowDiamond };
    }

    /**
     * 设置邀请状态(接收/拒收)逻辑
     * @param userId 玩家id
     * @param state 状态(接收:0/拒收:1)
     */
    public static async setInvitationStatus(userId: number, state: number) {
        let result = await User.updateUser({ userid: userId }, { invitation_status: state });
        if (result === 0) {
            return { code: 12081 };
        }
        return { code: 0 };
    }

    /**
     * 获取分享信息
     */
    public static async getShareData() {
        let result = await tbl_share.findAll({ order: [['share_id', 'DESC']], limit: 1 });
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
    public static async shareGame(userId: number) {
        let user = await tbl_user.findOne({ where: { userid: userId } });
        if (!!user.share_time) { // 不是首次分享
            // 今天是否已分享
            // console.log('上次分享的时间是: ' + JSON.stringify(user.share_time));
            // console.log('当前的时间是: ' + JSON.stringify(new Date()));
            let shareDateStr = JSON.stringify(user.share_time).substr(0, 10);
            let nowDateStr = JSON.stringify(new Date()).substr(0, 10);
            if (shareDateStr === nowDateStr) {
                return { code: 12071 };
            }
            let addDiamond = await Base.getDefaultValueByKey({ key: DataBaseFields.DailyShareAddGemsNum });
            if (!addDiamond) {
                return { code: 12072 };
            }
            let nowDiamond = user.diamond + parseInt(addDiamond, 0);
            let result = await tbl_user.update({ diamond: nowDiamond, share_time: new Date() }, { where: { userid: userId } });
            if (result[0] === 0) {
                return { code: 12072 };
            }
            await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.diamond}`, `${nowDiamond}`);
            return { code: 0, diamond: nowDiamond };
        } else { // 首次分享
            let addDiamond = await Base.getDefaultValueByKey({ key: DataBaseFields.FirstShareAddGemsNum });
            if (!addDiamond) {
                return { code: 12072 };
            }
            let nowDiamond = user.diamond + parseInt(addDiamond, 0);
            let result = await tbl_user.update({ diamond: nowDiamond, first_share: false, share_time: new Date() }, { where: { userid: userId } });
            if (result[0] === 0) {
                return { code: 12072 };
            }
            await redisClient.hsetAsync(`${redisKeyPrefix.user}${userId}`, `${userConfig.diamond}`, `${nowDiamond}`);
            return { code: 0, diamond: nowDiamond };
        }
    }

    /**
     * 获取公告逻辑
     */
    public static async getNotice() {
        console.log('进来查询了');
        let nowDate = new Date();
        let result = await tbl_notice.findAll({
            where: {
                notice_start_time: { [Op.lte]: nowDate },
                notice_end_time: { [Op.gte]: nowDate }
            }
        });
        // console.log('获取到的系统公告信息: ' + JSON.stringify(result));
        let data = [];
        for (const iterator of result) {
            let notify = {
                NoticeType: iterator.notice_type,
                NoticeTitle: iterator.notice_title,
                Value: iterator.value
            };
            data.push(notify);
        }
        // console.log('整理后的系统信息: ' + JSON.stringify(data));
        return data;
    }
}
