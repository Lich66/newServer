"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../../controller/user/user");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
    }
    async addDiamond(msg, session) {
        const user = await user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
        const diamond = user.diamond + msg.diamond;
        const bool = await this.timeout();
        if (bool) {
            const nuser = await user_1.User.updateUser({ userid: Number.parseInt(session.uid, 0) }, { diamond });
            return {
                code: 0,
                data: nuser
            };
        }
        else {
            return {
                code: 165165816
                // data: nuser
            };
        }
    }
    async timeout() {
        const time = 5000;
        return new Promise(function (resolve, reject) {
            // ... some code
            if (true) {
                setTimeout(() => {
                    resolve(true);
                }, time);
            }
            else {
            }
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy91c2VyL2hhbmRsZXIvdXNlckhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3REFBcUQ7QUFJckQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELDRCQUVDO0FBRUQsTUFBYSxPQUFPO0lBRWhCLFlBQW1CLEdBQWdCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQXdCLEVBQUUsT0FBdUI7UUFDckUsTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0UsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzNDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xDLElBQUksSUFBSSxFQUFFO1lBQ04sTUFBTSxLQUFLLEdBQUcsTUFBTSxXQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUM5RixPQUFPO2dCQUNILElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLGNBQWM7YUFDakIsQ0FBQztTQUNMO0lBRUwsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPO1FBQ2hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07WUFDeEMsZ0JBQWdCO1lBRWhCLElBQUksSUFBSSxFQUFFO2dCQUNOLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFFWjtpQkFBTTthQUNOO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUF2Q0QsMEJBdUNDIn0=