"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recharge_1 = require("../../../controller/recharge/recharge");
const selfUtils_1 = require("../../../util/selfUtils");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
    }
    async addDiamond(msg, session) {
        const resiult = recharge_1.Recharge.recharge({ userid: Number.parseInt(session.uid, 0) });
        const bool = await selfUtils_1.SelfUtils.timeout();
        return {
            code: 0,
            data: resiult
        };
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy91c2VyL2hhbmRsZXIvdXNlckhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxvRUFBaUU7QUFDakUsdURBQW9EO0FBR3BELG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFGRCw0QkFFQztBQUVELE1BQWEsT0FBTztJQUVoQixZQUFtQixHQUFnQjtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUF3QixFQUFFLE9BQXVCO1FBQ3JFLE1BQU0sT0FBTyxHQUFHLG1CQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0UsTUFBTSxJQUFJLEdBQUcsTUFBTSxxQkFBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXZDLE9BQU87WUFDSCxJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxPQUFPO1NBQ2hCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFmRCwwQkFlQyJ9