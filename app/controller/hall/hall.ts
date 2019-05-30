import { Transaction } from 'sequelize/types';
import { redisClient } from '../../db/redis';
import { sequelize } from '../../db/sequelize';
import { redisKeyPrefix } from '../../gameConfig/nameSpace';
import { userConfig } from '../../gameConfig/userConfig';
import { ITbl_signIn } from '../../interface/models/tbl_signin';
import { tbl_realinfo } from '../../models/tbl_realinfo';
import { tbl_signin } from '../../models/tbl_signin';
import { tbl_user } from '../../models/tbl_user';

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
        // todo 参数验证（实名+身份证验证）
        // todo 判断是否已绑定
        let result = await tbl_realinfo.update({ realname: realName, idnum: idNum }, { where: { userid: userId } });
        console.log('从数据库获取的玩家实名信息为：' + JSON.stringify(result));
        return result[1][0];
    }
}
