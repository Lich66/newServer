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
const tbl_room_1 = require("../../models/tbl_room");
// import { redisClient } from '../../db/redis';
// import { redisKeyPrefix } from '../../gameConfig/redisKeyPrefix';
class ClubRoom {
    // 实际上没这个方法 创建房间永远是和创建茶楼里面一起创建的
    static addClubRoom(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_room_1.tbl_room.create(json);
        });
    }
    // 实际上没这个方法 删除房间永远是和删除茶楼里面一起创建的
    static deleteClubRoom() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    // 好像房间也不能改
    static updateClubRoom(ojson, njson) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield tbl_room_1.tbl_room.update(njson, { where: { roomid: ojson.roomid, clubid: ojson.clubid } });
            // let club = ;
            return result[1][0];
        });
    }
    // 查不一定需要uid判断
    static getAllClubRoom(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_room_1.tbl_room.findAll({ where: { clubid: json.clubid } });
        });
    }
    static getClubRoom(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tbl_room_1.tbl_room.findOne({ where: { roomid: json.roomid } });
        });
    }
    static getAllClubRoomState(json) {
        return __awaiter(this, void 0, void 0, function* () {
            // const result: {
            //     list?: ITbl_room | any;
            //     state?: any[];
            //     member?: any[];
            // } = {
            //     list: [],
            //     state: []
            // };
            const roomarr = yield tbl_room_1.tbl_room.findAll({ where: { clubid: json.clubid } });
            // roomarr.forEach((element, index) => {
            //     const state = redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${element.roomid}`);
            // });
            // for (const iterator of roomarr) {
            //     const state = redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${json.clubid}`);
            //     iterator.state = state;
            // }
            return yield roomarr;
        });
    }
}
exports.ClubRoom = ClubRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9jbHViUm9vbS9jbHViUm9vbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0Esb0RBQWlEO0FBQ2pELGdEQUFnRDtBQUNoRCxvRUFBb0U7QUFFcEUsTUFBYSxRQUFRO0lBQ2pCLCtCQUErQjtJQUN4QixNQUFNLENBQU8sV0FBVyxDQUFDLElBQXNCOztZQUNsRCxPQUFPLE1BQU0sbUJBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQztLQUFBO0lBQ0QsK0JBQStCO0lBQ3hCLE1BQU0sQ0FBTyxjQUFjOztRQUVsQyxDQUFDO0tBQUE7SUFDRCxXQUFXO0lBQ0osTUFBTSxDQUFPLGNBQWMsQ0FBQyxLQUFvQixFQUFFLEtBQXVCOztZQUM1RSxJQUFJLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsTUFBTSxDQUFZLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hILGVBQWU7WUFDZixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFRCxjQUFjO0lBQ1AsTUFBTSxDQUFPLGNBQWMsQ0FBQyxJQUFzQjs7WUFDckQsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEUsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFdBQVcsQ0FBQyxJQUFzQjs7WUFDbEQsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEUsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLG1CQUFtQixDQUFDLElBQXNCOztZQUMxRCxrQkFBa0I7WUFDbEIsOEJBQThCO1lBQzlCLHFCQUFxQjtZQUNyQixzQkFBc0I7WUFDdEIsUUFBUTtZQUNSLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsS0FBSztZQUNMLE1BQU0sT0FBTyxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRSx3Q0FBd0M7WUFDeEMsNkZBQTZGO1lBRTdGLE1BQU07WUFDTixvQ0FBb0M7WUFDcEMsMEZBQTBGO1lBQzFGLDhCQUE4QjtZQUM5QixJQUFJO1lBQ0osT0FBTyxNQUFNLE9BQU8sQ0FBQztRQUN6QixDQUFDO0tBQUE7Q0FFSjtBQTVDRCw0QkE0Q0MifQ==