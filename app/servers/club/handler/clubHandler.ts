import { Application, BackendSession } from 'pinus';
// import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/handler/userInterface';
import { Club } from '../../../controller/club/club';
import { IClubRequest, IClubReturn } from '../../../interface/club/handler/clubInterface';


export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    public constructor(private app: Application) {

    }

    public async createClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {
        // 这里以后添加很多判断
        if (!clubinfo.type) {
            return {
                code: 400,
                msg: '参数错误'
            };
        }
        let play_setting = 'JSON.stringify(room_1_1(clubinfo.clubConfig))';
        let result = await Club.createClub({ ...clubinfo, play_setting, uid: Number.parseInt(session.uid, 0) }, session.get('usernick'));
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
    public async deleteClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        let result = await Club.deleteClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
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

    public async updateClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        let njson = { ...clubinfo };
        delete njson.clubid;
        delete njson.create_time;
        delete njson.uid;

        let result = await Club.updateClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) }, njson);
        if (result) {
            return {
                code: 200,
                data: result
                // msg: `${result[1]}`
            };
        } else {
            return {
                code: 500
            };
        }
    }

    public async getClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        let result = await Club.getClub({ clubid: clubinfo.clubid, uid: Number.parseInt(session.uid, 0) });
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

    public async getAllClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        let result = await Club.getAllClub({ uid: Number.parseInt(session.uid, 0) });
        if (result.length > 0) {
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
