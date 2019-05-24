"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tbl_room_1 = require("../../models/tbl_room");
// import { redisClient } from '../../db/redis';
// import { redisKeyPrefix } from '../../gameConfig/redisKeyPrefix';
class ClubRoom {
    // 实际上没这个方法 创建房间永远是和创建茶楼里面一起创建的
    static async addClubRoom(json) {
        return await tbl_room_1.tbl_room.create(json);
    }
    // 实际上没这个方法 删除房间永远是和删除茶楼里面一起创建的
    static async deleteClubRoom() {
    }
    // 好像房间也不能改
    static async updateClubRoom(ojson, njson) {
        let result = await tbl_room_1.tbl_room.update(njson, { where: { roomid: ojson.roomid, clubid: ojson.clubid } });
        // let club = ;
        return result[1][0];
    }
    // 查不一定需要uid判断
    static async getAllClubRoom(json) {
        return await tbl_room_1.tbl_room.findAll({ where: { clubid: json.clubid } });
    }
    static async getClubRoom(json) {
        return await tbl_room_1.tbl_room.findOne({ where: { roomid: json.roomid } });
    }
    static async getAllClubRoomState(json) {
        // const result: {
        //     list?: ITbl_room | any;
        //     state?: any[];
        //     member?: any[];
        // } = {
        //     list: [],
        //     state: []
        // };
        const roomarr = await tbl_room_1.tbl_room.findAll({ where: { clubid: json.clubid } });
        // roomarr.forEach((element, index) => {
        //     const state = redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${element.roomid}`);
        // });
        // for (const iterator of roomarr) {
        //     const state = redisClient.hgetallAsync(`${redisKeyPrefix.clubRoom}${json.clubid}`);
        //     iterator.state = state;
        // }
        return await roomarr;
    }
}
exports.ClubRoom = ClubRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1YlJvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcHAvY29udHJvbGxlci9jbHViUm9vbS9jbHViUm9vbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLG9EQUFpRDtBQUNqRCxnREFBZ0Q7QUFDaEQsb0VBQW9FO0FBRXBFLE1BQWEsUUFBUTtJQUNqQiwrQkFBK0I7SUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBc0I7UUFDbEQsT0FBTyxNQUFNLG1CQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCwrQkFBK0I7SUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjO0lBRWxDLENBQUM7SUFDRCxXQUFXO0lBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBb0IsRUFBRSxLQUF1QjtRQUM1RSxJQUFJLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsTUFBTSxDQUFZLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hILGVBQWU7UUFDZixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsY0FBYztJQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQXNCO1FBQ3JELE9BQU8sTUFBTSxtQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFzQjtRQUNsRCxPQUFPLE1BQU0sbUJBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBQ00sTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFzQjtRQUMxRCxrQkFBa0I7UUFDbEIsOEJBQThCO1FBQzlCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsUUFBUTtRQUNSLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsS0FBSztRQUNMLE1BQU0sT0FBTyxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzRSx3Q0FBd0M7UUFDeEMsNkZBQTZGO1FBRTdGLE1BQU07UUFDTixvQ0FBb0M7UUFDcEMsMEZBQTBGO1FBQzFGLDhCQUE4QjtRQUM5QixJQUFJO1FBQ0osT0FBTyxNQUFNLE9BQU8sQ0FBQztJQUN6QixDQUFDO0NBRUo7QUE1Q0QsNEJBNENDIn0=