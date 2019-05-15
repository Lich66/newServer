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
            console.log('authauthauthauthauthauthauthauthauthauthauthauthauthauth');
            console.log(JSON.stringify(json));
            if (userinfo.token) {
                json.token = userinfo.token;
            }
            else if (userinfo.wxopenid) {
                json.wxopenid = userinfo.wxopenid;
            }
            else if (userinfo.xlopenid) {
                json.xlopenid = userinfo.xlopenid;
            }
            console.log(JSON.stringify(json));
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
            return yield login_1.Login.accountLogin(userinfo);
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
            return yield login_1.Login.tokenLogin(userinfo);
        });
    }
}
exports.Remote = Remote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL3VzZXIvcmVtb3RlL3VzZXJSZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHNIQUFzSDtBQUN0SCw2REFBMEQ7QUFHMUQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQUZELDRCQUVDO0FBU0Q7SUFDSSxZQUFvQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0lBRXBDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNHLElBQUksQ0FBQyxRQUEwQjs7WUFDakMsSUFBSSxJQUFJLEdBQXFCLEVBQUUsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxDQUFDLENBQUE7WUFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDakMsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDL0I7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDckM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDckM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNqQyxPQUFPLE1BQU0sYUFBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuQyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNHLFlBQVksQ0FBQyxRQUE2Qjs7WUFDNUMseUNBQXlDO1lBQ3pDLE9BQVEsTUFBTSxhQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRS9DLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0csVUFBVSxDQUFDLFFBQTJCOztZQUN4Qyx5Q0FBeUM7WUFDekMsT0FBTyxNQUFNLGFBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUMsQ0FBQztLQUFBO0NBRUo7QUFuREQsd0JBbURDIn0=