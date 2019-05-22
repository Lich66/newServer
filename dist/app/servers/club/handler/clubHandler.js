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
const user_1 = require("../../../controller/user/user");
const nameSpace_1 = require("../../../gameConfig/nameSpace");
const gameUitl_1 = require("../../../util/gameUitl");
function default_1(app) {
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
        this.channelService = app.get('channelService');
    }
    createClub(clubinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            // // 这里以后添加很多判断
            // if (!clubinfo.type) {
            //     return {
            //         code: 400,
            //         msg: '参数错误'
            //     };
            // }
            const json = yield gameUitl_1.GameUitl.parsePlayConfig(clubinfo.config);
            let result = yield club_1.Club.createClub(Object.assign({}, json, { uid: Number.parseInt(session.uid, 0) }));
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
            let njson = {};
            switch (clubinfo.type) {
                case 0:
                    njson = yield gameUitl_1.GameUitl.parsePlayConfig(clubinfo.play_config);
                    break;
                case 1:
                    njson = yield gameUitl_1.GameUitl.parseInfoConfig(clubinfo.info_config);
                    break;
                default:
                    return null;
            }
            let result = yield club_1.Club.updateClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) }, njson);
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
    getAllClub(clubinfo, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield club_1.Club.getAllClub({ uid: Number.parseInt(session.uid, 0) });
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
    leaveClub(obj, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = this.channelService.getChannel(`${nameSpace_1.redisKeyPrefix.club}${session.get('clubid')}`, false);
            const channelUser = channel.getMember(`${session.uid}`);
            if (channelUser) {
                channel.removeMember(`${session.uid}`);
            }
            // redisClient.getAsync
            const user = yield user_1.User.getUser({ userid: Number.parseInt(session.uid, 0) });
            channel.pushMessage(`${nameSpace_1.redisKeyPrefix.club}${session.get('clubid')}`, { user, action: 0 });
            session.set('roomid', null);
            session.push('roomid', () => {
            });
            session.set('clubid', null);
            session.push('clubid', () => {
            });
            return {
                code: 200
            };
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jbHViL2hhbmRsZXIvY2x1YkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLG9IQUFvSDtBQUNwSCx3REFBcUQ7QUFDckQsd0RBQXFEO0FBQ3JELDZEQUErRDtBQUUvRCxxREFBa0Q7QUFHbEQsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELDRCQUVDO0FBRUQsTUFBYSxPQUFPO0lBRWhCLFlBQTJCLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVZLFVBQVUsQ0FBQyxRQUE0QixFQUFFLE9BQXVCOztZQUN6RSxnQkFBZ0I7WUFDaEIsd0JBQXdCO1lBQ3hCLGVBQWU7WUFDZixxQkFBcUI7WUFDckIsc0JBQXNCO1lBQ3RCLFNBQVM7WUFDVCxJQUFJO1lBQ0osTUFBTSxJQUFJLEdBQWlCLE1BQU0sbUJBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNFLElBQUksTUFBTSxHQUFHLE1BQU0sV0FBSSxDQUFDLFVBQVUsbUJBQU0sSUFBSSxJQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUcsQ0FBQztZQUN0RixJQUFJLE1BQU0sRUFBRTtnQkFDUixPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO29CQUNULElBQUksRUFBRSxNQUFNO2lCQUNmLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxPQUFPO29CQUNILElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUM7YUFDTDtRQUNMLENB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