"use strict";
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
    async auth(userinfo) {
        return await login_1.Login.login(userinfo);
    }
    async accountLogin(userinfo) {
        // console.log(JSON.stringify(userinfo));
        return await login_1.Login.accountLogin(userinfo);
    }
    async tokenLogin(userinfo) {
        // console.log(JSON.stringify(userinfo));
        return await login_1.Login.tokenLogin(userinfo);
    }
}
exports.Remote = Remote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL3VzZXIvcmVtb3RlL3VzZXJSZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2REFBMEQ7QUFHMUQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQUZELDRCQUVDO0FBU0QsTUFBYSxNQUFNO0lBQ2YsWUFBMkIsR0FBZ0I7UUFBaEIsUUFBRyxHQUFILEdBQUcsQ0FBYTtJQUUzQyxDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FBQyxRQUEwQjtRQUN4QyxPQUFPLE1BQU0sYUFBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV2QyxDQUFDO0lBR00sS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUE2QjtRQUNuRCx5Q0FBeUM7UUFDekMsT0FBTyxNQUFNLGFBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFOUMsQ0FBQztJQUdNLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBMkI7UUFDL0MseUNBQXlDO1FBQ3pDLE9BQU8sTUFBTSxhQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTVDLENBQUM7Q0FFSjtBQXhCRCx3QkF3QkMifQ==