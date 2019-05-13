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
            let result = yield club_1.Club.createClub(Object.assign({}, clubinfo, { play_setting, uid: session.uid }));
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
            let result = yield club_1.Club.deleteClub({ houseid: clubinfo.houseid, uid: session.uid });
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
            let result = yield club_1.Club.updateClub(Object.assign({}, clubinfo, { uid: session.uid }), { uid: session.uid, houseid: clubinfo.houseid });
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
    /**
     * club  create
     *
     * @param  {Object}   clubinfo     request message
     * @return {object}
     */
    getClub(clubinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield club_1.Club.getClub({ uid: session.uid });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViL2hhbmRsZXIvY2x1YkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLHdEQUFxRDtBQUNyRCxtREFBb0Q7QUFHcEQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELDRCQUVDO0FBRUQ7SUFDSSxZQUFvQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0lBRXBDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNHLFVBQVUsQ0FBQyxRQUFzQixFQUFFLE9BQXVCOztZQUM1RCxhQUFhO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsR0FBRyxFQUFFLE1BQU07aUJBQ2QsQ0FBQTthQUNKO1lBQ0QsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakUsSUFBSSxNQUFNLEdBQUcsTUFBTSxXQUFJLENBQUMsVUFBVSxtQkFBTSxRQUFRLElBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFHLENBQUM7WUFDcEYsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxJQUFJLEVBQUUsTUFBTTtpQkFFZixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxnQkFBZ0I7b0JBQ2hCLEdBQUcsRUFBRSxNQUFNO2lCQUNkLENBQUM7YUFDTDtRQUNMLENBQUM7S0FBQTtJQUNLLFVBQVUsQ0FBQyxRQUFzQixFQUFFLE9BQXVCOztZQUU1RCxJQUFJLE1BQU0sR0FBRyxNQUFNLFdBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDcEYsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxJQUFJLEVBQUUsTUFBTTtpQkFFZixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxnQkFBZ0I7b0JBQ2hCLEdBQUcsRUFBRSxNQUFNO2lCQUNkLENBQUM7YUFDTDtRQUNMLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxRQUFzQixFQUFFLE9BQXVCOztZQUU1RCxJQUFJLE1BQU0sR0FBRyxNQUFNLFdBQUksQ0FBQyxVQUFVLG1CQUFNLFFBQVEsSUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsS0FBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN2SCxJQUFJLE1BQU0sRUFBRTtnQkFDUixPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO29CQUNULElBQUksRUFBRSxNQUFNO2lCQUVmLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO29CQUNULGdCQUFnQjtvQkFDaEIsR0FBRyxFQUFFLE1BQU07aUJBQ2QsQ0FBQzthQUNMO1FBQ0wsQ0FBQztLQUFBO0lBR0Q7Ozs7O09BS0c7SUFDRyxPQUFPLENBQUMsUUFBc0IsRUFBRSxPQUF1Qjs7WUFFekQsSUFBSSxNQUFNLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELElBQUksTUFBTSxFQUFFO2dCQUNSLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsSUFBSSxFQUFFLE1BQU07aUJBRWYsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsZ0JBQWdCO29CQUNoQixHQUFHLEVBQUUsTUFBTTtpQkFDZCxDQUFDO2FBQ0w7UUFDTCxDQUFDO0tBQUE7Q0FHSjtBQWpHRCwwQkFpR0MifQ==