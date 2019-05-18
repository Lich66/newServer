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
const Sequelize = require("sequelize");
const redis_1 = require("../db/redis");
const Bullfight_BaseDB_1 = require("../models/Bullfight_BaseDB");
const memoryConfig_1 = require("./memoryConfig");
// const Op = Sequelize.Op;
const Op = Sequelize.Op;
function baseInit() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield Bullfight_BaseDB_1.Bullfight_BaseDB.findAll({
            where: {
                index: {
                    [Op.regexp]: '\.'
                }
            }
        });
        const base = data[0];
        for (const key in base) {
            if (base.hasOwnProperty(key)) {
                redis_1.redisClient.hsetAsync(memoryConfig_1.memory.base, key, base[key]);
            }
        }
    });
}
exports.baseInit = baseInit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5SW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC91dGlsL21lbW9yeUluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVDQUF1QztBQUV2Qyx1Q0FBMEM7QUFDMUMsaUVBQThEO0FBQzlELGlEQUF3QztBQUN4QywyQkFBMkI7QUFDM0IsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztBQUN4QixTQUFzQixRQUFROztRQUMxQixNQUFNLElBQUksR0FBRyxNQUFNLG1DQUFnQixDQUFDLE9BQU8sQ0FBQztZQUN4QyxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFO29CQUNILENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUk7aUJBQ3BCO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBNEYsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlHLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ3BCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDMUIsbUJBQVcsQ0FBQyxTQUFTLENBQUMscUJBQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3REO1NBQ0o7SUFDTCxDQUFDO0NBQUE7QUFkRCw0QkFjQyJ9