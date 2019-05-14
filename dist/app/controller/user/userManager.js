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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlck1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci91c2VyL3VzZXJNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNERBQXlEO0FBR3pEO0lBRUk7UUFEQSxhQUFRLEdBQWtDLEVBQUUsQ0FBQTtJQUc1QyxDQUFDO0lBQ0QsT0FBTyxDQUFDLEdBQVcsRUFBRSxLQUFtQjtRQUNwQyxJQUFJLElBQUksR0FBZSxJQUFJLHVCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUNELE9BQU8sQ0FBQyxHQUFXO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FJSjtBQWZELGtDQWVDIn0=