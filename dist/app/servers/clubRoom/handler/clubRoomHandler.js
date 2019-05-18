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
const clubRoom_1 = require("../../../controller/clubRoom/clubRoom");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
    }
    createClubRoom(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    // 假的 删除的时候解散茶楼 就都删了
    deleteClubRoom(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    updateClubRoom(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let njson = Object.assign({}, ClubRoominfo);
            delete njson.roomid;
            delete njson.create_time;
            delete njson.clubid;
            delete njson.owner;
            let result = yield clubRoom_1.ClubRoom.updateClubRoom({ roomid: ClubRoominfo.roomid, clubid: ClubRoominfo.roomid, uid: session.uid }, njson);
            if (result) {
                return {
                    code: 200,
                    data: result
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
    getClubRoom(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield clubRoom_1.ClubRoom.getClubRoom({ clubid: ClubRoominfo.clubid, uid: session.uid });
            if (result) {
                return {
                    code: 200,
                    data: result
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
    getAllClubRoom(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield clubRoom_1.ClubRoom.getAllClubRoom({ clubid: ClubRoominfo.clubid, uid: session.uid });
            if (result) {
                return {
                    code: 200,
                    data: result
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY2x1YlJvb20vaGFuZGxlci9jbHViUm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLG9FQUFpRTtBQUlqRSxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRCxNQUFhLE9BQU87SUFDaEIsWUFBMkIsR0FBZ0I7UUFBaEIsUUFBRyxHQUFILEdBQUcsQ0FBYTtJQUUzQyxDQUFDO0lBRVksY0FBYyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7O1lBQy9FLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVELG9CQUFvQjtJQUNQLGNBQWMsQ0FBQyxZQUE4QixFQUFFLE9BQXVCOztZQUUvRSxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFWSxjQUFjLENBQUMsWUFBOEIsRUFBRSxPQUF1Qjs7WUFFL0UsSUFBSSxLQUFLLHFCQUFRLFlBQVksQ0FBRSxDQUFDO1lBQ2hDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNwQixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDekIsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ3BCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztZQUVuQixJQUFJLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsSSxJQUFJLE1BQU0sRUFBRTtnQkFDUixPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO29CQUNULElBQUksRUFBRSxNQUFNO2lCQUNmLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUM7YUFDTDtRQUNMLENBQUM7S0FBQTtJQUVZLFdBQVcsQ0FBQyxZQUE4QixFQUFFLE9BQXVCOztZQUU1RSxJQUFJLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzNGLElBQUksTUFBTSxFQUFFO2dCQUNSLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsSUFBSSxFQUFFLE1BQU07aUJBQ2YsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7aUJBQ1osQ0FBQzthQUNMO1FBQ0wsQ0FBQztLQUFBO0lBRVksY0FBYyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7O1lBRS9FLElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDOUYsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxJQUFJLEVBQUUsTUFBTTtpQkFDZixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztpQkFDWixDQUFDO2FBQ0w7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQWpFRCwwQkFpRUMifQ==