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
        yield sequelize_1.sequelize.sync();
        for (let index = 0; index < testAccount; index++) {
            sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const account = yield tbl_account_1.tbl_account.create({}, { transaction: t });
                const userModel = yield tbl_user_1.tbl_user.create({ userid: account.uid }, { transaction: t });
            }));
        }
    });
}
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlzcWxJbml0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL2luaXQvbXlzcWxJbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSwrQ0FBNEM7QUFHNUMsdURBQW9EO0FBQ3BELGlEQUE4QztBQUU5QyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDeEIsU0FBZSxLQUFLOztRQUNoQixNQUFNLHFCQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM5QyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFPLENBQUMsRUFBRSxFQUFFO2dCQUM5QixNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUFXLENBQUMsTUFBTSxDQUFlLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNLFNBQVMsR0FBRyxNQUFNLG1CQUFRLENBQUMsTUFBTSxDQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BHLENBQUMsQ0FBQSxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Q0FBQTtBQUNELEtBQUssRUFBRSxDQUFDIn0=