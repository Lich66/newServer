
import { IClubRoomCRUD, IClubRoomRequest } from '../../interface/clubRoom/clubRoomInterface';
import { ITbl_room } from '../../interface/models/tbl_room';
import { tbl_room } from '../../models/tbl_room';
// import { redisClient } from '../../db/redis';
// import { redisKeyPrefix } from '../../gameConfig/redisKeyPrefix';

export class ClubRoom {
    // 实际上没这个方法 创建房间永远是和创建茶楼里面一起创建的
    public static async addClubRoom(json: IClubRoomRequest): Promise<ITbl_room> {
        return await tbl_room.create(json);
    }
    // 实际上没这个方法 删除房间永远是和删除茶楼里面一起创建的
    public static async deleteClubRoom() {

    }
    // 好像房间也不能改
    public static async updateClubRoom(ojson: IClubRoomCRUD, njson: IClubRoomRequest): Promise<tbl_room> {
        let result = await tbl_room.update<tbl_room>(njson, { where: { roomid: ojson.roomid, clubid: ojson.clubid } });
        // let club = ;
        return result[1][0];
    }

    // 查不一定需要uid判断
    public static async getAllClubRoom(json: IClubRoomRequest): Promise<ITbl_room[]> {
        return await tbl_room.findAll({ where: { clubid: json.clubid } });
    }
    public static async getClubRoom(json: IClubRoomRequest): Promise<ITbl_room> {
        return await tbl_room.findOne({ where: { roomid: json.roomid } });
    }
    public static async getAllClubRoomState(json: IClubRoomRequest): Promise<ITbl_room[]> {
        // const result: {
        //     list?: ITbl_room | any;
        //     state?: any[];
        //     member?: any[];
        // } = {
        //     list: [],
        //     state: []
        // };
        const roomarr = await tbl_room.findAll({ where: { clubid: json.clubid } });
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
