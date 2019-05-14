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
const tbl_user_1 = require("../models/tbl_user");
const tbl_account_1 = require("../models/tbl_account");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize_1.sequelize.sync({ force: true });
        for (let index = 0; index < 500; index++) {
            sequelize_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const account = yield tbl_account_1.tbl_account.create({}, { transaction: t });
                const userModel = yield tbl_user_1.tbl_user.create({ userid: account.uid }, { transaction: t });
            }));
        }
    });
}
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlzcWxJbml0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL2luaXQvbXlzcWxJbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSwrQ0FBMkM7QUFDM0MsaURBQThDO0FBRTlDLHVEQUFvRDtBQUdwRDs7UUFDSSxNQUFNLHFCQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFdEMsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN0QyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFPLENBQUMsRUFBRSxFQUFFO2dCQUM5QixNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUFXLENBQUMsTUFBTSxDQUFlLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNLFNBQVMsR0FBRyxNQUFNLG1CQUFRLENBQUMsTUFBTSxDQUFZLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2pHLENBQUMsQ0FBQSxDQUFDLENBQUE7U0FFTDtJQUNMLENBQUM7Q0FBQTtBQUNELEtBQUssRUFBRSxDQUFDIn0=