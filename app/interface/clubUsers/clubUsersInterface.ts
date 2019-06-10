import { IResponse } from '../global/response';
import { IClub } from '../models/tbl_club';
// import { tbl_clubuser } from '../../models/tbl_clubuser';
import { IClubUser } from '../models/tbl_ClubUser';
// import { IClubUser } from '../models/tbl_ClubUser';


export interface IClubUserRequest {
    clubid?: number;
    userid?: number;
    points?: number;
    chactor?: number;
}
export interface IJoinClubData extends IClub {
    points?: number;
}
export interface IClubUserReturn extends IResponse {
    data?: IJoinClubData | IJoinClubData[] | number | [number, IJoinClubData[]] | IClubUser | IClubUser[];
}
