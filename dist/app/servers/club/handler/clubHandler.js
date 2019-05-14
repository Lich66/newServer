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
const club_1 = require("../../../controller/club/club");
const room_1 = require("../../../gameConfig/room");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
    }
    /**
     * club  create
     *
     * @param  {Object}   clubinfo     request message
     * @return {object}
     */
    createClub(clubinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            // 这里以后添加很多判断
            if (!clubinfo.type) {
                return {
                    code: 400,
                    msg: '参数错误'
                };
            }
            let play_setting = JSON.stringify(room_1.room_1_1(clubinfo.clubConfig));
            let result = yield club_1.Club.createClub(Object.assign({}, clubinfo, { play_setting, uid: Number.parseInt(session.uid) }), session.get('usernick'));
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
    deleteClub(clubinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield club_1.Club.deleteClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid) });
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
    updateClub(clubinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let njson = Object.assign({}, clubinfo);
            delete njson.clubid;
            delete njson.create_time;
            delete njson.uid;
            let result = yield club_1.Club.updateClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid) }, njson);
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
     * club  create
     *
     * @param  {Object}   clubinfo     request message
     * @return {object}
     */
    getClub(clubinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield club_1.Club.getClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid) });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViL2hhbmRsZXIvY2x1YkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLHdEQUFxRDtBQUNyRCxtREFBb0Q7QUFHcEQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELDRCQUVDO0FBRUQ7SUFDSSxZQUFvQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0lBRXBDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNHLFVBQVUsQ0FBQyxRQUFzQixFQUFFLE9BQXVCOztZQUM1RCxhQUFhO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsR0FBRyxFQUFFLE1BQU07aUJBQ2QsQ0FBQTthQUNKO1lBQ0QsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakUsSUFBSSxNQUFNLEdBQUcsTUFBTSxXQUFJLENBQUMsVUFBVSxtQkFBTSxRQUFRLElBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDN0gsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxJQUFJLEVBQUUsTUFBTTtpQkFFZixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxnQkFBZ0I7b0JBQ2hCLEdBQUcsRUFBRSxNQUFNO2lCQUNkLENBQUM7YUFDTDtRQUNMLENBQUM7S0FBQTtJQUNLLFVBQVUsQ0FBQyxRQUFzQixFQUFFLE9BQXVCOztZQUU1RCxJQUFJLE1BQU0sR0FBRyxNQUFNLFdBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25HLElBQUksTUFBTSxFQUFFO2dCQUNSLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsSUFBSSxFQUFFLE1BQU07aUJBRWYsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsZ0JBQWdCO29CQUNoQixHQUFHLEVBQUUsTUFBTTtpQkFDZCxDQUFDO2FBQ0w7UUFDTCxDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsUUFBc0IsRUFBRSxPQUF1Qjs7WUFFNUQsSUFBSSxLQUFLLHFCQUFPLFFBQVEsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQTtZQUNuQixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUE7WUFDeEIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFBO1lBRWhCLElBQUksTUFBTSxHQUFHLE1BQU0sV0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pHLElBQUksTUFBTSxFQUFFO2dCQUNSLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsSUFBSSxFQUFFLE1BQU07b0JBQ1osc0JBQXNCO2lCQUN6QixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxnQkFBZ0I7b0JBQ2hCLEdBQUcsRUFBRSxNQUFNO2lCQUNkLENBQUM7YUFDTDtRQUNMLENBQUM7S0FBQTtJQUdEOzs7OztPQUtHO0lBQ0csT0FBTyxDQUFDLFFBQXNCLEVBQUUsT0FBdUI7O1lBRXpELElBQUksTUFBTSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUYsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxJQUFJLEVBQUUsTUFBTTtpQkFFZixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxnQkFBZ0I7b0JBQ2hCLEdBQUcsRUFBRSxNQUFNO2lCQUNkLENBQUM7YUFDTDtRQUNMLENBQUM7S0FBQTtDQUdKO0FBdEdELDBCQXNHQyJ9