import { Application, BackendSession } from 'pinus';
import { ClubRoom } from '../../../controller/clubRoom/clubRoom';
import { IClubRoomRequest, IClubRoomReturn } from '../../../interface/clubRoom/handler/clubRoomInterfaces';


export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    public constructor(private app: Application) {

    }

    public async createClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {
        return null;
    }

    // 假的 删除的时候解散茶楼 就都删了
    public async deleteClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {

        return null;
    }

    public async updateClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {

        let njson = { ...ClubRoominfo };
        delete njson.roomid;
        delete njson.create_time;
        delete njson.clubid;
        delete njson.owner;

        let result = await ClubRoom.updateClubRoom({ roomid: ClubRoominfo.roomid, clubid: ClubRoominfo.roomid }, njson);
        if (result) {
            return {
                code: 200,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async getClubRoom(ClubRoominfo: IClubRoomRequest, session: BackendSession): Promise<IClubRoomReturn> {

        let result = await ClubRoom.getClubRoom({ clubid: ClubRoominfo.clubid });
        if (result) {
            return {
                code: 200,
                data: result
            };
        } else {
            return {
                code: 500
            };
        }
    }
}
