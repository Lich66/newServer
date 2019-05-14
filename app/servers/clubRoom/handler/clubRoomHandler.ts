import { Application, BackendSession } from 'pinus';
import { IClubRoomRequest, IClubRoomReturn } from '../../../interface/clubRoom/handler/clubRoomInterfaces';
import { ClubRoom } from '../../../controller/clubRoom/clubRoom';

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {

    }

    /**
     * ClubRoom  create 假的 所有的创建都已经在创建club的时候创建了
     *
     * @param  {Object}   ClubRoominfo     request message
     * @return {object}
     */
    async createClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {
        return null
    }

    // 假的 删除的时候解散茶楼 就都删了
    async deleteClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {

        return null;
    }

    async updateClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {

        let njson = { ...ClubRoominfo };
        delete njson.roomid
        delete njson.create_time
        delete njson.clubid
        delete njson.owner

        let result = await ClubRoom.updateClubRoom({ roomid: ClubRoominfo.roomid, clubid: ClubRoominfo.roomid }, njson);
        if (result) {
            return {
                code: 200,
                data: result
                // msg: `${result[1]}`
            };
        } else {
            return {
                code: 500,
                // data: result,
                msg: `服务错了`
            };
        }
    }


    /**
     * ClubRoom  create
     *
     * @param  {Object}   ClubRoominfo     request message
     * @return {object}
     */
    async getClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {

        let result = await ClubRoom.getClubRoom({ clubid: ClubRoominfo.clubid });
        if (result) {
            return {
                code: 200,
                data: result,
                // msg: `${result[1]}`
            };
        } else {
            return {
                code: 500,
                // data: result,
                msg: `服务错了`
            };
        }
    }


}