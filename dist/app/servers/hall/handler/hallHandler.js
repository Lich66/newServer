"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../controller/base/base");
const hall_1 = require("../../../controller/hall/hall");
const user_1 = require("../../../controller/user/user");
const dataBaseFields_1 = require("../../../gameConfig/dataBaseFields");
function default_1(app) {
    return new HallHandler(app);
}
exports.default = default_1;
class HallHandler {
    constructor(app) {
        this.app = app;
    }
    /**
     * 获取签到信息
     * @param obj 客户端发送的参数
     * @param session session
     */
    async signInInfo(obj, session) {
        let userId = parseInt(session.uid, 0);
        let signInInfo = await hall_1.Hall.getSignInInfo({ userId });
        console.log('1获取到的签到信息: ' + JSON.stringify(signInInfo));
        if (!signInInfo) {
            console.log('1');
            return { code: 12041 };
        }
        let newDate = new Date();
        let form = [];
        if (signInInfo[1]) { // 为true时是新建的,直接返回
            console.log('新建玩家签到表');
            let result = await hall_1.Hall.updateSignInInfo({ userId }, { form: JSON.stringify(form) });
            if (!result || result === 0) {
                console.log('2');
                return { code: 12041 };
            }
            return { code: 0, data: { date: newDate.valueOf(), form } };
        }
        let info = signInInfo[0];
        if (info.date) {
            console.log('玩家曾经签到过');
            let oldDate = new Date(info.date);
            if (oldDate.getMonth() !== newDate.getMonth() || oldDate.getFullYear() !== newDate.getFullYear()) {
                console.log('签到表过期,重新生成');
                // 月份或年份不一致,清空数据库签到表
                let result = await hall_1.Hall.updateSignInInfo({ userId }, { form: JSON.stringify(form) });
                if (!result || result === 0) {
                    console.log('3');
                    return { code: 12041 };
                }
            }
            else {
                console.log('签到表没有过期');
                form = JSON.parse(info.form);
            }
        }
        return { code: 0, data: { date: (new Date()).valueOf(), form } };
    }
    /**
     * 签到
     * @param obj 客户端发送的参数
     * @param session xx
     */
    async signIn(obj, session) {
        let userId = parseInt(session.uid, 0);
        let signInInfo = await hall_1.Hall.getSignInInfo({ userId });
        console.log('2获取到的签到信息: ' + JSON.stringify(signInInfo));
        if (!signInInfo) {
            console.log('4');
            return { code: 12041 };
        }
        let info = signInInfo[0];
        let newDate = new Date();
        let form = JSON.parse(info.form);
        if (info.date) {
            let oldDate = new Date(info.date);
            if (oldDate.getDate() === newDate.getDate() && oldDate.getMonth() === newDate.getMonth() && oldDate.getFullYear() === newDate.getFullYear()) {
                return { code: 12042 };
            }
        }
        form.push(newDate.getDate());
        let user = await user_1.User.getUser({ userid: userId });
        if (!user) {
            return { code: 12043 };
        }
        let addDiamond = await base_1.Base.getDefaultValueByKey({ key: dataBaseFields_1.DataBaseFields.DailyShareAddGemsNum });
        if (!addDiamond) {
            return { code: 12043 };
        }
        let result = await hall_1.Hall.signInTransaction(userId, JSON.stringify(form), newDate.valueOf(), (user.diamond + parseInt(addDiamond, 0)));
        if (result) {
            return { code: 0, data: { diamond: user.diamond + 1 } };
        }
        else {
            return { code: 12043 };
        }
    }
    /**
     * 获取房间列表
     * @param obj xx
     * @param session session
     */
    async roomList(obj, session) {
        let userId = parseInt(session.uid, 0);
        let result = await hall_1.Hall.getRoomList(userId);
        console.log('获取到的玩家房间列表：' + JSON.stringify(result));
        if (!result.flag) {
            return { code: result.code };
        }
        return { code: 0, data: result.roomList };
    }
    /**
     * 获取玩家实名信息
     * @param obj xx
     * @param session session
     */
    async getRealInfo(obj, session) {
        let userId = parseInt(session.uid, 0);
        let result = await hall_1.Hall.getRealInfo(userId);
        console.log('获取玩家实名信息: ' + JSON.stringify(result));
        return { code: 0, data: { realName: result.realname, idNum: result.idnum } };
    }
    /**
     * 玩家实名认证
     * @param msg 实名信息
     * @param session session
     */
    async certification(msg, session) {
        let userId = parseInt(session.uid, 0);
        let result = await hall_1.Hall.certification(userId, msg.realName, msg.idNum);
        return result;
    }
    /**
     * 玩家绑定邀请码
     * @param msg 邀请码
     * @param session session
     */
    async bindInviteCode(msg, session) {
        let userId = parseInt(session.uid, 0);
        let result = await hall_1.Hall.bindInviteCode(userId, msg.inviteCode);
        return result;
    }
    /**
     * 更改玩家邮件接收状态
     * @param msg 新状态
     * @param session session
     */
    async setInvitationStatus(msg, session) {
        let userId = parseInt(session.uid, 0);
        let result = await hall_1.Hall.setInvitationStatus(userId, msg.state);
        return result;
    }
    /**
     * 切换账号
     * @param obj xx
     * @param session session
     */
    async switchAccount(obj, session) {
        let userId = parseInt(session.uid, 0);
        session.unbind(`${userId}`, () => {
            console.log('session的UID已解除绑定!');
        });
        return { code: 0 };
    }
    /**
     * 分享前获取信息
     * @param obj xx
     * @param session session
     */
    async getShareData(obj, session) {
        let userId = parseInt(session.uid, 0);
        let result = hall_1.Hall.shareGame(userId);
        return result;
    }
    /**
     * 分享游戏
     * @param obj xx
     * @param session session
     */
    async shareGame(obj, session) {
        let result = hall_1.Hall.getShareData();
        return result;
    }
}
exports.HallHandler = HallHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsbEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9oYWxsL2hhbmRsZXIvaGFsbEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3REFBcUQ7QUFDckQsd0RBQXFEO0FBQ3JELHdEQUFxRDtBQUNyRCx1RUFBb0U7QUFHcEUsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUZELDRCQUVDO0FBRUQsTUFBYSxXQUFXO0lBQ3BCLFlBQTJCLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQVEsRUFBRSxPQUF1QjtRQUNyRCxJQUFJLE1BQU0sR0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLFVBQVUsR0FBRyxNQUFNLFdBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLElBQUksR0FBa0IsRUFBRSxDQUFDO1FBQzdCLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUssa0JBQWtCO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsSUFB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