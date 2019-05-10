"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../sequelize/sequelize");
const login_1 = require("../controller/account/login");
setTimeout(() => {
    login_1.Login.login({ token: 'test' }).then((r) => { console.log(r); });
}, 3000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdExvZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3Rlc3QvdGVzdExvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQWdDO0FBQ2hDLHVEQUFvRDtBQUVwRCxVQUFVLENBQUMsR0FBRSxFQUFFO0lBQ1gsYUFBSyxDQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEdBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzNELENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyJ9