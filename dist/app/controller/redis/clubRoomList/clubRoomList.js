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
class ClubRoomList {
    static setClubRoomList(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_1.redisClient.rpushAsync(json.redisClubId, ...json.List);
        });
    }
    static getClubRoomList(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const MAXLENGTH = 20;
            return yield redis_1.redisClient.lrangeAsync(json.redisClubId, 0, MAXLENGTH);
        });
    }
}
exports.ClubRoomList = ClubRoomList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21MaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL2NvbnRyb2xsZXIvcmVkaXMvY2x1YlJvb21MaXN0L2NsdWJSb29tTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQWdEO0FBRWhELE1BQWEsWUFBWTtJQUNkLE1BQU0sQ0FBTyxlQUFlLENBQUMsSUFBNkM7O1lBQzdFLE9BQU8sTUFBTSxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hFLENBQUM7S0FBQTtJQUVNLE1BQU0sQ0FBTyxlQUFlLENBQUMsSUFBNkI7O1lBQzdELE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNyQixPQUFPLE1BQU0sbUJBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDekUsQ0FBQztLQUFBO0NBQ0o7QUFURCxvQ0FTQyJ9