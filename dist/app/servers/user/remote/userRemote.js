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
// // import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/Remote/userInterface';
const login_1 = require("../../../controller/account/login");
function default_1(app) {
    return new Remote(app);
}
exports.default = default_1;
class Remote {
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
            return yield login_1.Login.login(json);
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
            if (result) {
                return {
                    code: 200,
                    data: result,
                };
            }
            else {
                return {
                    code: 500,
                    // data: result,
                    msg: `账号密码不符合`
                };
            }
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
            if (result) {
                return {
                    code: 200,
                    data: result,
                    msg: `登陆成功`
                };
            }
            else {
                return {
                    code: 500,
                    msg: '用户不存在'
                };
            }
        });
    }
}
exports.Remote = Remote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL3VzZXIvcmVtb3RlL3VzZXJSZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHNIQUFzSDtBQUN0SCw2REFBMEQ7QUFHMUQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQUZELDRCQUVDO0FBU0Q7SUFDSSxZQUFvQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0lBRXBDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNHLElBQUksQ0FBQyxRQUEwQjs7WUFDakMsSUFBSSxJQUFJLEdBQXFCLEVBQUUsQ0FBQztZQUNoQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUMvQjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNyQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNyQztZQUNELE9BQU8sTUFBTSxhQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5DLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0csWUFBWSxDQUFDLFFBQTZCOztZQUM1Qyx5Q0FBeUM7WUFDekMsSUFBSSxNQUFNLEdBQUcsTUFBTSxhQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELElBQUcsTUFBTSxFQUFDO2dCQUNOLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsSUFBSSxFQUFFLE1BQU07aUJBRWYsQ0FBQzthQUNMO2lCQUFJO2dCQUNELE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsZ0JBQWdCO29CQUNoQixHQUFHLEVBQUUsU0FBUztpQkFDakIsQ0FBQzthQUNMO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDRyxVQUFVLENBQUMsUUFBMkI7O1lBQ3hDLHlDQUF5QztZQUN6QyxJQUFJLE1BQU0sR0FBRyxNQUFNLGFBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxJQUFJLEVBQUUsTUFBTTtvQkFDWixHQUFHLEVBQUUsTUFBTTtpQkFDZCxDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxHQUFHLEVBQUUsT0FBTztpQkFDZixDQUFDO2FBQ0w7UUFFTCxDQUFDO0tBQUE7Q0FFSjtBQXhFRCx3QkF3RUMifQ==