"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserMemory {
    constructor(userInfo) {
        // 玩家创建的房间id列表
        this.roomlist = [];
        this.userid = userInfo.userid;
        this.usernick = userInfo.usernick;
        this.image = userInfo.image;
        this.regtime = userInfo.regtime;
        this.diamond = userInfo.diamond;
        this.region = userInfo.region;
        this.ip = userInfo.ip;
        this.sex = userInfo.sex;
        this.invite_code = userInfo.invite_code;
        this.inviter = userInfo.inviter;
        this.logintime = userInfo.logintime;
    }
}
exports.UserMemory = UserMemory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlck1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9nYW1lTW9kZWxzL3VzZXJNZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFhLFVBQVU7SUEwQm5CLFlBQW1CLFFBQXNCO1FBSHpDLGNBQWM7UUFDUCxhQUFRLEdBQWEsRUFBRSxDQUFDO1FBRzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzlCLElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDeEMsQ0FBQztDQUNKO0FBdkNELGdDQXVDQyJ9