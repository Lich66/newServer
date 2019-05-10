"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/handler/userInterface';
const login_1 = require("../../../controller/account/login");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
    }
    /**
     * user login
     *
     * @param  {Object}   userinfo     request message
     * @return {object}
     */
    auth(userinfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let json = {};
            if (userinfo.token) {
                json.token = userinfo.token;
            }
            else if (userinfo.wxopenid) {
                json.wxopenid = userinfo.wxopenid;
            }
            else if (userinfo.xlopenid) {
                json.xlopenid = userinfo.xlopenid;
            }
            let result = yield login_1.Login.login(json);
            return {
                code: 0,
                data: result,
            };
        });
    }
    /**
     * test login
     *
     * @param  {Object}   userinfo     request message
     * @return {object}
     */
    accountLogin(userinfo) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(JSON.stringify(userinfo));
            let result = yield login_1.Login.accountLogin(userinfo);
            return {
                code: 0,
                data: result,
            };
        });
    }
    /**
     * token login
     *
     * @param  {Object}   userinfo     request message
     * @return {object}
     */
    tokenLogin(userinfo) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(JSON.stringify(userinfo));
            let result = yield login_1.Login.tokenLogin(userinfo);
            if (result.token) {
                return {
                    code: 0,
                    data: result,
                    msg: `登陆成功`
                };
            }
            else {
                return {
                    code: 0,
                    msg: '用户不存在'
                };
            }
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy91c2VyL2hhbmRsZXIvdXNlckhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLG9IQUFvSDtBQUNwSCw2REFBMEQ7QUFJMUQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELDRCQUVDO0FBRUQ7SUFDSSxZQUFvQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0lBRXBDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNHLElBQUksQ0FBQyxRQUEwQjs7WUFDakMsSUFBSSxJQUFJLEdBQXFCLEVBQUUsQ0FBQztZQUNoQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUMvQjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNyQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNyQztZQUNELElBQUksTUFBTSxHQUFHLE1BQU0sYUFBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxPQUFPO2dCQUNILElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxNQUFNO2FBRWYsQ0FBQztRQUNOLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0csWUFBWSxDQUFDLFFBQTZCOztZQUM1Qyx5Q0FBeUM7WUFDekMsSUFBSSxNQUFNLEdBQUcsTUFBTSxhQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELE9BQU87Z0JBQ0gsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDO1FBQ04sQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDRyxVQUFVLENBQUMsUUFBMkI7O1lBQ3hDLHlDQUF5QztZQUN6QyxJQUFJLE1BQU0sR0FBRyxNQUFNLGFBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNkLE9BQU87b0JBQ0gsSUFBSSxFQUFFLENBQUM7b0JBQ1AsSUFBSSxFQUFFLE1BQU07b0JBQ1osR0FBRyxFQUFFLE1BQU07aUJBQ2QsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE9BQU87b0JBQ0gsSUFBSSxFQUFFLENBQUM7b0JBQ1AsR0FBRyxFQUFFLE9BQU87aUJBQ2YsQ0FBQzthQUNMO1FBRUwsQ0FBQztLQUFBO0NBRUo7QUFuRUQsMEJBbUVDIn0=