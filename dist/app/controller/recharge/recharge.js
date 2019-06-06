"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bullfight_Shop_1 = require("../../models/Bullfight_Shop");
const tbl_rechargelog_1 = require("../../models/tbl_rechargelog");
const tbl_user_1 = require("../../models/tbl_user");
const selfUtils_1 = require("../../util/selfUtils");
class Recharge {
    static async recharge(json) {
        // {uid:x},{diamond:9}
        // 模拟延迟
        const bool = await selfUtils_1.SelfUtils.timeout();
        if (bool) {
            // 假的 理论上都是从sdk获取
            const length = 24;
            const oderid = await selfUtils_1.SelfUtils.createHash(length);
            const rechargetime = new Date();
            const money = 328;
            const pf = 'pf';
            const data = await Bullfight_Shop_1.Bullfight_Shop.findOne({ where: { Money: money } });
            const diamond = data.Diamond;
            const extra = data.Extra;
            await tbl_rechargelog_1.tbl_rechargelog.create({
                oderid,
                userid: json.userid,
                money,
                diamond,
                extra,
                rechargetime,
                pf
            });
            let result = await tbl_user_1.tbl_user.update({ diamond: diamond + extra }, { where: { userid: json.userid } });
            return result[0];
        }
        else {
            return null;
        }
        // let result = await tbl_club.update(njson, { where: { ...ojson } });
    }
}
exports.Recharge = Recharge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjaGFyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9yZWNoYXJnZS9yZWNoYXJnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdFQUE2RDtBQUM3RCxrRUFBK0Q7QUFDL0Qsb0RBQWlEO0FBQ2pELG9EQUFpRDtBQUlqRCxNQUFhLFFBQVE7SUFFVixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFzQjtRQUMvQyxzQkFBc0I7UUFDdEIsT0FBTztRQUNQLE1BQU0sSUFBSSxHQUFHLE1BQU0scUJBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QyxJQUFJLElBQUksRUFBRTtZQUNOLGlCQUFpQjtZQUNqQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDbEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRCxNQUFNLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2hDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNsQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFFaEIsTUFBTSxJQUFJLEdBQUcsTUFBTSwrQkFBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdkUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUM3QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3pCLE1BQU0saUNBQWUsQ0FBQyxNQUFNLENBQWtCO2dCQUMxQyxNQUFNO2dCQUNOLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsS0FBSztnQkFDTCxPQUFPO2dCQUNQLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixFQUFFO2FBQ0wsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxNQUFNLEdBQUcsTUFBTSxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEdBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyRyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELHNFQUFzRTtJQUMxRSxDQUFDO0NBRUo7QUFuQ0QsNEJBbUNDIn0=