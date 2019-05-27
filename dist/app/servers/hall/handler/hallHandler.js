"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tbl_signIn_1 = require("../../../models/tbl_signIn");
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
     * @param obj xx
     * @param session xx
     */
    async signInInfo(obj, session) {
        let userId = parseInt(session.uid, 0);
        let signInInfo = await tbl_signIn_1.tbl_signIn.findOrCreate({ where: { userid: userId } });
        console.log('获取到的签到信息: ' + JSON.stringify(signInInfo));
        return { code: 0, data: { signInInfo } };
    }
}
exports.HallHandler = HallHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsbEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9oYWxsL2hhbmRsZXIvaGFsbEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyREFBd0Q7QUFFeEQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUZELDRCQUVDO0FBRUQsTUFBYSxXQUFXO0lBQ3BCLFlBQTJCLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQVEsRUFBRSxPQUF1QjtRQUNyRCxJQUFJLE1BQU0sR0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLFVBQVUsR0FBRyxNQUFNLHVCQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5RSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdkQsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0NBRUo7QUFoQkQsa0NBZ0JDIn0=