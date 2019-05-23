"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../db/sequelize");
const tbl_account_1 = require("../models/tbl_account");
const tbl_user_1 = require("../models/tbl_user");
const testAccount = 500;
async function start() {
    await sequelize_1.sequelize.sync({ force: true });
    for (let index = 0; index < testAccount; index++) {
        sequelize_1.sequelize.transaction(async (t) => {
            const account = await tbl_account_1.tbl_account.create({}, { transaction: t });
            const userModel = await tbl_user_1.tbl_user.create({ userid: account.uid }, { transaction: t });
        });
    }
}
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGRiSW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC90ZXN0L3Rlc3RkYkluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwrQ0FBNEM7QUFHNUMsdURBQW9EO0FBQ3BELGlEQUE4QztBQUU5QyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDeEIsS0FBSyxVQUFVLEtBQUs7SUFDaEIsTUFBTSxxQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRXRDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDOUMscUJBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlCLE1BQU0sT0FBTyxHQUFHLE1BQU0seUJBQVcsQ0FBQyxNQUFNLENBQWUsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0UsTUFBTSxTQUFTLEdBQUcsTUFBTSxtQkFBUSxDQUFDLE1BQU0sQ0FBWSxFQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRyxDQUFDLENBQUMsQ0FBQztLQUVOO0FBQ0wsQ0FBQztBQUNELEtBQUssRUFBRSxDQUFDIn0=