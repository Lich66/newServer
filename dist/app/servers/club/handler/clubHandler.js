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
const room_1 = require("../../../gameConfig/room");
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
            let play_setting = JSON.stringify(room_1.room_1_1(clubinfo.clubConfig));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViL2hhbmRsZXIvY2x1YkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLG9IQUFvSDtBQUNwSCx3REFBcUQ7QUFDckQsbURBQW9EO0FBSXBELG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFGRCw0QkFFQztBQUVEO0lBQ0ksWUFBMkIsR0FBZ0I7UUFBaEIsUUFBRyxHQUFILEdBQUcsQ0FBYTtJQUUzQyxDQUFDO0lBRVksVUFBVSxDQUFDLFFBQXNCLEVBQUUsT0FBdUI7O1lBQ25FLGFBQWE7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDaEIsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxHQUFHLEVBQUUsTUFBTTtpQkFDZCxDQUFDO2FBQ0w7WUFDRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLE1BQU0sR0FBRyxNQUFNLFdBQUksQ0FBQyxVQUFVLG1CQUFNLFFBQVEsSUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakksSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxJQUFJLEVBQUUsTUFBTTtpQkFDZixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztpQkFDWixDQUFDO2FBQ0w7UUFDTCxDQUFDO0tBQUE7SUFDWSxVQUFVLENBQUMsUUFBc0IsRUFBRSxPQUF1Qjs7WUFFbkUsSUFBSSxNQUFNLEdBQUcsTUFBTSxXQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEcsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztvQkFDVCxJQUFJLEVBQUUsTUFBTTtpQkFDZixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLEVBQUUsR0FBRztpQkFDWixDQUFDO2FBQ0w7UUFDTCxDQUFDO0tBQUE7SUFFWSxVQUFVLENBQUMsUUFBc0IsRUFBRSxPQUF1Qjs7WUFFbkUsSUFBSSxLQUFLLHFCQUFRLFFBQVEsQ0FBRSxDQUFDO1lBQzVCLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNwQixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDekIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBRWpCLElBQUksTUFBTSxHQUFHLE1BQU0sV0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3RyxJQUFJLE1BQU0sRUFBRTtnQkFDUixPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO29CQUNULElBQUksRUFBRSxNQUFNO29CQUNaLHNCQUFzQjtpQkFDekIsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7aUJBQ1osQ0FBQzthQUNMO1FBQ0wsQ0FBQztLQUFBO0lBRVksT0FBTyxDQUFDLFFBQXNCLEVBQUUsT0FBdUI7O1lBRWhFLElBQUksTUFBTSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25HLElBQUksTUFBTSxFQUFFO2dCQUNSLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsSUFBSSxFQUFFLE1BQU07aUJBQ2YsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7aUJBQ1osQ0FBQzthQUNMO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUE1RUQsMEJBNEVDIn0=