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
    /**
     * ClubRoom  create 假的 所有的创建都已经在创建club的时候创建了
     *
     * @param  {Object}   ClubRoominfo     request message
     * @return {object}
     */
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
            let result = yield clubRoom_1.ClubRoom.updateClubRoom({ roomid: ClubRoominfo.roomid, clubid: ClubRoominfo.roomid }, njson);
            if (result) {
                return {
                    code: 200,
                    data: result
                    // msg: `${result[1]}`
                };
            }
            else {
                return {
                    code: 500,
                    // data: result,
                    msg: `服务错了`
                };
            }
        });
    }
    /**
     * ClubRoom  create
     *
     * @param  {Object}   ClubRoominfo     request message
     * @return {object}
     */
    getClubRoom(ClubRoominfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield clubRoom_1.ClubRoom.getClubRoom({ clubid: ClubRoominfo.clubid });
            if (result) {
                return {
                    code: 200,
                    data: result,
                };
            }
            else {
                return {
                    code: 500,
                    // data: result,
                    msg: `服务错了`
                };
            }
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb21IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY2x1YlJvb20vaGFuZGxlci9jbHViUm9vbUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLG9FQUFpRTtBQUVqRSxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRDtJQUNJLFlBQW9CLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7SUFFcEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0csY0FBYyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7O1lBQ3hFLE9BQU8sSUFBSSxDQUFBO1FBQ2YsQ0FBQztLQUFBO0lBRUQsb0JBQW9CO0lBQ2QsY0FBYyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7O1lBRXhFLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxZQUE4QixFQUFFLE9BQXVCOztZQUV4RSxJQUFJLEtBQUsscUJBQVEsWUFBWSxDQUFFLENBQUM7WUFDaEMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFBO1lBQ25CLE9BQU8sS0FBSyxDQUFDLFdBQVcsQ0FBQTtZQUN4QixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUE7WUFDbkIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBRWxCLElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hILElBQUksTUFBTSxFQUFFO2dCQUNSLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsSUFBSSxFQUFFLE1BQU07b0JBQ1osc0JBQXNCO2lCQUN6QixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxnQkFBZ0I7b0JBQ2hCLEdBQUcsRUFBRSxNQUFNO2lCQUNkLENBQUM7YUFDTDtRQUNMLENBQUM7S0FBQTtJQUdEOzs7OztPQUtHO0lBQ0csV0FBVyxDQUFDLFlBQThCLEVBQUUsT0FBdUI7O1lBRXJFLElBQUksTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDekUsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxJQUFJLEVBQUUsTUFBTTtpQkFFZixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxnQkFBZ0I7b0JBQ2hCLEdBQUcsRUFBRSxNQUFNO2lCQUNkLENBQUM7YUFDTDtRQUNMLENBQUM7S0FBQTtDQUdKO0FBdkVELDBCQXVFQyJ9