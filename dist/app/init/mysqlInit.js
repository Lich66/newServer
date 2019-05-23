"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../db/sequelize");
const tbl_account_1 = require("../models/tbl_account");
const tbl_user_1 = require("../models/tbl_user");
const testAccount = 500;
async function start() {
    await sequelize_1.sequelize.sync();
    for (let index = 0; index < testAccount; index++) {
        sequelize_1.sequelize.transaction(async (t) => {
            const account = await tbl_account_1.tbl_account.create({}, { transaction: t });
            const userModel = await tbl_user_1.tbl_user.create({ userid: account.uid }, { transaction: t });
        });
    }
}
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlzcWxJbml0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL2luaXQvbXlzcWxJbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0NBQTRDO0FBRzVDLHVEQUFvRDtBQUNwRCxpREFBOEM7QUFFOUMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3hCLEtBQUssVUFBVSxLQUFLO0lBQ2hCLE1BQU0scUJBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV2QixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzlDLHFCQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QixNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUFXLENBQUMsTUFBTSxDQUFlLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9FLE1BQU0sU0FBUyxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLENBQVksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEcsQ0FBQyxDQUFDLENBQUM7S0FDTjtBQUNMLENBQUM7QUFDRCxLQUFLLEVBQUUsQ0FBQyJ9