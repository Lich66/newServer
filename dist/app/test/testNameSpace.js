"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../db/redis");
const nameSpace_1 = require("../gameConfig/nameSpace");
async function hello() {
    let result = await redis_1.redisClient.get(`${nameSpace_1.redisKeyPrefix.userRoomList}${'501'}`);
    console.log(result);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdE5hbWVTcGFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC90ZXN0L3Rlc3ROYW1lU3BhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBMEM7QUFDMUMsdURBQXlEO0FBRXpELEtBQUssVUFBVSxLQUFLO0lBQ2hCLElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRywwQkFBYyxDQUFDLFlBQVksR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEIsQ0FBQyJ9