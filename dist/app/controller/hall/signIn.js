"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tbl_signIn_1 = require("../../models/tbl_signIn");
class SignIn {
    /**
     * 更新签到表
     * @param ojson 条件
     * @param njson 更新内容
     */
    static async updateSignInInfo(ojson, njson) {
        // {uid:x},{diamond:9}
        let result = await tbl_signIn_1.tbl_signIn.update(njson, { where: { userid: ojson.userId } });
        return result[0];
    }
    /**
     * 查找或新建签到表
     * @param json 条件
     */
    static async getSignInInfo(json) {
        let result = await tbl_signIn_1.tbl_signIn.findOrCreate({ where: { userid: json.userId } });
        return result;
    }
}
exports.SignIn = SignIn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbkluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vYXBwL2NvbnRyb2xsZXIvaGFsbC9zaWduSW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3REFBcUQ7QUFFckQsTUFBYSxNQUFNO0lBQ2Y7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBeUIsRUFBRSxLQUF1QztRQUNuRyxzQkFBc0I7UUFDdEIsSUFBSSxNQUFNLEdBQUcsTUFBTSx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBd0I7UUFDdEQsSUFBSSxNQUFNLEdBQUcsTUFBTSx1QkFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQW5CRCx3QkFtQkMifQ==