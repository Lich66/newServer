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
// import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/handler/userInterface';
const club_1 = require("../../../controller/club/club");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
    }
    createClub(clubinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            // 这里以后添加很多判断
            if (!clubinfo.type) {
                return {
                    code: 400,
                    msg: '参数错误'
                };
            }
            let play_setting = 'JSON.stringify(room_1_1(clubinfo.clubConfig))';
            let result = yield club_1.Club.createClub(Object.assign({}, clubinfo, { play_setting, uid: Number.parseInt(session.uid, 0) }), session.get('usernick'));
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
    deleteClub(clubinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield club_1.Club.deleteClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
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
    updateClub(clubinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let njson = Object.assign({}, clubinfo);
            delete njson.clubid;
            delete njson.create_time;
            delete njson.uid;
            let result = yield club_1.Club.updateClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) }, njson);
            if (result) {
                return {
                    code: 200,
                    data: result
                    // msg: `${result[1]}`
                };
            }
            else {
                return {
                    code: 500
                };
            }
        });
    }
    getClub(clubinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield club_1.Club.getClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViL2hhbmRsZXIvY2x1YkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLG9IQUFvSDtBQUNwSCx3REFBcUQ7QUFJckQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELDRCQUVDO0FBRUQsTUFBYSxPQUFPO0lBQ2hCLFlBQTJCLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7SUFFM0MsQ0FBQztJQUVZLFVBQVUsQ0FBQyxRQUFzQixFQUFFLE9BQXVCOztZQUNuRSxhQUFhO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsR0FBRyxFQUFFLE1BQU07aUJBQ2QsQ0FBQzthQUNMO1lBQ0QsSUFBSSxZQUFZLEdBQUcsK0NBQStDLENBQUM7WUFDbkUsSUFBSSxNQUFNLEdBQUcsTUFBTSxXQUFJLENBQUMsVUFBVSxtQkFBTSxRQUFRLElBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pJLElBQUksTUFBTSxFQUFFO2dCQUNSLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsSUFBSSxFQUFFLE1BQU07aUJBQ2YsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7aUJBQ1osQ0FBQzthQUNMO1FBQ0wsQ0FBQztLQUFBO0lBQ1ksVUFBVSxDQUFDLFFBQXNCLEVBQUUsT0FBdUI7O1lBRW5FLElBQUksTUFBTSxHQUFHLE1BQU0sV0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RHLElBQUksTUFBTSxFQUFFO2dCQUNSLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsSUFBSSxFQUFFLE1BQU07aUJBQ2YsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7aUJBQ1osQ0FBQzthQUNMO1FBQ0wsQ0FBQztLQUFBO0lBRVksVUFBVSxDQUFDLFFBQXNCLEVBQUUsT0FBdUI7O1lBRW5FLElBQUksS0FBSyxxQkFBUSxRQUFRLENBQUUsQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDcEIsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQ3pCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUVqQixJQUFJLE1BQU0sR0FBRyxNQUFNLFdBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0csSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxJQUFJLEVBQUUsTUFBTTtvQkFDWixzQkFBc0I7aUJBQ3pCLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUM7YUFDTDtRQUNMLENBQUM7S0FBQTtJQUVZLE9BQU8sQ0FBQyxRQUFzQixFQUFFLE9BQXVCOztZQUVoRSxJQUFJLE1BQU0sR0FBRyxNQUFNLFdBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuRyxJQUFJLE1BQU0sRUFBRTtnQkFDUixPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO29CQUNULElBQUksRUFBRSxNQUFNO2lCQUNmLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUM7YUFDTDtRQUNMLENBQUM7S0FBQTtDQUNKO0FBNUVELDBCQTRFQyJ9