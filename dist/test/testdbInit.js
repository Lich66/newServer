"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../db/sequelize");
const tbl_account_1 = require("../models/tbl_account");
const tbl_user_1 = require("../models/tbl_user");
const testAccount = 500;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize_1.sequelize.sync({ force: true });
        for (let index = 0; index < testAccount; index++) {
            sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const account = yield tbl_account_1.tbl_account.create({}, { transaction: t });
                const userModel = yield tbl_user_1.tbl_user.create({ userid: account.uid }, { transaction: t });
            }));
        }
    });
}
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGRiSW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC90ZXN0L3Rlc3RkYkluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLCtDQUE0QztBQUc1Qyx1REFBb0Q7QUFDcEQsaURBQThDO0FBRTlDLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUN4QixTQUFlLEtBQUs7O1FBQ2hCLE1BQU0scUJBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV0QyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzlDLHFCQUFTLENBQUMsV0FBVyxDQUFDLENBQU8sQ0FBQyxFQUFFLEVBQUU7Z0JBQzlCLE1BQU0sT0FBTyxHQUFHLE1BQU0seUJBQVcsQ0FBQyxNQUFNLENBQWUsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQy9FLE1BQU0sU0FBUyxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLENBQVksRUFBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEcsQ0FBQyxDQUFBLENBQUMsQ0FBQztTQUVOO0lBQ0wsQ0FBQztDQUFBO0FBQ0QsS0FBSyxFQUFFLENBQUMifQ==