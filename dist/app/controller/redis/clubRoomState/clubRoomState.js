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
const redis_1 = require("../../../db/redis");
class ClubRoomState {
    static setClubRoomState(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_1.redisClient.hsetAsync(json.redisRoomId, `${json.chairIndex}`, `${json.state}`);
        });
    }
    static getClubRoomState(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_1.redisClient.hgetAsync(json.redisRoomId, `${json.chairIndex}`);
        });
    }
}
exports.ClubRoomState = ClubRoomState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21TdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9jb250cm9sbGVyL3JlZGlzL2NsdWJSb29tU3RhdGUvY2x1YlJvb21TdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQWdEO0FBRWhELE1BQWEsYUFBYTtJQUNmLE1BQU0sQ0FBTyxnQkFBZ0IsQ0FBQyxJQUFnRTs7WUFDakcsT0FBTyxNQUFNLG1CQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNoRyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sZ0JBQWdCLENBQUMsSUFBZ0U7O1lBQ2pHLE9BQU8sTUFBTSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDL0UsQ0FBQztLQUFBO0NBQ0o7QUFQRCxzQ0FPQyJ9