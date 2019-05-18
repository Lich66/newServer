"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userMemory_1 = require("../../gameModels/userMemory");
class UserManager {
    constructor() {
        this.userList = {};
    }
    setUser(key, value) {
        let user = new userMemory_1.UserMemory(value);
        this.userList[key] = user;
    }
    getUser(key) {
        return this.userList[key.toString()];
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlck1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci91c2VyL3VzZXJNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNERBQXlEO0FBR3pELE1BQWEsV0FBVztJQUVwQjtRQURPLGFBQVEsR0FBa0MsRUFBRSxDQUFDO0lBR3BELENBQUM7SUFDTSxPQUFPLENBQUMsR0FBVyxFQUFFLEtBQW1CO1FBQzNDLElBQUksSUFBSSxHQUFlLElBQUksdUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBQ00sT0FBTyxDQUFDLEdBQVc7UUFDdEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FFSjtBQWJELGtDQWFDIn0=