"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../../db/redis");
class RedisKeys {
    static delAsync(key) {
        return redis_1.redisClient.delAsync(key);
    }
}
exports.RedisKeys = RedisKeys;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXNLZXlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL2NvbnRyb2xsZXIvcmVkaXMvcmVkaXNLZXlzL3JlZGlzS2V5cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFnRDtBQUVoRCxNQUFhLFNBQVM7SUFDWCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQVc7UUFDOUIsT0FBTyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUFKRCw4QkFJQyJ9