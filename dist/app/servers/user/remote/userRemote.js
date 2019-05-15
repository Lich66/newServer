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
const login_1 = require("../../../controller/account/login");
function default_1(app) {
    return new Remote(app);
}
exports.default = default_1;
class Remote {
    constructor(app) {
        this.app = app;
    }
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
    accountLogin(userinfo) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(JSON.stringify(userinfo));
            return yield login_1.Login.accountLogin(userinfo);
        });
    }
    tokenLogin(userinfo) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(JSON.stringify(userinfo));
            return yield login_1.Login.tokenLogin(userinfo);
        });
    }
}
exports.Remote = Remote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL3VzZXIvcmVtb3RlL3VzZXJSZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLDZEQUEwRDtBQUcxRCxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRkQsNEJBRUM7QUFTRDtJQUNJLFlBQTJCLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7SUFFM0MsQ0FBQztJQUVZLElBQUksQ0FBQyxRQUEwQjs7WUFDeEMsSUFBSSxJQUFJLEdBQXFCLEVBQUUsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7WUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDL0I7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDckM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDckM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQyxPQUFPLE1BQU0sYUFBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuQyxDQUFDO0tBQUE7SUFHWSxZQUFZLENBQUMsUUFBNkI7O1lBQ25ELHlDQUF5QztZQUN6QyxPQUFPLE1BQU0sYUFBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU5QyxDQUFDO0tBQUE7SUFHWSxVQUFVLENBQUMsUUFBMkI7O1lBQy9DLHlDQUF5QztZQUN6QyxPQUFPLE1BQU0sYUFBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU1QyxDQUFDO0tBQUE7Q0FFSjtBQW5DRCx3QkFtQ0MifQ==