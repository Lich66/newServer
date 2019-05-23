"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const redis_1 = require("../db/redis");
const Bullfight_BaseDB_1 = require("../models/Bullfight_BaseDB");
const memoryConfig_1 = require("./memoryConfig");
// const Op = Sequelize.Op;
const Op = Sequelize.Op;
async function baseInit() {
    const data = await Bullfight_BaseDB_1.Bullfight_BaseDB.findAll({
        where: {
            index: {
                [Op.regexp]: '\.'
            }
        }
    });
    const basearr = data;
    for (const iterator of basearr) {
        await redis_1.redisClient.hsetAsync(memoryConfig_1.memory.base, iterator.Key, iterator.Value);
    }
}
exports.baseInit = baseInit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5SW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC91dGlsL21lbW9yeUluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBdUM7QUFFdkMsdUNBQTBDO0FBQzFDLGlFQUE4RDtBQUM5RCxpREFBd0M7QUFDeEMsMkJBQTJCO0FBQzNCLE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDakIsS0FBSyxVQUFVLFFBQVE7SUFDMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxtQ0FBZ0IsQ0FBQyxPQUFPLENBQUM7UUFDeEMsS0FBSyxFQUFFO1lBQ0gsS0FBSyxFQUFFO2dCQUNILENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUk7YUFDcEI7U0FDSjtLQUNKLENBQUMsQ0FBQztJQUNILE1BQU0sT0FBTyxHQUFrRSxJQUFJLENBQUM7SUFFcEYsS0FBSyxNQUFNLFFBQVEsSUFBSSxPQUFPLEVBQUU7UUFDN0IsTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxxQkFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6RTtBQUNMLENBQUM7QUFiRCw0QkFhQyJ9