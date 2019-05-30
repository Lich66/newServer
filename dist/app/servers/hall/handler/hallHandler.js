"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hall_1 = require("../../../controller/hall/hall");
const user_1 = require("../../../controller/user/user");
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
        let result = await hall_1.Hall.signInTransaction(userId, JSON.stringify(form), newDate.valueOf(), (user.diamond + 1));
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
}
exports.HallHandler = HallHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsbEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9oYWxsL2hhbmRsZXIvaGFsbEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3REFBcUQ7QUFDckQsd0RBQXFEO0FBR3JELG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFGRCw0QkFFQztBQUVELE1BQWEsV0FBVztJQUNwQixZQUEyQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFRLEVBQUUsT0FBdUI7UUFDckQsSUFBSSxNQUFNLEdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxVQUFVLEdBQUcsTUFBTSxXQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUMxQjtRQUNELElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLEdBQWtCLEVBQUUsQ0FBQztRQUM3QixJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFLLGtCQUFrQjtZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksTUFBTSxHQUFHLE1BQU0sV0FBSSxDQUFD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