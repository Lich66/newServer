"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const tbl_clubuser_1 = require("../../models/tbl_clubuser");
const tbl_user_1 = require("../../models/tbl_user");
const Op = Sequelize.Op;
const MAXClubUser = 10;
const MAXCOMPETITIONClubUser = 30;
// const CHAIRSTR = 'chair_';
class ClubUser {
    static async findClubUser(json) {
        let result = await tbl_clubuser_1.tbl_clubuser.findOrCreate({ where: { clubid: json.clubid, userid: json.userid } });
        return result[0];
    }
    static async deleteClubUser(json) {
        return await tbl_clubuser_1.tbl_clubuser.destroy({ where: { clubid: json.clubid, userid: json.userid } });
    }
    static async updateClubUser(ojson, njson) {
        let result = await tbl_clubuser_1.tbl_clubuser.update(njson, { where: { clubid: ojson.clubid, userid: ojson.userid } });
        return result[1][0];
    }
    /**
     *
     * 获取某用户加入的所有茶楼
     */
    static async getAllClubUserbyUid(json) {
        return await tbl_clubuser_1.tbl_clubuser.findAll({ where: { userid: json.userid } });
    }
    /**
     *
     * 获取某茶楼加入的所有用户
     */
    static async getAllClubUserbyClubid(json) {
        return await tbl_clubuser_1.tbl_clubuser.findAll({
            where: { clubid: json.clubid }, include: [tbl_user_1.tbl_user]
        });
    }
}
exports.ClubUser = ClubUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlVzZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vYXBwL2NvbnRyb2xsZXIvY2x1YlVzZXJzL2NsdWJVc2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF1QztBQUd2Qyw0REFBeUQ7QUFDekQsb0RBQWlEO0FBR2pELE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDeEIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLE1BQU0sc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0FBRWxDLDZCQUE2QjtBQUU3QixNQUFhLFFBQVE7SUFDVixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFzQjtRQUNuRCxJQUFJLE1BQU0sR0FBRyxNQUFNLDJCQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEcsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQXNCO1FBQ3JELE9BQU8sTUFBTSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUF1QixFQUFFLEtBQXVCO1FBQy9FLElBQUksTUFBTSxHQUFHLE1BQU0sMkJBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekcsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBc0I7UUFDMUQsT0FBTyxNQUFNLDJCQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBc0I7UUFDN0QsT0FBTyxNQUFNLDJCQUFZLENBQUMsT0FBTyxDQUFDO1lBQzlCLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsbUJBQVEsQ0FBQztTQUN0RCxDQUFDLENBQUM7SUFDUCxDQUFDO0NBTUo7QUFqQ0QsNEJBaUNDIn0=