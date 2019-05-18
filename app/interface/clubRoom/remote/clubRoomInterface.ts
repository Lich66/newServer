import { IResponse } from '../../global/response';
import { IClub } from '../../models/tbl_club';
export interface IClubRoomRpc {
    uid?: number;
    roomid?: number;
    sid?: string;
    clubid?: number;
    flag?: boolean;
}

export interface IClubReturn extends IResponse {
    data?: IClub | IClub[] | number | [number, IClub[]];
    // [key: string]: any;
}
