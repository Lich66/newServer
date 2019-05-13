import { Application, BackendSession } from 'pinus';
// import { IUserinfo, IAccountInfo, ITokenInfo, IAuthReturn } from '../../../interface/user/handler/userInterface';
import { Login } from '../../../controller/account/login';
import { IClubRequest, IClubReturn } from '../../../interface/club/handler/clubInterface';
import { Club } from '../../../controller/club/club';
import { room_1_1 } from '../../../gameConfig/room';


export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {

    }

    /**
     * club  create
     *
     * @param  {Object}   clubinfo     request message
     * @return {object}
     */
    async createClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {
        // 这里以后添加很多判断
        if (!clubinfo.type) {
            return {
                code: 400,
                msg: '参数错误'
            }
        }
        let play_setting = JSON.stringify(room_1_1(clubinfo.clubConfig));
        let result = await Club.createClub({ ...clubinfo, play_setting, uid: session.uid });
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
    async deleteClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        let result = await Club.deleteClub({ houseid: clubinfo.houseid, uid: session.uid });
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

    async updateClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        let result = await Club.updateClub({ ...clubinfo, uid: session.uid }, { uid: session.uid, houseid: clubinfo.houseid });
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


    /**
     * club  create
     *
     * @param  {Object}   clubinfo     request message
     * @return {object}
     */
    async getClub(clubinfo: IClubRequest, session: BackendSession): Promise<IClubReturn> {

        let result = await Club.getClub({ uid: session.uid });
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