"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tbl_user_1 = require("../../models/tbl_user");
class User {
    // 实际上没这个方法 创建用户永远是和account里面一起创建的
    static async addUser(json) {
        return await tbl_user_1.tbl_user.create(json);
    }
    static async deleteUser() {
    }
    static async updateUser(ojson, njson) {
        // {uid:x},{diamond:9}
        let result = await tbl_user_1.tbl_user.update(njson, { where: { userid: ojson.userid } });
        return result[0];
        // let result = await tbl_club.update(njson, { where: { ...ojson } });
    }
    static async getUser(json) {
        return await tbl_user_1.tbl_user.findOne({ where: { userid: json.userid } });
    }
}
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL3VzZXIvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLG9EQUFpRDtBQUNqRCxNQUFhLElBQUk7SUFDYixrQ0FBa0M7SUFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBa0I7UUFDMUMsT0FBTyxNQUFNLG1CQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVU7SUFFOUIsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQW1CLEVBQUUsS0FBbUI7UUFDbkUsc0JBQXNCO1FBQ3RCLElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0UsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsc0VBQXNFO0lBQzFFLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFrQjtRQUMxQyxPQUFPLE1BQU0sbUJBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0o7QUFqQkQsb0JBaUJDIn0=